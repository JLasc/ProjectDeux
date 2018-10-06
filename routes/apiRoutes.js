var db = require("../models");

module.exports = function (app) {

  //Get All Question in API\\
  app.get("/api/question", function (req, res) {
    res.json(res)
  });

  app.post("/api/add", function (req, res) {
    db.Question.create(req.body).then(function (dbQuestion) {
      db.Answer.bulkCreate([
        { response: 'barfooz', correct: true, QuestionId: dbQuestion.id },
        { response: 'foo', correct: false, QuestionId: dbQuestion.id },
        { response: 'bar', correct: false, QuestionId: dbQuestion.id }
      ]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
        return db.Answer.findAll();
      }).then(Answer => {
        console.log(Answer) // ... in order to get the array of user objects
      })
    });
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