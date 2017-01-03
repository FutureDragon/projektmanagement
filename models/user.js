var mongoose = require('mongoose');
var UserSchema = require("../schema/user_schema");
function User() {

    this.new = function (firstname, lastname, username, password, email) {
        mongoose.connect('mongodb://localhost/test');
        var taskModel = UserSchema({ firstname: firstname, lastname: lastname, username: username,
        password: password, email: email});
        userModel.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('User angelegt');
            }
        });
        mongoose.disconnect();
    };

    this.getAll = function (res) {
        mongoose.connect('mongodb://localhost/test');
        UserSchema.find({}, function(err, users) {
            if (err) throw err;
            res.send(users);
            return users;
        });
        mongoose.disconnect();
    };

    this.get = function (username ,res) {
        mongoose.connect('mongodb://localhost/test');
        UserSchema.find({ username: username }, function(err, users) {
            if (err) throw err;
            res.send(users);
        });
        mongoose.disconnect();
    };
}
module.exports = new User();
