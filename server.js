var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var session = require('client-sessions');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



// create a chat connection to allow all users in the same trip to chat online
io.on('connection', function(socket){
    // join the chat room with the user's trip_id
    socket.on('room', function(room) {
        socket.join(room);
    });
    socket.on('chat message', function(msg){
      // broadcast message to the specified chat room
      io.in(msg.trip_id).emit('chat message', msg.username+': '+msg.message);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
      
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





