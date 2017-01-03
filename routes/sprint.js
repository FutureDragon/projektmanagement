var express = require('express');
var router = express.Router();
var sprint = require('../models/sprint');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('sprintIndex', {title: 'Projektmanagement Sprints'});
});

router.post('/new', function (req, res, next) {
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

router.get('/get', function (req, res, next) {
    sprint.getAll(res);
});

router.get('/get/:name', function (req, res, next) {
    var name = req.params.name;
    sprint.get(name, res);
});

module.exports = router;
