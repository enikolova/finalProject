var express = require('express');
var router = express.Router();

/* GET home page books. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');

    collection.find({}, {}, function(err, docs) {
       
        res.json(docs);
    });
});
router.get('/category/:category_name', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');
var category=req.params.category_name;
    collection.find({"volumeInfo.categories":category}, {}, function(err, docs) {
       
        res.json(docs);
    });
});

router.get('/:book_id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');
    
    var id = req.params.book_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs[0]);
    });
});



module.exports = router;