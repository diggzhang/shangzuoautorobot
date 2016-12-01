print("_id,name,ref,student,teacher")
db.rooms.aggregate([
    {"$unwind": "$members"},
    {"$unwind": "$owners"},
    {"$project": {
        name:1,
        ref:1,
        student:'$members',
        teacher:'$owners'
    }}
]).forEach(
    function(doc) {
        print(doc._id +","+ doc.name +","+ doc.ref +","+ doc.student +","+ doc.teacher)
    }
)
