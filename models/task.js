var mongoose = require('mongoose');
var TaskSchema = require("../schema/task_schema");
var db = require("./db");
function Task() {

    this.new = function (task, description) {
        db.connect();
        var taskModel = TaskSchema({ task: task, description: description });
        taskModel.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Task angelegt');
            }
        });
        db.disconnect();
    };

    this.getAll = function (res) {
        db.connect();
        TaskSchema.find({}, function (err, tasks) {
            if (err) throw err;
            res.send(tasks);
            return tasks;
        });
        db.disconnect();
    };

    this.get = function (name, res) {
        db.connect();
        TaskSchema.find({task: name}, function (err, task) {
            if (err) throw err;
            res.send(task);
        });
        db.disconnect();
    };

    this.updateStatus = function (name, status) {
        db.connect();
        TaskSchema.findOneAndUpdate({task: name}, {status: status}, function (err, user) {
            if (err) throw err;

            // we have the updated user returned to us
            console.log(user);
        });
        db.disconnect();
    }
}
// Exports a new Task Object
module.exports = new Task();
