var db = require("../models");

module.exports = function (app) {

  //Get All Question in API\\
  app.get("/api/question", function (req, res) {
    res.json(res)
  });

  app.post('/api/add', function(req, res) { 
    var answers = JSON.parse(req.body.answers);
    db.Question.create({
      text: req.body.text,
      category: req.body.category,
      answerType: 'Multiple Choice',
      verified: true,
      Answers: answers
    },
    {
      include: [db.Answer]
    })
    .then(function(data){
      res.send(data);
    })
  });

// Question View \\ 
  app.get('/question', function (req, res) {
    var answerArr = [];
    db.Question.findAll({}).then(function (question) {
      /* res.render("question") */
      res.render("question", {
        question: question[0].text,
        answer: answerArr
      })

      // Answers for Question \\n
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
  });

};