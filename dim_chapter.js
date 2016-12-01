// mongo --quiet --host 10.8.8.111 onions ./dim_chapter.js > data_dim_chapter.cs
// 0.13s user 0.03s system 57% cpu 0.271 total
print("_id,publisher,semester,subject,name,order,includeCharges,createDate,themes")
db.chapters.aggregate([
    {"$unwind": "$themes"},
    {"$project": {
        "publisher": 1,
        "semester": 1,
        "subject": 1,
        "name": 1,
        "order": 1,
        "includeCharges": 1,
        "createDate": {
            "$dateToString": {
                "format": "%Y-%m-%d",
                "date": "$createTime"
            }
        },
        "themes":1
    }}
]).forEach(
    function (doc) {
        print(doc._id +","+ doc.publisher +","+ doc.semester +","+ doc.subject +","+ doc.name +","+ doc.order +","+ doc.includeCharges + ","+ doc.createDate +","+ doc.themes)
    }
)
