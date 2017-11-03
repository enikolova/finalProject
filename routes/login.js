var express = require('express');
var router = express.Router();
var User = require('../public/js/models/user');
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
                
                res.json({success: true, message: 'Successful login', user: req.session.userId})
            }
        }
        
        
    })
});


module.exports = router