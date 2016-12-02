# -*- coding: utf-8 -*-

"""
    行为 daily_user
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

collection_cache_user_attr = db_cache["userAttr"]

now = datetime.datetime.now()
yestoday = datetime.datetime.now() - datetime.timedelta(days=1)
ENDDATE = datetime.datetime(now.year, now.month, now.day) - datetime.timedelta(hours=8)
STARTDATE = datetime.datetime(yestoday.year, yestoday.month, yestoday.day) - datetime.timedelta(hours=8)

def daily_user(start, end):
    fmt = '%Y%m%d'
    end_str = end.strftime(fmt)
    pipe_line = [
        {"$unwind": "$daily"},
        {"$unwind": "$daily"},
        {"$project": {
            "user": 1,
            "activateDate": {
                "$dateToString": {
                    "format": "%Y-%m-%d",
                    "date": "$activateDate"
                }
            },
            "daily": 1
        }},
        {"$match": {
            "daily": end_str
        }}
    ]
    daily_user_list = list(collection_cache_user_attr.aggregate(pipe_line, allowDiskUse=True))
    return daily_user_list


gen_daily_user_csv = daily_user(STARTDATE, ENDDATE)
print("_id,user,activateDate,daily")
for row in gen_daily_user_csv:
    print("%s,%s,%s,%s")%(row["_id"], row["user"], row["activateDate"], row["daily"])
