let express = require('express');
let mongoClient = require('mongodb').MongoClient;
let router = express.Router();

let url = "mongodb://localhost:27017/blogs";

/* GET users listing. */
// router.get("/", function(req, res){
//     mongoClient.connect(url, function(err, db){
//         db.collection("blogs").find({}).toArray(function(err, patients){
//             res.send(patients);
//             db.close();
//         });
//     });
// });
// module.exports = router;

router.get('/', (req, res, next) =>  {
    res.render('blog-page', {title: 'blog-page'});
});

module.exports = router;