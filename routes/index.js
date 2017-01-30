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
router.post('/rest/install/addAdmin', function(req, res, next) {
  console.log("Insert Admin User...");
  user.new("Roberto", "Blanco","admin","admin@admin.de","admin",res);
});
router.post('/rest/install/addScrum', function(req, res, next) {
  console.log("Insert Scrum User...");
  user.new("Peter", "Keks","scrum","scrum@admin.de","scrummaster",res);
});
router.post('/rest/install/addUser', function(req, res, next) {
  console.log("Insert User...");
  user.new("Bob", "Baumeister","user","user@admin.de","employee",res);
});
router.post('/rest/install/addUser2', function(req, res, next) {
  console.log("Insert User2...");
  user.new("Franz", "Kranz","user","user2@admin.de","employee",res);
});
// ___________________________TASKS____________________________________________
router.post('/rest/install/addTask', function(req, res, next) {
  console.log("Insert Task...");
  task.new("TaskName", "Task Beschreibung", "Low", 10, "", res);
});
router.post('/rest/install/addTask2', function(req, res, next) {
  console.log("Insert Task...");
  task.new("TaskName2", "Task Beschreibung2", "Medium", 15, "", res);
});
router.post('/rest/install/addTask3', function(req, res, next) {
  console.log("Insert Task...");
  task.new("TaskName3", "Task Beschreibung3", "High", 2, "", res);
});
router.post('/rest/install/addTask4', function(req, res, next) {
  console.log("Insert Task...");
  task.new("TaskName4", "Task Beschreibung4", "High", 7, "", res);
});
router.post('/rest/install/addTask5', function(req, res, next) {
  console.log("Insert Task...");
  task.new("TaskName5", "Task Beschreibung5", "Medium", 8, "", res);
});
// __________________________SPRINTS___________________________________________
router.post('/rest/install/addSprint', function(req, res, next) {
  console.log("Insert Sprint...");
  sprint.new("SprintName", "Sprint Beschreibung", "02/15/2017", "02/16/2017", "");
  res.sendStatus(200);
});
router.post('/rest/install/addSprint2', function(req, res, next) {
  console.log("Insert Sprint...");
  sprint.new("SprintName2", "Sprint Beschreibung2", "01/25/2017", "02/5/2017", "");
  res.sendStatus(200);
});
router.post('/rest/install/addSprint3', function(req, res, next) {
  console.log("Insert Sprint...");
  sprint.new("SprintName3", "Sprint Beschreibung3", "02/10/2017", "02/25/2017", "");
  res.sendStatus(200);
});
router.post('/rest/install/addSprint4', function(req, res, next) {
  console.log("Insert Sprint...");
  sprint.new("SprintName4", "Sprint Beschreibung4", "03/01/2017", "03/15/2017", "");
  res.sendStatus(200);
});
router.post('/rest/install/addSprint5', function(req, res, next) {
  console.log("Insert Sprint...");
  sprint.new("SprintName5", "Sprint Beschreibung5", "03/10/2017", "03/20/2017", "");
  res.sendStatus(200);
});
// __________________________Milestones_______________________________________
router.post('/rest/install/addMilestone', function(req, res, next) {
  console.log("Insert Milestone...");
  milestone.new("MilestoneName", "Milestone Beschreibung", "03/10/2017", "03/20/2017", "");
  res.sendStatus(200);
});
router.post('/rest/install/addMilestone2', function(req, res, next) {
  console.log("Insert Milestone...");
  milestone.new("MilestoneName2", "Milestone Beschreibung2", "01/01/2017", "01/15/2017", "");
  res.sendStatus(200);
});
router.post('/rest/install/addMilestone3', function(req, res, next) {
  console.log("Insert Milestone...");
  milestone.new("MilestoneName3", "Milestone Beschreibung3", "01/15/2017", "02/15/2017", "");
  res.sendStatus(200);
});router.post('/rest/install/addMilestone4', function(req, res, next) {
  console.log("Insert Milestone...");
  milestone.new("MilestoneName4", "Milestone Beschreibun4g", "02/15/2017", "03/10/2017", "");
  res.sendStatus(200);
});

module.exports = router;
