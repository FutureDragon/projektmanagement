var mongoose = require('mongoose');
var UserSchema = require("../schema/user_schema");
var db = require("./db");

function User() {

    this.new = function (firstName, lastName, userName, pwd, mail) {
        db.connect();
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

    this.userLogin = function (mail, res) {
        console.log('user login');
        console.log('Mail:'+ mail);
        db.connect();
        /*
            maybe password validation
         */
        UserSchema.find( {email : mail}, function(err, user) {
            if (err){
                throw err;
            }
            else{
                console.log('wrong way');
                res.send(user);
            }
        });
        db.disconnect();
    };
}
module.exports = new User();

