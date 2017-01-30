var express = require('express');
var router = express.Router();
var db = require('../models/db');
var user = require('../models/user');
var task = require('../models/task');
var sprint = require('../models/sprint');
var milestone = require('../models/milestone');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Projektmanagement'});
});

router.get('/reminder', function(req, res, next) {
});

router.get('/faq', function(req, res, next) {
  res.render('faq');
});

router.get('/install', function(req, res, next) {
  res.render('install');
});

router.post('/rest/install', function(req, res, next) {
  db.dropAll();
  console.log("Database was dropped");
  res.sendStatus(200);
});
// __________________________USER______________________________________________
router.post('/rest/install/addUsers', function(req, res, next) {
  console.log("Insert Users...");
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var pw = req.body.pw;
  var email = req.body.email;
  var role = req.body.role;
  user.new(firstname, lastname,pw,email,role,res);
});
// ___________________________TASKS____________________________________________
router.post('/rest/install/addTasks', function(req, res, next) {
  console.log("Insert Tasks...");
  var name = req.body.name;
  var description = req.body.description;
  var priority = req.body.priority;
  var points = req.body.points;
  var creator = req.body.creator;
  task.new(name,description,priority,points,creator,res);
});
// __________________________SPRINTS___________________________________________
router.post('/rest/install/addSprints', function(req, res, next) {
  console.log("Insert Sprints...");
  var name = req.body.name;
  var description = req.body.description;
  var start = req.body.start;
  var end = req.body.end;
  var creator = req.body.creator;
  sprint.new(name,description,start,end,creator,res);
  res.sendStatus(200);
});
// __________________________Milestones_______________________________________
router.post('/rest/install/addMilestones', function(req, res, next) {
  console.log("Insert Milestones...");
  var name = req.body.name;
  var description = req.body.description;
  var start = req.body.start;
  var end = req.body.end;
  var creator = req.body.creator;
  milestone.new(name,description,start,end,creator,res);
  res.sendStatus(200);
});
router.post('/rest/install/addMilestone', function(req, res, next) {
  console.log("Insert Milestone...");
  milestone.new("MilestoneName", "Milestone Beschreibung", "03/10/2017", "03/20/2017", "scrum@admin.de");
  res.sendStatus(200);
});
router.post('/rest/install/addMilestone2', function(req, res, next) {
  console.log("Insert Milestone...");
  milestone.new("MilestoneName2", "Milestone Beschreibung2", "01/01/2017", "01/15/2017", "scrum@admin.de");
  res.sendStatus(200);
});
router.post('/rest/install/addMilestone3', function(req, res, next) {
  console.log("Insert Milestone...");
  milestone.new("MilestoneName3", "Milestone Beschreibung3", "01/15/2017", "02/15/2017", "scrum@admin.de");
  res.sendStatus(200);
});
router.post('/rest/install/addMilestone4', function(req, res, next) {
  console.log("Insert Milestone...");
  milestone.new("MilestoneName4", "Milestone Beschreibun4g", "02/15/2017", "03/10/2017", "scrum@admin.de");
  res.sendStatus(200);
});
// _________________________Get_ID´s__________________________________________
module.exports = router;
