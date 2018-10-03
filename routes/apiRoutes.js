var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

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
};
