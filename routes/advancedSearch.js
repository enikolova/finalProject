var express = require('express');
var router = express.Router();

// GET all books by adv Search 
router.post('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('books');
    var params = {}
    if(req.body.keyword) {
        var keyword = req.body.keyword;
        
        params.keyword = keyword;
    }
    if(req.body.author) {
        var author = req.body.author
        params.author = {$exist: true}
    }
    if(req.body.title) {
    var title = req.body.title
   
    params.title = {$exist: true}
    }
    if(req.body.isbn) {
    var isbn = req.body.isbn
    params.isbn = isbn
    }
    if(req.body.publisher) {
    var publisher = req.body.publisher
        params.publisher = publisher
    }
    collection.find({author: author, title: title}, params, function(err, docs) {
       
        res.json(docs);
    });
});
module.exports = router;