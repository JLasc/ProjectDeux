var db = require("../models");

module.exports = function(app) {

  // Create a new example
  app.post("/api/question", function(req, res) {
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

  app.get('/api/question', function (req, res) {
    var answerArr = [];
    db.Question.findAll({}).then(function (question) {
      res.render("trivia", {
        question: question[0].text,
        answer: answerArr
      })

      // Answers for Question \\
      db.Answer.findAll({
        where: {
          QuestionId: 2
        }
      }).then(function (answer) {
        for (i = 0; i < answer.length; i++) {
          answerArr.push(answer[i].response)
        }
        console.log(answerArr.length)
      })
    })
  })
};
