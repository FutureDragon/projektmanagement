var mongoose = require('mongoose');
var SprintSchema = require("../schema/sprint_schema");
var TaskSchema = require("../schema/task_schema");
var MilestoneSchema = require("../schema/milestone_schema");
var db = require('./db');
function Sprint() {

    this.new = function (name, description, start, end, creator) {
        db.connect();
        var sprintModel = SprintSchema({
            name: name, description: description,
            start: start, end: end, _creator: creator
        });
        sprintModel.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sprint angelegt');
            }
        });
        db.disconnect();
    };

    this.getAll = function (res) {
        db.connect();
        SprintSchema.find({}, function (err, sprints) {
            if (err) throw err;
            res.send(sprints);
            return sprints;
        });
        db.disconnect();
    };


    this.get = function (id, res) {
        db.connect();
        SprintSchema.findById(id, function (err, sprints) {
            if (err)throw err;
            res.send(sprints);
        });
        db.disconnect();
    };

    this.getSprintToTaskId = function (taskId, res) {
        db.connect();
        SprintSchema.find({tasks: {"$in": [taskId]}}, function (err, sprint) {
            if (err) console.log(err);
            res.send(sprint);
        });
        db.disconnect();
    };

    // Remove sprintIds from a task
    this.deleteSprintFromTasks = function (sprintId, res) {
        db.connect();
        TaskSchema.find({_sprint: sprintId}).update({}, {$unset: {_sprint: 1}}, {multi: true}).exec(function (err) {
            if (err) throw err;
            else {
                SprintSchema.remove({_id: sprintId}, function (err) {
                    if (err) throw err;
                    console.log("Löschvorgang erfolgreich");
                });
            }
        });
        res.sendStatus(200);
        db.disconnect();
    };

    //Remove all tasks within a specified sprint and the sprint itself
    this.deleteTasksWithSprintId = function (sprintId, res) {
        db.connect();
        console.log("Übergeben Sprint ID : " + sprintId);
        TaskSchema.find({_sprint: sprintId}).remove({}).exec(function (err) {
            if (err) {
                throw err;
            }
            else {
                SprintSchema.remove({_id: sprintId}, function (err) {
                    if (err) throw err;
                })
            }
        });
        res.sendStatus(200);
        db.disconnect();
    };

    // Update all ellements of sprint
    this.updateSprint = function (id, name, description, start, end, res) {
        db.connect();
        SprintSchema.findOneAndUpdate({_id: id}, {
            name: name, description: description,
            start: start, end: end
        }, function (err) {
            if (err) throw err;
            else {
                res.sendStatus(200);
            }
        });
        db.disconnect();
    };

    // Get all sprints which do not belong to a milestone
    this.getSprintsWithoutMilestone = function (res) {
        db.connect();
        SprintSchema.find({_milestone: null}, function (err, sprints) {
            if (err) throw err;
            res.send(sprints);
        });
        db.disconnect();
        //res.sendStatus(200);
    };

    // Get all sprints which belong to a milestone found by milestone ID
    this.getSprintsForMilestone = function (milestone_id, res) {
        db.connect();
        console.log(milestone_id);
        SprintSchema.find({_milestone: milestone_id}, function (err, sprints) {
            if (err) console.error(err);
            res.send(sprints);
        });
        db.disconnect();
    };

}

    // Assign a milestone to a sprint
    this.assignMilestoneToSprint = function (sprint_id, milestone_id, res) {
        db.connect();
        SprintSchema.findOneAndUpdate({_id: sprint_id}, {_milestone: milestone_id}, function (err, user) {
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

module.exports = new Sprint();
