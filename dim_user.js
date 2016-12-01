// time mongo --quiet onions dim_user.js > dim_user.csv
// 80.85s user 5.04s system 30% cpu 4:42.97 total
print("_id,channel,coins,from,gender,practiceTime,videoTime,level,name,nickname,phone,points,publisher,semester,role,scores,type,registDate,VIPendDate")
db.users.aggregate(
    {"$project": {
        "channel": 1, "coins": 1, "from": 1, "gender": 1,
        "practiceTime": '$learningTime.practice',
        "videoTime": '$learningTime.video',
        "level": '$level.no',
        "name": 1, "nickname": 1, "phone": 1, "points": 1,
        "publisher": 1, "semester": 1, "role": 1, "scores": 1,
        "type": 1,
        "registDate": {
            "$dateToString": {
                "format": "%Y-%m-%d",
                "date": "$registTime"
            }
        },
        "VIPendDate": {
            "$dateToString": {
                "format": "%Y-%m-%d",
                "date": "$VIPExpirationTime"
            }
        }
    }}
).forEach (
    function(doc) {
        print(doc._id +","+ doc.channel + "," + doc.coins + "," + doc.from + "," +
        doc.gender + "," + doc.practiceTime + "," + doc.videoTime + "," +
        doc.level + "," + doc.name + "," + doc.nickname + "," +
        doc.phone + "," + doc.points + "," + doc.publisher + "," +
        doc.semester + "," + doc.role + "," + doc.scores + "," +
        doc.type + "," + doc.registDate + "," + doc.VIPendDate)
    }
)
