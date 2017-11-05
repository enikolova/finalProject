var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session');

var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('ejechev:qweasd23@ds237475.mlab.com:37475/books')
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

// var index = require('./routes/index');
var registration = require('./routes/registration');
var books = require('./routes/books');
var authors = require('./routes/authors');
var login = require('./routes/login');



// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: '526252071061681',
    clientSecret: '9eb78c0fc39d4426ed49d12b103158d5',
    callbackURL: 'https://localhost:4000/auth/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var comment=require('./routes/comment');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secretSession', resave: true,
saveUninitialized: true}))
app.use(function(req,res,next) {
  req.db = db;
  next();
})

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook',
passport.authenticate('facebook'));

app.get('/auth/facebook/return', 
passport.authenticate('facebook', { successRedirect: '#!/',failureRedirect: '#!/login' }),
function(req, res) {
  res.redirect('/');
});

// router.get('/profile',
// require('connect-ensure-login').ensureLoggedIn(),
// function(req, res){
//   res.render('profile', { user: req.user });
// });
// app.use('/', index);
app.use('/registration', registration);
app.use('/books', books);
app.use('/authors',authors);
app.use('/login', login)
app.use('/comments',comment);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
