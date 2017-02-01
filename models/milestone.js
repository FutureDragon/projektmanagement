var mongoose = require('mongoose');
var MilestoneSchema = require("../schema/milestone_schema");
var TaskSchema = require("../schema/task_schema");
var db = require('./db');
function Milestone() {

    this.new = function (name, description, start, end, creator) {
        db.connect();
        var milestoneModel  = MilestoneSchema({
            name: name, description: description,
            start: start, end: end, _creator: creator
        });
        milestoneModel.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Milestone angelegt');
            }
        });
        db.disconnect();
    };

    this.getAll = function (res) {
        db.connect();
        MilestoneSchema.find({}, function (err, sprints) {
            if (err) throw err;
            res.send(sprints);
            return sprints;
        });
        db.disconnect();
    };

    this.get = function (id, res) {
        db.connect();
        MilestoneSchema.findById(id, function (err, sprints) {
            if (err)throw err;
            res.send(sprints);
        });
        db.disconnect();
    };

    this.updateMilestone = function (id, name, description, start, end, res) {
        db.connect();
        MilestoneSchema.findOneAndUpdate({_id: id}, {
            name: name, description: description,
            start: start, end: end
        }, function (err) {
            if (err) throw err;
            else {
                res.sendStatus(200);
            }
        });
        db.disconnect();
    }
}
module.exports = new Milestone();
