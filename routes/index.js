var express = require('express');
var router = express.Router();

var app = express();

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Get Hello World Page*/
router.get('/helloworld', function(req, res){
  res.render('helloworld', { title: 'Hello, World!'});
});

/*Get userlist page*/
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('ContactUs');
  collection.find({},{},function(e,docs){
    res.render('userlist', { "userlist" : docs });
  });
});

/*Get New User Page
router.get('/try', function(req, res){
  res.render('try', { title: 'Add new user', scripts: ['javascripts/script.js']});
});*/

/*Get abc page*/
router.get('/abc', function(req, res){
  res.render('abc');
});

/*Get script.js*/
router.get('script', function(req, res){
  res.render('script');
});


/*Post to Add User Service*/
router.post('/addnewuser', function(req, res) {
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

});

module.exports = router;
