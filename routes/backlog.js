var express = require('express');
var router = express.Router();
var task = require('../models/task');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('backlogIndex', { title: 'Projektmanagement Backlog'});
});

router.post('/rest', function(req, res, next) {
  task.new(req.body.task, req.body.description, req.body.priority, req.body.story_points , req.body._creator, res);
  console.log("Task: " + req.body.task);
  console.log("Description: " + req.body.description);
});

router.post('/rest/update', function(req, res, next) {
  console.log("Update von : " + req.body.id);
  task.updateStatus(req.body.id, req.body.status, req.body.end, res);
});

router.post('/rest/updateEnd', function(req, res, next) {
    console.log("Update von : " + req.body.id);
    task.updateStatusEnd(req.body.id, req.body.status, req.body.end, res);
});

router.post('/rest/updateTask', function(req, res, next) {
    console.log("Update von : " + req.body.id);
    task.updateTask(req.body.id, req.body.task, req.body.description, req.body.priority, req.body.story_points,  res);
});

router.get('/new', function(req, res, next) {
  res.render('backlogNewTask', { title: 'Task anlegen', action : 'none'});
});

router.get('/rest/', function(req, res, next) {
      res.setHeader('Content-Type', 'application/json');
      task.getAll(res);
});

router.get('/rest/:id', function(req, res, next) {
      var id = req.params.id;
      task.get(id, res);

});
router.post('/rest/addSprint', function(req, res, next) {
    console.log("Update");
    task.assignSprintToTask(req.body.sprint_id, req.body.tasks, res);
});

router.post('/rest/removeSprint', function(req, res, next) {
    console.log("Remove sprint from task: ");
    task.removeSprintFromTask(req.body.tasks, req.body.sprint_id, res);
});

router.get('/rest/getTasksToSprint/:id', function(req, res, next) {
    var id = req.params.id;
    task.getTasksForSprint(id, res);
    //task.get(id, res);
});

router.post('/rest/delete', function(req, res, next) {
    console.log("Delete: " + req.body.id);
    task.deleteTask(req.body.id, res);
});

router.get('/rest/sprintToTask/:id', function(req, res, next) {
    var id = req.params.id;
    task.getSprintToTaskId(id, res);
});

router.get('/:id/edit', function(req, res, next) {
    var id = req.params.id;
    res.render('backlogAddUserToTask', { title: id});
});

router.post('/rest/addUserToTask', function(req, res, next) {
    var userId      = req.body.userId;
    var taskId      = req.body.taskId;
    console.log(userId);
    console.log(taskId);
    task.addUserToTask(taskId,userId, res);
});


router.post('/rest/addUsersToTask', function(req, res, next) {
    var usersId     = req.body.userId;
    var taskId      = req.body.taskId;
    console.log(usersId);
    console.log(taskId);
    //task.addUserToTask(taskId,userId, res);
});

module.exports = router;
