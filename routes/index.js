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
var findDestination = require("./findDestination");
var addAttraction= require("./addAttraction");
var saveAttraction= require("./saveAttraction");
var findAttraction = require("./findAttraction");
var editAttraction = require("./editAttraction");
var saveAttractionAfterEdit = require("./saveAttractionAfterEdit");
var deleteAttraction = require("./deleteAttraction");

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
function requireUser (req, res, next){
  pool.getConnection(function(err, connection){
    if (err){
      console.log(err);
      return;
    }
    var query = 'SELECT trip_id, username FROM Trip_User WHERE trip_id = '
                + req.params.tripId + ' AND username= "' + req.session.username + '";';
    connection.query(query, function(err, rows){
      if(!rows[0]){
        console.log(err);
        res.redirect('/trip/display');
      }else{
        next();
      }
    });
  });
};

// router specs
router.get('/', function(req, res, next) {
  res.redirect('/trip/display');
});
router.get('/login', login);
router.post('/login', auth);
router.post('/signup',signup);
router.get("/trip/display", requireLogin, displayTrip);
router.get("/trip/edit/:tripId", requireLogin, requireUser, findDestination, findAttraction, editTrip);
router.get("/trip/add",requireLogin, addTrip);
router.post('/trip/add',requireLogin, saveTrip);
router.get('/trip/attraction/add/:tripId/:date',requireLogin, requireUser, addAttraction);
router.post('/trip/attraction/add/:tripId/:destination_id',requireLogin, requireUser, saveAttraction);
router.get('/trip/attraction/edit/:tripId/:travelDateTime/:attractionName', requireLogin, requireUser, findDestination, editAttraction);
router.post('/trip/attraction/edit/:tripId/',requireLogin, requireUser, saveAttractionAfterEdit);
router.get('/trip/attraction/delete/:tripId/:travelDateTime',requireLogin, requireUser, deleteAttraction);
router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

module.exports = router;