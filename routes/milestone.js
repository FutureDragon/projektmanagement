var express = require('express');
var router = express.Router();
var milestone = require('../models/milestone');
var sprint = require('../models/sprint');

router.get('/', function (req, res, next) {
    res.render('milestoneIndex', {title: 'Projektmanagement Meilensteine'});
});

router.get('/rest', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    milestone.getAll(res);
});

router.post('/rest', function (req, res, next) {
    milestone.new(req.body.name, req.body.description, req.body.start, req.body.end, req.body._creator);
});

router.get('/rest/count', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    milestone.countMilestones(res);
});

router.post('/rest/update', function (req, res, next) {
    console.log("Update von: " + req.body.id);
    milestone.updateMilestone(req.body.id, req.body.name, req.body.description,
        req.body.start, req.body.end, res);
    console.log("Sprint: " + req.body.name);
    console.log("Description: " + req.body.description);
    console.log("Start date: " + req.body.start);
    console.log("End date: " + req.body.end);
});

router.get('/rest/sprintWithoutMilestone', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    sprint.getSprintsWithoutMilestone(res);
});

router.get('/rest/:id', function (req, res, next) {
    var id = req.params.id;
    milestone.get(id, res);
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('milestoneEdit', { title: id});
});

module.exports = router;
