var mongoose = require('mongoose');
var UserSchema = require("../schema/user_schema");
var db = require("./db");

function User() {

    this.new = function (firstName, lastName, userName, pwd, mail) {
        db.connect();

        // UserSchema.find({$or: [{username: userName}, {email: mail}]}, function (err, users) {
        //     console.log(users);
        //     console.log("Anzahl an Usern: " + users.length);
        //     if(users.length == 0){
        //         var User = UserSchema({ firstname: firstName, lastname: lastName, username: userName, password: pwd, email: mail});
        //         User.save(function (err) {
        //             if(err) console.log(err);
        //         });
        //         console.log(User);
        //     }
        //     else{
        //         console.log('User already exists', null);
        //     }
        // });
        // db.disconnect();

        var User = UserSchema({ firstname: firstName, lastname: lastName, username: userName, password: pwd, email: mail});
        User.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
        db.disconnect();
    };

    this.getAllUsers = function (res) {
        db.connect();
        UserSchema.find({}, function(err, users) {
            if (err){
                throw err;
            }
            else{
                res.send(users);
            }
        });
        db.disconnect();
    };

    this.get = function (name ,res) {
        db.connect();
        UserSchema.find({ username: name }, function(err, user) {
            if (err){
                throw err;
            }
            else{
                res.send(user);
            }
        });
        db.disconnect();
    };

    // Find one user by mail
    this.getByMail = function (mail, res) {
        db.connect();
        // maybe password validation
        UserSchema.find({email: mail }, function(err, user) {
            if (err){
                throw err;
            }
            else{
                res.send(user);
            }
        });
        db.disconnect();
    };
}
module.exports = new User();

