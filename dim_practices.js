print("createDate,name,index,pool,problems")
db.practices.aggregate([
    {"$unwind": "$levels"},
    {"$unwind": "$levels.problems"},
    {"$project": {
        "createDate": {
            "$dateToString": {
                "format": "%Y-%m-%d",
                "date": "$createTime"
            }
        },
        "name": 1,
        "index": "$levels.no",
        "pool": "$levels.pool",
        "problems": "$levels.problems"
    }}
]).forEach(
    function (doc) {
        print(doc.createDate +","+ doc.name +","+ doc.index +","+ doc.pool +","+ doc.problems)
    }
)
