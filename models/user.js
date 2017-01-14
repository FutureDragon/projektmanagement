var mongoose = require('mongoose');
var UserSchema = require("../schema/user_schema");
var db = require("./db");

function User() {

    this.new = function (firstName, lastName, pwd, mail,role, res) {
        db.connect();
        var User = UserSchema({ firstname: firstName, lastname: lastName, password: pwd, email: mail, role: role});
        User.save(function (err) {
            if (err) {
                console.log(err);
            }
            res.sendStatus(200);
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

    this.getById = function (id, res) {
        db.connect();
        UserSchema.find({_id: id}, function(err, user) {
            if (err){
                throw err;
            }
            else{
                if(user.length == 0) {
                    res.sendStatus(901)
                }
                else{
                    res.send(user);
                }

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
                if(user.length == 0) {
                    res.sendStatus(901)
                }
                else{
                    res.sendStatus(200);
                }

            }
        });
        db.disconnect();
    };

    // Remove a task (with specified ID)
    this.delete = function(id, res){
        db.connect();
        UserSchema.remove({_id: id}, function(err){
            if (err) console.log(err);
            res.sendStatus(200);
        });
        db.disconnect();
    };

    this.login = function (email,password, res) {
        db.connect();
        // maybe password validation
        UserSchema.find({ $and: [ { email: email}, { password: password}]}, function(err, user) {
            if (err){
                throw err;
            }
            else{
                if(user.length == 0) {
                    console.log("User nicht gefunden");
                    res.sendStatus(900);
                }
                else{
                    console.log(user);
                    console.log("User eingeloggt");
                    res.status(200).send(user[0]);
                }

            }
        });
        db.disconnect();

        // Get all employees

    };
    this.getAllEmployees = function (res) {
        db.connect();
        UserSchema.find({role: 'employee'}, function (err, employees) {
            if (!err) {
                res.send(employees);
            } else {
                throw err;
            }
        });
        db.disconnect();
    }
}
module.exports = new User();

