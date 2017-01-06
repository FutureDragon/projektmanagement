var express = require('express');
var router = express.Router();
var sprint = require('../models/sprint');
var task = require('../models/task');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('sprintIndex', {title: 'Projektmanagement Sprints'});
});

router.post('/rest', function (req, res, next) {
    sprint.new(req.body.name, req.body.description, req.body.start, req.body.end);
    res.render('sprintNewSprint', {title: 'Sprint anlegen', action: 'success'});
    console.log("Sprint: " + req.body.name);
    console.log("Description: " + req.body.description);
    console.log("Start date: " + req.body.start);
    console.log("End date: " + req.body.end);
});

router.get('/new', function (req, res, next) {
    res.render('sprintNewSprint', {title: 'Sprint anlegen', action: 'none'});
});

router.get('/rest', function (req, res, next) {
    sprint.getAll(res);
});

router.get('/rest/taskWithoutSprint', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    task.getTasksWithoutSprint(res);
});

router.get('/rest/:id', function (req, res, next) {
    var id = req.params.id;
    sprint.get(id, res);
});

router.post('/rest/delete', function (req, res, next) {
    var id = req.params.id;
    console.log("Delete sprint: " + id);
    sprint.deleteSprintFromTasks(id, res);
});

router.post('/rest/deleteWithTask', function (req, res, next) {
    var id = req.params.id;
    console.log("Delete sprint: " + id);
    sprint.deleteTasksWithSprintId(id, res);
});

router.get('/:name', function (req, res, next) {
    var name = req.params.name;
    res.render('sprintShow',{title: name});
});
router.get('/:name/edit', function (req, res, next) {
    var name = req.params.name;
    res.render('sprintEdit',{title: name});
});

module.exports = router;
