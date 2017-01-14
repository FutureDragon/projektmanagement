var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('chartIndex', { title: 'Projektmanagement Burn-Down-Chart'});
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('chart', { title: 'Projektmanagement Burn-Down-Chart', sprintid: id});
});

module.exports = router;
