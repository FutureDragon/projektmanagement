/**
 * Created by Dominik on 06.01.2017.
 */

var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.get('/', function(req, res){
    // check if the user's credentials are saved in a cookie //
    if (req.cookies.user == undefined || req.cookies.pass == undefined){
        res.render('login', { title: 'Hello - Please Login To Your Account' });
    }	else{
        // attempt automatic login //
        user.userLogin(req.cookies.user, req.cookies.pass, function(user){
            if (user != null){
                req.session.user = user;
                res.redirect('/backlog');
            }	else{
                res.render('login', { title: 'Hello - Please Login To Your Account' });
            }
        });
    }
});

router.post('/', function(req, res){
    // user.new('firstName', 'lastName', 'userName', 'test', 'test');
    // console.log(user.getAllUsers());
    user.userLogin(req.body['email'], function(err, user){
        console.log("email: "+ req.body['email']);
        console.log("pass: " +req.body['pass']);
        if (!user){
            res.status(400).send(err);
        }
        else{
            req.session.user = user;
            console.log('Email: ' + user.email +' Session ID: '+ req.sessionID)
            if (req.body['remember-me'] == 'true'){
                res.cookie('email', user.email, { maxAge: 900000 });
                res.cookie('pass', user.pass, { maxAge: 900000 });
            }
            res.status(200).send(user);
            console.log('login erfolgreich');
        }

    });
});
module.exports = router;
