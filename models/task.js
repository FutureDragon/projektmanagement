var mongoose = require('mongoose');
var TaskSchema = require("../schema/task_schema");
var TaskStatus = require("./taskStatus");
var SprintModel = require("./sprint")
var db = require("./db");

function Task() {

    this.new = function (task, description, priority, storyPoints, creator, res) {
        db.connect();
        var taskModel = TaskSchema({
            task: task,
            description: description,
            priority: priority,
            story_points: storyPoints,
            _creator: creator
        });
        taskModel.save(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                TaskSchema.find({}, {_id: 1}).sort({$natural: -1}).limit(1).exec(function (err, taskID) {
                    if (err) throw err;
                    else {
                        TaskStatus.newTaskStatus(taskID[0]._id, 'Open', res);
                    }
                });
            }
        });
        //res.sendStatus(200);
        db.disconnect();
    };

    // get all tasks
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

    // Get a task found by id
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
    this.updateStatus = function (id, status, end, res) {
        db.connect();
        TaskSchema.findOneAndUpdate({_id: id}, {status: status, updated: Date.now(), end: end}, function (err, task) {
            if (err) {
                throw err;
            }
            else {
                // Call the function in taskStatus.js to create a new model which contains information about the taskStatus History
                TaskStatus.newTaskStatus(id, status, res);
            }
        });
        db.disconnect();
    };

    // End a task
    this.updateStatusEnd = function (id, status, end, res) {
        db.connect();
        TaskSchema.findOneAndUpdate({_id: id}, {status: status, updated: Date.now(), end: end}, function (err, task) {
            if (err) {
                throw err;
            }
            else {
                // Call the function in taskStatus.js to create a new model which contains information about the taskStatus History
                TaskStatus.newTaskStatus(id, status, res);
            }
        });
        db.disconnect();
    };

    // Update all elements of a task (without status)
    this.updateTask = function (id, task, description, priority, storypoints, res) {
        db.connect();
        TaskSchema.findOneAndUpdate({_id: id}, {
            task: task,
            description: description,
            priority: priority,
            updated: Date.now(),
            story_points: storypoints
        }, function (err) {
            if (err) throw err;
            else {
                res.sendStatus(200);
            }
        });
        db.disconnect();
    }

    // Get all tasks which do not belong to a sprint
    this.getTasksWithoutSprint = function (res) {
        db.connect();
        TaskSchema.find({_sprint: null}, function (err, tasks) {
            if (err) throw err;
            res.send(tasks);
        });
        db.disconnect();
        //res.sendStatus(200);
    };

    // Assign a task to a sprint
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

    // Get all tasks which belong to a sprint found by sprint ID
    this.getTasksForSprint = function (sprint_id, res) {
        db.connect();
        console.log(sprint_id);
        TaskSchema.find({_sprint: sprint_id}, function (err, tasks) {
            if (err) console.error(err);
            res.send(tasks);
        });
        db.disconnect();
    };

    // Remove a task (with specified ID)
    this.deleteTask = function (taskId, res) {
        db.connect();
        TaskSchema.remove({_id: taskId}, function (err) {
            if (err) console.log(err);
            res.sendStatus(200);
        });
        db.disconnect();
    };

    //Remove task from a sprint
    this.removeSprintFromTask = function (taskId, sprintId, res) {
        db.connect();
        TaskSchema.update({_id: taskId}, {$unset: {_sprint: 1}}, function (err) {
            if (err) console.log(err);
            res.sendStatus(200);
        });
        db.disconnect();
    };

    // Get a Sprint Id for a task
    this.getSprintToTaskId = function (task_id, res) {
        db.connect();
        TaskSchema.findById(task_id, function (err, task) {
            if (err) {
                throw err;
            }
            else {
                SprintModel.get(task._sprint, res);
            }
        });
        db.disconnect();
    }

    // @created: January 14th
    // Get all tasks they belong to a user and are not rated anymore
    this.getAllNotRatedTasksForUser = function (id, res) {
        db.connect();
        TaskSchema.find({
            assigned_users:{
                $elemMatch:{
                    user_id: id,
                    rating: null
                }
            }
        },
        function (err, tasks) {
            if (err) {
                throw err;
            }
            else {
                res.send(tasks);
            }
        });
        db.disconnect();
    }

    // @created: January 14th
    // Add a user to a task
    this.addUserToTask = function (taskID, userID, res) {
        db.connect();
        TaskSchema.find({_id: taskID}).update({$push: {assigned_users: {user_id: userID}}}).exec(function (err) {
            if (!err) res.sendStatus(200);
            else {
                throw err;
            }
        });
        db.disconnect();
    }
}

// Exports a new Task Object
module.exports = new Task();

