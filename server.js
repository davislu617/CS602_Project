var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var session = require('client-sessions');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();

// setup handlebars view engine
app.engine('handlebars', 
    handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup session
app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: 'Super_Screct',
  duration: 30 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true}
));

// Routing
var routes = require('./routes/index');
app.use('/', routes);




app.listen(3000, function(){
  console.log('http://localhost:3000');
});
