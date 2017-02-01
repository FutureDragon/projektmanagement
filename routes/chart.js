var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('chartIndex', { title: 'Projektmanagement Burn-Down-Charts'});
});

router.get('/milestone/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('chartMilestone', { title: 'Projektmanagement Burn-Down-Charts', milestoneid: id});
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('chart', { title: 'Projektmanagement Burn-Down-Charts', sprintid: id});
});

module.exports = router;
