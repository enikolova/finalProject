var express = require('express');
var router = express.Router();

router.delete('/book/remove/:book_id',function(req,res,next){

    var db=req.db;
    var collection=db.get('books');
    var users = db.get('users')
     var id = req.params.book_id;
     console.log(id)
     collection.remove({_id:id},function(e,docs){
         users.find({},{}, function(e,data) {
          
            data.forEach(function(user) {
                console.log(user.favouriteBooks.findIndex(x => x._id = id))
                if(user.favouriteBooks.findIndex(x => x._id = id) !== -1) {
                user.favouriteBooks.splice(user.favouriteBooks.findIndex(x => x._id = id), 1)
                
                }
                users.update({_id: user._id}, {favouriteBooks: user.favouriteBooks}, function() {
                  console.log(user.favouriteBooks)
                })
            })
            res.json('success')
           
         })
         
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
    
    var db=req.db;
    var collection=db.get('books');
    var id=req.params.book_id;
    var rating=Number(req.body.rating);
    
    collection.find({_id:id},{},function(e,docs){
        var avgRating=Number(docs[0].volumeInfo.averageRating);
         
        var newRating=(avgRating+rating)/2;
        var newRatingCount=docs[0].volumeInfo.ratingsCount+1;
        docs[0].volumeInfo.averageRating=newRating.toFixed(1);
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