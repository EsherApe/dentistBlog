let express = require('express');
let mongoClient = require('mongodb').MongoClient;
let router = express.Router();

let url = "mongodb://localhost:27017/blog/:id";

/* GET patients listing. */
// let promise;
//
// router.get("/", function(req, res){
//
//     promise = new Promise((resolve, reject) => {
//         let id = new ObjectId(req.params.id);
//         resolve(res)
//     });
//
//     return promise;
// });
//
// promise.then((res) => {
//     mongoClient.connect(url, function(err, db){
//         db.collection("articles").findOne({_id: id}, function(err, article){
//
//             if(err) return res.status(400).send();
//
//             res.send(article);
//             db.close();
//         });
//     });
// }).catch((err) => {
//     throw new Error(err);
// });

router.get('/', (req, res) => {

    res.send('asdads');

});

module.exports = router;
