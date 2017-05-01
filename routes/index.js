var express = require('express');
var router = express.Router();
var clientSession = require('client-sessions');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

// other modules
var login = require("./login"); //sign in
var signup = require("./signup"); // sign up
var auth = require("./auth"); //validate username and password

var requireLogin = require('./requireLogin.js'); // check if the user has logged in
var requireUser = require('./requireUser.js'); // check if the user participates in this trip

var displayTrip = require("./displayTrip");
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

var lookAround = require("./lookAround");
var viewCity = require("./viewCity");
var searchByYelp = require("./searchByYelp");

var downloadTrip = require("./downloadTrip");

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

router.get('/lookAround', requireLogin, lookAround);
router.get('/lookAround/:city', requireLogin, viewCity);
router.get('/lookAround/:city/:tripId', requireLogin, viewCity);
router.post('/lookAround/:city', requireLogin, searchByYelp);

router.get('/downloadTrip/:username', downloadTrip);

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

module.exports = router;