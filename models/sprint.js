var mongoose = require('mongoose');
var SprintSchema = require("../schema/sprint_schema");
function Sprint() {

    this.new = function (name, description, start, end) {
        mongoose.connect('mongodb://localhost/test');
        var sprintModel = SprintSchema({ name: name, description: description, start: start, end: end });
        sprintModel.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sprint angelegt');
            }
        });
        mongoose.disconnect();
    };

    this.getAll = function (res) {
        mongoose.connect('mongodb://localhost/test');
        SprintSchema.find({}, function(err, sprints) {
            if (err) throw err;
            res.send(sprints);
            return sprints;
        });
        mongoose.disconnect();
    };

    this.get = function (name ,res) {
        mongoose.connect('mongodb://localhost/test');
        SprintSchema.find({ name: name }, function(err, sprints) {
            if (err) throw err;
            res.send(sprints);
        });
        mongoose.disconnect();
    };
}
module.exports = new Sprint();
