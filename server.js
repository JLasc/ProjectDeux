require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
// app.use(passport.initialize());
// app.use(passport.session());



var env = require('dotenv').load();

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  // Disconnect
  socket.on('disconnect', function(data) {
      
      users.splice(users.indexOf(socket.username), 1);
      updateUsernames();
      connections.splice(connections.indexOf(socket), 1);
      console.log('Disconnected: %s sockets connected', connections.length);
  });

  // send message
  socket.on('send message', function(data) {
      console.log(data);
      io.sockets.emit('new message', {msg:data, user: socket.username});
  })

  // new user
  socket.on('new user', function(data, callback) {
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsernames();
  })

  function updateUsernames() {
      io.sockets.emit('get users', users);
  }
  
})
