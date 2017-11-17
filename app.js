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


// routes
var registration = require('./routes/registration');
var books = require('./routes/books');
var authors = require('./routes/authors');
var login = require('./routes/login');
var advancedSearch = require('./routes/advancedSearch')
var comment=require('./routes/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secretSession', resave: true,
saveUninitialized: true, maxAge: 360000}))
app.use(function(req,res,next) {
  req.db = db;
  next();
})

app.use('/registration', registration);
app.use('/books', books);
app.use('/authors',authors);
app.use('/login', login)
app.use('/comments',comment);
app.use('/advancedSearch', advancedSearch);
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
