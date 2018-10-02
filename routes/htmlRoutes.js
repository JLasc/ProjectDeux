var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/add", function(req, res){
    res.render("add")
  })

  // Question View \\ 
  app.get('/question', function(req, res){
    var answerArr = [];
    db.Question.findAll({}).then(function(question){
      /* res.render("question") */
      res.render("question", {
        question: question[0].text,
        answer: answerArr
      })

      // Answers for Question \\
      db.Answer.findAll({
        where: {
          QuestionId: 2
        }
      }).then(function(answer){
        for (i=0; i<answer.length; i++){
          answerArr.push(answer[i].response)
        }
        console.log(answerArr.length)
      })
    })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });






};


