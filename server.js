var express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//var auth = require('./config/passport');
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 4200;


// Middleware
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
//auth(passport);
app.use(passport.initialize());
app.use(passport.session());

//Handlebars
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
require("./routes/authroutes")(app,passport);

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

