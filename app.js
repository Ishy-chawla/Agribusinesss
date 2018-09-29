var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//New Code
var mongodb = require('mongodb');
var monk = require('monk');
//var db = process.env.MONGODB_URI || monk('localhost:27017/nodetest1');
//var db = monk('localhost:27017/nodetest1');
var mongodb = process.env.MONGOLAB_URI;

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL= 'mongodb://Ish:Ishchawla1@ds115963.mlab.com:15963/nodetest1';

// Use connect method to connect to the Server
MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, mongodb) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', mongodb);
  }
  router.post('/addnewuser', function(req, res) {
    //Set our internal db variable
    var mongodb = req.mongodb;
  
    //Get our form values. These rely on the name attribute
    var userName = req.body.name;
    var userEmail = req.body.Email;
    var userContact = req.body.Contact;
  
    //Set our collection
    var collection = mongodb.get('ContactUs');
  
/*Post to Add User Service*/
mongodb.collection('ContactUs').insertOne(
  {
    name: 'Hello',
    Email: 'hello@g.com',
    Contact: '234567'
  },
  function (err, res) {
    if (err) {
      mongodb.close();
      return console.log(err);
    }
    // Success
    mongodb.close();
  }
)
/*router.post('/addnewuser', function(req, res) {
  //Set our internal db variable
  var db = req.db;

  //Get our form values. These rely on the name attribute
  var userName = req.body.name;
  var userEmail = req.body.Email;
  var userContact = req.body.Contact;

  //Set our collection
  var collection = db.get('ContactUs');

  //Submit to the db
  collection.insert({
    "name": userName,
    "Email": userEmail,
    "Contact": userContact
  }, function(err) {
    if(err){
      res.send("There was a problem adding the information to the database.");
    }
    else{
      res.redirect("abc");
    }
  });

});*/
//db.close;
  })
});
    

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//make our db accessile to our router
app.use (function(req,res,next){
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
