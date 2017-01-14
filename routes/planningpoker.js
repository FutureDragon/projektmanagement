var express = require('express');
var router = express.Router();
var task = require('../models/task');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('planningPokerIndex', { title: 'Planning Poker'});
});


router.get('/rest/:id', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var userId = req.params.id;
  console.log(userId);
  task.getAllNotRatedTasksForUser(userId, res);
});

router.post('/rest/update', function(req, res, next) {
  var userId      = req.body.userId;
  var taskId      = req.body.taskId;
  var storyPoints = req.body.storyPoints;
  console.log(userId);
  console.log(taskId);
  console.log(storyPoints);
  res.status(200).send("asd");
});

module.exports = router;
