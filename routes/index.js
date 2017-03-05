var express = require('express');
var router = express.Router();
var clientSession = require('client-sessions');
var _ = require('underscore');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');


// other modules
var login = require("./login");
var signup = require("./signup");
var displayTrip = require("./displayTrip");
var auth = require("./auth");
var editTrip = require("./editTrip");
var addTrip = require("./addTrip");
var saveTrip = require("./saveTrip");

var pool = require('./dbConnection.js')();
function requireLogin (req, res, next){ 
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    pool.getConnection(function(err, connection){
        if (err){
            console.log(err);
            return;
        }
      var query = 'SELECT username, password FROM User WHERE username="'
                + req.session.username + '";';
      connection.query(query, function(err,rows){
        if(!JSON.parse(JSON.stringify(rows))[0]){
          res.redirect('/login');
          req.session.reset();
        }else{
          next();
        }
      });
      connection.release();
    });
  }
};

// router specs
router.get('/', function(req, res, next) {
  res.redirect('/trip/display');
});
router.get('/login', login);
router.post('/login', auth);
router.post('/signup',signup);
router.get("/trip/display", requireLogin, displayTrip);
router.get("/trip/edit/:tripId", requireLogin, editTrip);
router.get("/trip/add",requireLogin, addTrip);
router.post('/trip/add',requireLogin, saveTrip);
router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

module.exports = router;