var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('planningPokerIndex', { title: 'Planning Poker'});
});


router.get('/chart', function(req, res, next) {
  res.render('chart', { title: 'Projektmanagement'});
});

module.exports = router;
