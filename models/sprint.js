var mongoose = require('mongoose');
var SprintSchema = require("../schema/sprint_schema");
var TaskSchema = require("../schema/task_schema");
var db = require('./db');
function Sprint() {

    this.new = function (name, description, start, end) {
        db.connect();
        var sprintModel = SprintSchema({ name: name, description: description, start: start, end: end });
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
        SprintSchema.find({}, function(err, sprints) {
            if (err) throw err;
            res.send(sprints);
            return sprints;
        });
        db.disconnect();
    };


    this.get = function (id ,res) {
        db.connect();
        SprintSchema.findById(id, function(err, sprints) {
            if (err)throw err;
            res.send(sprints);
        });
        db.disconnect();
    };

    // Remove a sprint (with specified ID)
    this.deleteSprint = function(sprintId, res){
        db.connect();
        SprintSchema.remove({_id: sprintId}, function(err){
            if (err) console.log(err);
            res.sendStatus(200);
        });
        db.disconnect();
    }

    // Remove sprintIds from a task
    this.deleteSprintFromTasks = function(sprintId, res){
        db.connect();
        TaskSchema.update({_sprint: sprintId}, {$unset: {_sprint: 1}}, function (err) {
            if(err){
                console.log(err);
            }
            else{
                this.deleteSprint(sprintId, res)
            }

        });
        db.disconnect();
    }

    //Remove all tasks within a specified sprint
    this.deleteTasksWithSprintId = function (sprintId, res) {
        db.connect();
        TaskSchema.remove({_sprint: sprintId}, function (err) {
            if(err){
                console.log(err);
            }
            else{
                this.deleteSprint(sprintId, res);
            }
        })
        db.disconnect();
    }

}
module.exports = new Sprint();
