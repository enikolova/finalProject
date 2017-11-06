var express = require('express');
var router = express.Router();

router.delete('/book/remove/:book_name',function(req,res,next){

    var db=req.db;
    var collection=db.get('books');
     var name = req.params.book_name;
     console.log(name);
     collection.remove({'volumeInfo.title':name},function(e,docs){
         res.send('success');
     })
})
router.put('/',function(req,res,next){
     var db = req.db;
    var collection = db.get('books');
    var book=req.body.newBook;
    collection.insert(book,function(e,docs){
        res.send('success');
    })
})
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
    console.log('bgdfdcx');
    var db=req.db;
    var collection=db.get('books');
    var id=req.params.book_id;
    var rating=Number(req.body.rating);
    console.log(rating);
    collection.find({_id:id},{},function(e,docs){
        var avgRating=Number(docs[0].volumeInfo.averageRating);
         console.log(avgRating);
        var newRating=(avgRating+rating)/2;
        var newRatingCount=docs[0].volumeInfo.ratingsCount+1;
        docs[0].volumeInfo.averageRating=newRating.toFixed(1);
        docs[0].volumeInfo.ratingsCount=newRatingCount;
         console.log(newRatingCount);
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