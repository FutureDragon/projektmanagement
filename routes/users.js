var express = require('express');
var router = express.Router();
var user = require('../models/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('userIndex', {title: 'Users'});
});

router.post('/new', function (req, res, next) {
    user.new(req.body.firstname, req.body.lastname, req.body.username, req.body.password,
        req.body.email);
    res.render('userNewUser', {title: 'User anlegen', action: 'success'});
    console.log("First name: " + req.body.firstname);
    console.log("Last name: " + req.body.lastname);
    console.log("Username: " + req.body.username);
    console.log("Password: " + req.body.password);
    console.log("Email: " + req.body.email);
});

router.get('/new', function (req, res, next) {
    res.render('userNewUser', {title: 'User anlegen', action: 'none'});
});

router.get('/get', function (req, res, next) {
    user.getAllUsers(res);
});

router.get('/get/:name', function (req, res, next) {
    var name = req.params.name;
    user.get(name, res);
});

module.exports = router;
