// mongo --quiet --host 10.8.8.8 onion40-backup ./dim_topics.js >
// 0.06s user 0.03s system 39% cpu 0.231 total
print("createDate,videoId,name,painPoint,pay,practice,status,subject,type")
db.topics.aggregate({
    "$project": {
        "createDate": {
            "$dateToString": {
                "format": "%Y-%m-%d",
                "date": "$createTime"
            }
        },
        "videoId": "$hyperVideo",
        "name": 1,
        "painPoint": 1,
        "pay": 1,
        "practice": 1,
        "status":1,
        "subject": 1,
        "type": 1
    }
}).forEach(
    function (doc) {
        print(doc.createDate +","+ doc.videoId +","+ doc.name +","+ doc.painPoint +","+ doc.pay +","+ doc.practice +","+ doc.status +","+ doc.subject +","+ doc.type)
    }
)
