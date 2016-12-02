# -*- coding: utf-8 -*-

"""
    属性 user_activatedate
    python daily_user_activatedate.py > data_daily_user_activatedate.csv
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

def user_activatedate(start, end):
    pipe_line = [
        {"$match": {
            "activateDate": {
                "$gte": start,
                "$lt": end
            }
        }},
        {"$project": {
            "user": 1,
            "location": 1,
            "activateDate": {
                "$dateToString": {
                    "format": "%Y-%m-%d",
                    "date": "$activateDate"
                }
            }
        }}
    ]
    user_act_list = list(collection_cache_user_attr.aggregate(pipe_line, allowDiskUse=True))
    return user_act_list

gen_user_act_csv = user_activatedate(STARTDATE, ENDDATE)
print("_id,user,location,activateDate")
for row in gen_user_act_csv:
    print("%s,%s,%s,%s")%(row["_id"], row["user"], row["location"], row["activateDate"])
