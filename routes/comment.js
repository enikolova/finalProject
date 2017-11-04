var express = require('express');
var router = express.Router();


router.get('/:book_id', function(req, res, next) {
   var db = req.db;
    var collection = db.get('comments');
var book=req.params.book_id
    collection.find({"bookId":book}, {}, function(err, docs) {
       
        res.json(docs);
    });
});
router.put('/:book_id',function(req,res,next){
    var db=req.db;
    var collection=db.get('comments');
    var title = req.body.title;
  var rating = req.body.rating;
  var text = req.body.text;
  var bookId = req.params.book_id;
  var username=req.session.username;
  console.log(username);
  function Comment(title,rating,username,text,bookId){
    this.title=title.trim();
    this.rating=rating;
    this.username=username;
    this.text=text;
    this.bookId=bookId;
    var date=new Date();
    this.date=date.toDateString();
}
  var comment=new Comment(title,rating,username,text,bookId);
  console.log(comment);
    collection.insert(comment).then(function(data){
        res.json('success')
    })
})
module.exports = router;
