var db = require("../models");

module.exports = function (app) {


  //Login Page
  app.get("/", function (req, res) {
    res.render('login');
  })

  //Trivia Page
  app.get('/index', function (req, res) {
    res.render('index')
  })

  app.get('/add', function (req, res) {
    res.render("add")
  })

  app.get("/trivia", function (req, res) {
    res.render('trivia')
  })


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};