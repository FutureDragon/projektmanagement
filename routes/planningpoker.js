var express = require('express');
var router = express.Router();
var task = require('../models/task');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('planningPokerIndex', { title: 'Planning Poker'});
});


router.get('/rest', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  task.getAll(res);
});

module.exports = router;
