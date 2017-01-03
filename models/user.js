var mongoose = require('mongoose');
var User = require("../schema/user_schema");
var db = require("./db");
function User() {

    this.new = function (firstName, lastName, userName, pwd, mail) {
        db.connect();
        var taskModel = User({ firstname: firstName, lastname: lastName, username: userName, password: pwd, email: mail});
        userModel.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
        db.disconnect();
    };

    this.getAllUsers = function (res) {
        db.connect();
        User.find({}, function(err, users) {
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
        User.find({ username: name }, function(err, user) {
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
