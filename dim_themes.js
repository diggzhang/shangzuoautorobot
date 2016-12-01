print("_id,name,hasPainPoint,type,pay,topics,createDate")
db.themes.aggregate([
    {"$unwind": "$topics"},
    {"$project": {
        "name": 1,
        "hasPainPoint": 1,
        "type": 1,
        "pay": 1,
        "topics": 1,
        "createDate": {
            "$dateToString": {
                "format": "%Y-%m-%d",
                "date": "$createTime"
        }}
    }}
]).forEach(
    function (doc) {
        print(doc._id +","+ doc.name +","+ doc.hasPainPoint +","+ doc.type +","+ doc.pay +","+ doc.topics +","+ doc.createDate)
    }
)
