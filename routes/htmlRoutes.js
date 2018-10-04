var db = require("../models");

module.exports = function (app) {
  // Load index page


  app.get("/", function (req, res) {
      res.render("index")
  });


  app.get("/login", function (req, res) {
    res.render("login")
  });

  app.get("/trivia", function(req, res){
    res.render("trivia")
  })

  app.get("/add", function (req, res) {
    res.render("add")
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};


