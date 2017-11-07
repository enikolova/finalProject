var express = require('express');
var router = express.Router();
var User = require('../public/js/models/user');
var passport = require('passport');

var bcrypt = require('bcryptjs')


// GET single user
router.get('/:user_id', function(req, res, next) {
    var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
        
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs[0]);
    });
});

// GET favorite books
router.get('/fav/:user_id', function(req,res,next) {
    var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
    
    collection.find({ _id: id }, {}, function(e, docs) {
        res.json(docs[0].favouriteBooks)
      
})
})
//GET --all books in the cart
router.get('/show/cart/:user_id',function(req,res,next){
     var db = req.db;
    var collection = db.get('users');
      var id = req.params.user_id
      
      collection.find({_id:id},{},function(e,docs){
          console.log(docs[0])
          res.json(docs[0].cart);

      })

})
router.post('/cart/:user_id',function(req,res,next){
     var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
     var book = req.body.book;
   
      collection.find({ _id: id }, {}, function(e, docs) {
        
        if(docs[0].cart.some(function(x){
           
            return  x.volumeInfo.title === book.volumeInfo.title;
        })) {
            res.json({success: false, message: 'This book is already added in the cart !'})
        } else {
            docs[0].cart.push(book);
            collection.update({_id:id}, docs[0], function() {
                  res.json({success: true, message: 'Book added in the cart !', data: docs[0]});
            })
          
        }
       
    });
})
//DELETE from user cart
router.post('/remove/:user_id',function(req,res,next){
     var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
    console.log(req.body);
    var book = req.body.book;
    console.log(book);
    collection.find({_id:id},{},function(e,docs){
        console.log(docs[0]);
       docs[0].cart.splice( docs[0].cart.findIndex(x => x.volumeInfo.title == book.volumeInfo.title),1);
        collection.update({_id:id},docs[0],function(e,d){
             console.log('success');
        })
    })
})
router.post('/clearCart/:user_id',function(req,res,next){
 var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
    collection.find({ _id: id }, {}, function(e, docs) {
        docs[0].cart=[];
        collection.update({_id:id},docs[0],function(e,docs){
            console.log('success')
             res.json({msg:'success'});
        })
    })
})
// POST to user favourite books
router.post('/fav/:user_id', function(req,res,next) {
    var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
    var book = req.body.book;
    
    collection.find({ _id: id }, {}, function(e, docs) {
        var user = docs[0];
        if(user.favouriteBooks.some(function(x){
           
            return  x.volumeInfo.title === book.volumeInfo.title
        })) {
            res.json({success: false, message: 'This book is already added to favourites !', data: user})
        } else {
            user.favouriteBooks.push(book);
            collection.update({_id:id}, user, function() {
                res.json({success: true, message: 'Book added to favourites !', data: user});
            });
        }
       
    });
})
//GET -- all users
router.get('/',function(req,res,next){
     var db = req.db;
    var collection = db.get('users');
      collection.find({}, {}, function(e, docs) {
          res.json(docs);
      })
})
//DELETE --- single user
router.delete('/remove/:user_id',function(req,res,next){
 var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
    collection.remove({_id:id},{},function(e,docs){
        res.send({msg:"successful"});
    })
})
// DELETE from Fav 
router.post('/fav/remove/:user_id', function(req,res,next) {
    var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
    var book = req.body.book;
    
    collection.find({ _id: id }, {}, function(e, docs) {
        
        if(!docs[0].favouriteBooks.some(function(x){
           
            return  x.volumeInfo.title === book.volumeInfo.title
        })) {
            res.json({success: false, message: 'This book is is not in your favourites !'})
        } else {
            docs[0].favouriteBooks.splice( docs[0].favouriteBooks.findIndex(x => x.volumeInfo.title == book.volumeInfo.title),1);
            collection.update({_id:id}, docs[0], function() {
                res.json({success: true, message: 'Book removed from favourites !', data: docs[0]});
            });
            
        }
       
    });
})
router.post('/profile/logout', function(req, res, next) {
    req.session.destroy();
    res.json({message: 'successful logout'})
})

/* POST to logIn. */
router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var db = req.db;
    var collection = db.get("users");
    collection.find({email: email}).then(function(data) {
       
        if(data.length == 0 || data === null) {
            res.json({success: false, message: 'Incorect email or password !'})
        } else {

            if(bcrypt.compareSync(password, data[0].password)) {
                req.session.userId = data[0]._id
                req.session.username=data[0].username;
                
                res.json({success: true, message: 'Successful login',user: req.session.userId})
            } else {
                res.json({success: false, message: 'Incorect password !'})
            }
        }
        
        
    })
});



module.exports = router