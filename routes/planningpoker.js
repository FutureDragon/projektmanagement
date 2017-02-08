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
  console.log("Füge das User Rating hinzu");
  task.addUserRating(taskId,userId,storyPoints,res);
});

router.post('/rest/ratingComplete', function(req, res, next) {
  var taskId      = req.body.taskId;
  console.log("Prüfe ob das Rating zu ende ist");
  task.isTaskRatingComplete(taskId,res);
});

router.post('/rest/setRating', function(req, res, next) {
  var taskId      = req.body.taskId;
  var storyPoints = req.body.storyPoints;
  console.log("Setze die Story Points");
  task.setFinalRating(taskId, storyPoints, res);
});
router.get('/rest/tick', function(req, res, next) {
  console.log("Tick");
  res.sendStatus(200);
});

module.exports = router;
