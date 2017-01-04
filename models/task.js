var mongoose = require('mongoose');
var TaskSchema = require("../schema/task_schema");
var db = require("./db");

function Task() {

    this.new = function (task, description, priority, storyPoints,res) {
        db.connect();
        var taskModel = TaskSchema({ task: task, description: description, priority: priority, story_points :  storyPoints});
        taskModel.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.sendStatus(200);
        db.disconnect();
    };

    this.getAll = function (res) {
        db.connect();
        TaskSchema.find({}, function (err, tasks) {
            if (err){
                console.log(err);
            }
            else{
                res.send(tasks);
            }

        });
        db.disconnect();
    };

    this.get = function (id, res) {
            db.connect();
            TaskSchema.findById(id, function(err, task) {
                if (err){
                    throw err;
                }
                else{
                    res.send(task);
                }
            });
            db.disconnect();
    };

    this.updateStatus = function (id, status, res) {
        db.connect();
        TaskSchema.findOneAndUpdate({ _id: id}, { status: status }, function(err, user) {
            if (err){
                throw err;
            }
            else {
                // we have the updated user returned to us
                console.log(user);
            }
        });
        db.disconnect();
        res.sendStatus(200);
    }
}
// Exports a new Task Object
module.exports = new Task();
