var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('backlogIndex', { title: 'Projektmanagement Backlog'});
});
router.post('/new', function(req, res, next) {
  res.render('backlogNewTask', { title: 'Task anlegen', action : 'success'});
  console.log("Task: " + req.body.task);
  console.log("Description: " + req.body.description);
});
router.get('/new', function(req, res, next) {
  res.render('backlogNewTask', { title: 'Task anlegen', action : 'none'});
});



module.exports = router;
