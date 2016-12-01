// mongo --quiet --host 10.8.8.111 onions ./dim_circles.js > data_dim_circles.cs
// 2.85s user 0.36s system 71% cpu 4.460 total
print("_id,name,ref,owner,createDate,members")
db.circles.aggregate([
    {"$unwind": "$members"},
    {"$project": {
        "name": 1,
        "ref": 1,
        "owner": 1,
        "createDate": {
            "$dateToString": {
                "format": "%Y-%m-%d",
                "date": "$createTime"
        }},
        "members": 1
    }}
]).forEach(
    function (doc) {
        print(doc._id +","+ doc.name +","+ doc.ref +","+ doc.owner +","+ doc.createDate +","+ doc.members)
    }
)
