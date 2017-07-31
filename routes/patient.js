let express = require('express');
let mongoClient = require('mongodb').MongoClient;
let router = express.Router();

let url = "mongodb://localhost:27017/dentist";

/* GET patients listing. */
let promise;

router.get("/", function(req, res){

    promise = new Promise((resolve, reject) => {
        let id = new ObjectId(req.params.id);
        resolve(res)
    });

    return promise;
});

promise.then((res) => {
    mongoClient.connect(url, function(err, db){
        db.collection("patients").findOne({_id: id}, function(err, patient){

            if(err) return res.status(400).send();

            res.send(patient);
            db.close();
        });
    });
}).catch((err) => {
    throw new Error(err);
});




module.exports = router;
