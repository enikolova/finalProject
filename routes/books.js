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
//GET -- all books from single category
router.get('/category/:category_name', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');
var category=req.params.category_name;
    collection.find({"volumeInfo.categories":category}, {}, function(err, docs) {
       
        res.json(docs);
    });
});
//GET --single book
router.get('/:book_id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');
    
    var id = req.params.book_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs[0]);
    });
});
//POST --change book average rating and rating count
router.post('/:book_id',function(req,res,next){
    
    var db=req.db;
    var collection=db.get('books');
    var id=req.params.book_id;
    var rating=Number(req.body.rating);
    
    collection.find({_id:id},{},function(e,docs){
        var avgRating=Number(docs[0].volumeInfo.averageRating);
         
        var newRating=(avgRating+rating)/2;
        var newRatingCount=docs[0].volumeInfo.ratingsCount+1;
        docs[0].volumeInfo.averageRating=newRating;
        docs[0].volumeInfo.ratingsCount=newRatingCount;
         
        collection.update({_id:id},docs[0],function(e,docs){
            res.json({success:'success'});
        })
    })
})

router.get('/book/:book_name', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');
    
    var name = req.params.book_name;
    collection.find({'volumeInfo.title': name}, {}, function(e, docs) {
        res.json(docs[0]);
    });
});

module.exports = router;