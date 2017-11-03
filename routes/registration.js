var express = require('express');
var router = express.Router();
var User = require('../public/js/models/user');
var bcrypt = require('bcryptjs')

/* POST to register. */
router.post('/', function(req, res, next) {

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var repeatPassword = req.body.repeatPassword;

  var db = req.db;
  var collection = db.get("users");
  collection.find({ email: email }).then(function(data) {
      if (data.length == 0) {
          if (password === repeatPassword) {
            password = bcrypt.hashSync(password, 10)
            
              var user = new User(username, email, password);
              collection.insert(user);
              res.json({success: true,message: "Succesful registration !"})
              
          } else {
              res.json({success:false ,message: "Passwords don't match!"})
          }
      } else {
          res.json({success: false, message: 'Email is already taken!'})
      }
  }).catch(function(err) {
      console.log(err)
  });
})


module.exports = router;
