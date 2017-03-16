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
var editTripDate = require("./editTripDate");
var saveTripDate = require("./saveTripDate");
var deleteTrip = require("./deleteTrip");

var findDestination = require("./findDestination");
var findAttraction = require("./findAttraction");
var findTransport = require("./findTransport");
var findHotel = require("./findHotel");

var addAttraction= require("./addAttraction");
var saveAttraction= require("./saveAttraction");
var editAttraction = require("./editAttraction");
var saveAttractionAfterEdit = require("./saveAttractionAfterEdit");
var deleteAttraction = require("./deleteAttraction");

var addTransport = require("./addTransport");
var saveTransport = require("./saveTransport");
var editTransport = require("./editTransport");
var saveTransportAfterEdit = require("./saveTransportAfterEdit");
var deleteTripConfirm = require("./deleteTripConfirm");
var deleteTransport = require("./deleteTransport");

var addHotel = require("./addHotel");
var saveHotel = require("./saveHotel");
var editHotel = require("./editHotel");
var saveHotelAfterEdit = require("./saveHotelAfterEdit");
var deleteHotel = require("./deleteHotel");

var adduser = require("./adduser");
var leaveTrip = require("./leaveTrip");

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
    var query = 'SELECT * FROM Trip_User WHERE trip_id = '+ req.params.tripId + ' ORDER BY role DESC';
    connection.query(query, function(err, rows){
      if(err || !_.findWhere(rows, {"username":req.session.username})){
        console.log(err);
        res.redirect('/trip/display');
      }else{
        req.user = _.findWhere(rows, {"username":req.session.username});
        req.userlist = rows;
        next();
      }
    });
    connection.release();
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
router.get("/trip/edit/:tripId", requireLogin, requireUser, findDestination, findTransport, findAttraction, findHotel, editTrip);
router.get("/trip/add",requireLogin, addTrip);
router.post('/trip/add',requireLogin, saveTrip);
router.get('/trip/editdate/:tripId', requireLogin, requireUser, findDestination,editTripDate);
router.post('/trip/editdate/:tripId', requireLogin, requireUser,saveTripDate);
router.get('/trip/delete/:tripId', requireLogin, requireUser, deleteTripConfirm);
router.post('/trip/delete/:tripId', requireLogin, requireUser, deleteTrip);

router.get('/trip/attraction/add/:tripId/:date',requireLogin, requireUser, addAttraction);
router.post('/trip/attraction/add/:tripId/:destination_id',requireLogin, requireUser, saveAttraction);
router.get('/trip/attraction/edit/:tripId/:travelDateTime/:attractionName', requireLogin, requireUser, findDestination, editAttraction);
router.post('/trip/attraction/edit/:tripId/',requireLogin, requireUser, saveAttractionAfterEdit);
router.get('/trip/attraction/delete/:tripId/:travelDateTime',requireLogin, requireUser, deleteAttraction);

router.get('/trip/transport/add/:tripId', requireLogin, requireUser, findDestination, addTransport);
router.post('/trip/transport/add/:tripId', requireLogin, requireUser, findDestination, saveTransport);
router.get('/trip/transport/edit/:tripId/:transportId', requireLogin, requireUser, findDestination, editTransport);
router.post('/trip/transport/edit/:tripId/:transportId', requireLogin, requireUser, saveTransportAfterEdit);
router.get('/trip/transport/delete/:tripId/:transportId', requireLogin, requireUser, deleteTransport);

router.get('/trip/hotel/add/:tripId/:date',requireLogin, requireUser, addHotel);
router.post('/trip/hotel/add/:tripId/',requireLogin, requireUser, saveHotel);
router.get('/trip/hotel/edit/:tripId/:date',requireLogin, requireUser, findDestination, editHotel);
router.post('/trip/hotel/edit/:tripId/:date',requireLogin, requireUser, saveHotelAfterEdit);
router.get('/trip/hotel/delete/:tripId/:date', requireLogin, requireUser, deleteHotel);

router.post('/trip/adduser/:tripId', requireLogin, requireUser, adduser);
router.get('/trip/leaveTrip/:tripId', requireLogin, requireUser, leaveTrip);

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

module.exports = router;