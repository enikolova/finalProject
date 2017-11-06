var express = require('express');
var router = express.Router();
var Comments=require('../public/js/models/comment');
//GET --- get all comments
router.get('/:book_id', function(req, res, next) {
   var db = req.db;
    var collection = db.get('comments');
var book=req.params.book_id
    collection.find({"bookId":book}, {}, function(err, docs) {
       
        res.json(docs);
    });
});
//PUT -- add comment to a book
router.put('/:book_id',function(req,res,next){
    var db=req.db;
    var collection=db.get('comments');
    var title = req.body.title;
  var rating = req.body.rating;
  var text = req.body.text;
  var bookId = req.params.book_id;
  var username=req.session.username;
  
  var comment=new Comments(title,rating,username,text,bookId);

    collection.insert(comment).then(function(data){
        res.json('success')
    })
})
//DELETE ---delete a comment
router.delete('/:comment_id',function(req,res,next){
     var db=req.db;
    var collection=db.get('comments');
    var comment=req.params.comment_id;
    collection.remove({_id:comment},function(e,data){
        res.json('success');
    })
})
module.exports = router;
