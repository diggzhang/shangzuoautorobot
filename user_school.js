// mongo --quiet --host 10.8.8.111 onions ./user_school.js > user_school.csv
// 5.74s user 0.68s system 2% cpu 4:29.67 total
print("_id,school")
db.users.find({
    "school":{
        "$exists": true
    }
}, {"school": 1}).forEach(
    function(doc) {
        print(doc._id + "," + doc.school)
    }
)
