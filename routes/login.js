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

// POST to user favourite books
router.post('/fav/:user_id', function(req,res,next) {
    console.log('vliza')
    var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
    var book = req.body.book;
    
    collection.find({ _id: id }, {}, function(e, docs) {
        
        if(docs[0].favouriteBooks.some(function(x){
           
            return  x.volumeInfo.title === book.volumeInfo.title
        })) {
            res.json({success: false, message: 'This book is already added to favourites !'})
        } else {
            docs[0].favouriteBooks.push(book);
            collection.update({_id:id}, docs[0], function() {
                
            })
            res.json({success: true, message: 'Book added to favourites !', data: docs[0]});
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
        res.send('success');
        var commentCollection=db.get('comments');
        c
    })
})
// DELETE from Fav 
router.post('/fav/remove/:user_id', function(req,res,next) {
    var db = req.db;
    var collection = db.get('users');
    var id = req.params.user_id;
    var book = req.body.book;
    console.log(book)
    collection.find({ _id: id }, {}, function(e, docs) {
        
        if(!docs[0].favouriteBooks.some(function(x){
           
            return  x.volumeInfo.title === book.volumeInfo.title
        })) {
            res.json({success: false, message: 'This book is is not in your favourites !'})
        } else {
            docs[0].favouriteBooks.splice( docs[0].favouriteBooks.findIndex(x => x.volumeInfo.title == book.volumeInfo.title),1);
            collection.update({_id:id}, docs[0], function() {
                
            })
            res.json({success: true, message: 'Book removed from favourites !', data: docs[0]});
        }
       
    });
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
            }
        }
        
        
    })
});

// login with facebook
// router.get('/facebook',
// passport.authenticate('facebook'));

// router.get('/facebook/return', 
// passport.authenticate('facebook', { failureRedirect: '#!/login' }),
// function(req, res) {
//   res.redirect('/');
// });

// router.get('/profile',
// require('connect-ensure-login').ensureLoggedIn(),
// function(req, res){
//   res.render('profile', { user: req.user });
// });

module.exports = router