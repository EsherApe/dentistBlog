let express = require('express');
let mongoClient = require('mongodb').MongoClient;
let router = express.Router();

let url = "mongodb://localhost:27017/dentist";

/* GET users listing. */
router.get("/", function(req, res){
    mongoClient.connect(url, function(err, db){
        db.collection("patients").find({}).toArray(function(err, patients){
            res.send(patients);
            db.close();
        });
    });
});

module.exports = router;
