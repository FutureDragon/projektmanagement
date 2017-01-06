var mongoose = require('mongoose');
var TaskSchema = require("../schema/task_schema");
var TaskStatus = require("./taskStatus");
var db = require("./db");

function Task() {

    this.new = function (task, description, priority, storyPoints, res) {
        db.connect();
        var taskModel = TaskSchema({
            task: task,
            description: description,
            priority: priority,
            story_points: storyPoints
        });
        taskModel.save(function (err) {
            if (err) {
                console.log(err);
            }
            else{
                TaskSchema.find({},{_id: 1}).sort({$natural: -1}).limit(1).exec(function (err, taskID) {
                    if(err) throw err;
                    else{
                        TaskStatus.newTaskStatus(taskID[0]._id, 'Open', res);
                    }
                });
            }
        });
        //res.sendStatus(200);
        db.disconnect();
    };

    this.getAll = function (res) {
        db.connect();
        TaskSchema.find({}, function (err, tasks) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(tasks);
            }

        });
        db.disconnect();
    };

    this.get = function (id, res) {
        db.connect();
        TaskSchema.findById(id, function (err, task) {
            if (err) {
                throw err;
            }
            else {
                res.send(task);
            }
        });
        db.disconnect();
    };

    // Update the status of a task
    this.updateStatus = function (id, status, res) {
        db.connect();
        TaskSchema.findOneAndUpdate({_id: id}, {status: status, updated: Date.now()}, function (err, task) {
            if (err) {
                throw err;
            }
            else {
                // Call the function in taskStatus.js to create a new model which contains information about the taskStatus History
                TaskStatus.newTaskStatus(id,status,res);
            }
        });


        db.disconnect();
        //res.sendStatus(200);
    };

    this.getTasksWithoutSprint = function (res) {
        db.connect();
        TaskSchema.find({_sprint: null}, function (err, tasks) {
            if (err) throw err;
            res.send(tasks);
        });
        db.disconnect();
        //res.sendStatus(200);
    };

    this.assignSprintToTask = function (sprint_id, task_id, res) {
        db.connect();
        TaskSchema.findOneAndUpdate({_id: task_id}, {_sprint: sprint_id}, function (err, user) {
            if (err) {
                throw err;
            }
            else {
                // we have the updated user returned to us
                console.log(user);
            }
        });
        db.disconnect();
        res.sendStatus(200);
    };

    this.getTasksForSprint = function (sprint_id, res) {
        db.connect();
        console.log(sprint_id);
        TaskSchema.find({_sprint: sprint_id}, function (err, tasks){
           if(err) console.error(err);
           res.send(tasks);
        });
        db.disconnect();
    }
}
// Exports a new Task Object
module.exports = new Task();
