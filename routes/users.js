var express = require('express');
var router = express.Router();
var user = require('../models/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('userIndex', {title: 'Users'});
});

router.get('/rest', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    user.getAllUsers(res);
});


router.get('/rest/getEmployees', function (req, res, next) {
    console.log("asd");
    //res.setHeader('Content-Type', 'application/json');
    user.getAllEmployees(res);
});

router.get('/rest/:id', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    user.getById(req.params.id, res);
});

router.post('/rest/existUser', function (req, res, next) {
    user.getByMail(req.body.email, res);
});

router.post('/rest/delete', function (req, res, next) {
    user.delete(req.body.id, res);
});

router.post('/rest', function (req, res, next) {
    user.new(req.body.firstName, req.body.lastName, req.body.password, req.body.email, req.body.role, res);
});


router.post('/rest/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    res.setHeader('Content-Type', 'application/json');
    user.login(email,password,res);
});



module.exports = router;
