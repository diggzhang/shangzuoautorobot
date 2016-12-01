// mongo --quiet --host 10.8.8.8 onion40-backup ./dim_hypervideos.js >
// 0.07s user 0.03s system 45% cpu 0.219 total
print("finishTime,name,replace,titleTime,video")
db.hypervideos.find({},
    {
        "finishTime": 1,
        "name": 1,
        "replace":1,
        "titleTime": 1,
        "video": 1
    }
).forEach(
    function (doc) {
        print(doc.finishTime +","+ doc.name +","+ doc.replace +","+ doc.titleTime +","+ doc.video)
    }
)
