var express = require('express');
var router = express.Router();
var task = require('../models/task');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('backlogIndex', { title: 'Projektmanagement Backlog'});
});

router.post('/rest', function(req, res, next) {
  task.new(req.body.task, req.body.description, res);
  //res.render('backlogNewTask', { title: 'Task anlegen', action : 'success'});
  console.log("Task: " + req.body.task);
  console.log("Description: " + req.body.description);
});

router.get('/new', function(req, res, next) {
  res.render('backlogNewTask', { title: 'Task anlegen', action : 'none'});
});

router.get('/get', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  task.getAll(res);
});

router.get('/get/:name', function(req, res, next) {
  var name = req.params.name;
  task.get(name, res);
});

module.exports = router;
