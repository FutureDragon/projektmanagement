var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('roadmap', { title: 'Projektmanagement Roadmap'});
});

module.exports = router;
