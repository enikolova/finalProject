var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('authors');

    collection.find({}, {}, function(err, docs) {
       
        res.json(docs);
    });
});

router.get('/:author_name', function(req, res, next) {
    var db = req.db;
    var collection = db.get('authors');
    
    var name = req.params.author_name;
    collection.find({name: name }, {}, function(e, docs) {
        console.log(docs);
        res.json(docs[0]);

        
    });
});
module.exports = router;