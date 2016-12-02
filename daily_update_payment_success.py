# -*- coding: utf-8 -*-


"""
    付费 paymentSuccess
    python daily_update_payment_success.py > data_daily_update_payment_success.csv
"""

# encoding=utf8
import sys
reload(sys)
sys.setdefaultencoding('utf8')

import pymongo
from pymongo import MongoClient
from datetime import datetime
import datetime
import json
import time
from datetime import date

event_db_host = MongoClient("10.8.8.111", 27017)
db_events_v4 = event_db_host["eventsV4"]
db_cache = event_db_host["cache"]

collection_order_events = db_events_v4["orderEvents"]
collection_cache_user_attr = db_cache["userAttr"]

# fetch today - 8 hours
# STARTDATE = datetime.datetime(2016,12,1) - datetime.timedelate()
# ENDDATE = datetime.datetime(2016,12,2) - datetime.timedelate()

now = datetime.datetime.now()
yestoday = datetime.datetime.now() - datetime.timedelta(days=1)
ENDDATE = datetime.datetime(now.year, now.month, now.day) - datetime.timedelta(hours=8)
STARTDATE = datetime.datetime(yestoday.year, yestoday.month, yestoday.day) - datetime.timedelta(hours=8)

def payment_success(start, end):
    pipe_line = [
        {"$match": {
            "eventKey": "paymentSuccess",
            "serverTime": {
                "$gte": start,
                "$lt": end
            },
            'orderInfo.isTest': False
        }},
        {"$project": {
            "user": 1,
            "bySelf": 1,
            "payChannel": '$channel',
            "isRenewal": '$orderInfo.isRenewal',
            "os": 1,
            "good": '$orderInfo.good.name',
            "amount": '$orderInfo.good.amount',
            "payDate": {
                "$dateToString": {
                    "format": "%Y-%m-%d",
                    "date": "$serverTime"
                }
            }
        }}
    ]
    payment_success_list = list(collection_order_events.aggregate(pipe_line, allowDiskUse=True))
    return payment_success_list

#TODO 询问尚佐一个不存在的字段存成啥
gen_payment_csv_list = payment_success(STARTDATE, ENDDATE)
print("_id,user,bySelf,payChannel,isRenewal,os,good,amount,payDate")
for row in gen_payment_csv_list:
    if 'payChannel' not in row:
        row["payChannel"] = "Undefined"
    print("%s,%s,%s,%s,%s,%s,%s,%s,%s")%(row["_id"],
                                        row["user"],
                                        row["bySelf"],
                                        row["payChannel"],
                                        row["isRenewal"],
                                        row["os"],
                                        row["good"],
                                        row["amount"],
                                        row["payDate"])
