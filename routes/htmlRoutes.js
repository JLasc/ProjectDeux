var db = require("../models");

module.exports = function (app) {


  //Login Page
  app.get("/login", function (req, res) {
    res.render('login');
  })

  // Trivia Page
  app.get('/game', function (req, res) {
    setTimeout(function() {
      res.render('game')
    }, 1500)
  })

  //Main Page
  app.get('/', function (req, res) {
    res.render('index')
  })

  app.get('/add', function (req, res) {
    res.render("add")
  })

  app.get('/thanks', function (req, res){
    res.render("thanks")
  })

  app.get("/trivia", function (req, res) {
    db.Question.findAll({}).then(function(data){
      res.render('trivia', {
        question: data[0].text
      })
    })
  })


  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};