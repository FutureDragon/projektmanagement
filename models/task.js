var mongoose = require('mongoose');
var TaskSchema = require("../schema/task_schema");
function Task() {

    this.new = function (task, description) {
        mongoose.connect('mongodb://localhost/test');
        var taskModel = TaskSchema({ task: task, description: description });
        taskModel.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Task angelegt');
            }
        });
        mongoose.disconnect();
    };

    this.getAll = function (res) {
        mongoose.connect('mongodb://localhost/test');
        TaskSchema.find({}, function(err, tasks) {
            if (err) throw err;
            res.send(tasks);
            return tasks;
        });
        mongoose.disconnect();
    };

    this.get = function (name ,res) {
        mongoose.connect('mongodb://localhost/test');
        TaskSchema.find({ task: name }, function(err, task) {
            if (err) throw err;
            res.send(task);
        });
        mongoose.disconnect();
    };

    this.updateStatus = function (name, status) {
        mongoose.connect('mongodb://localhost/test');
        TaskSchema.findOneAndUpdate({ task: name }, { status: status }, function(err, user) {
            if (err) throw err;

            // we have the updated user returned to us
            console.log(user);
        });

        mongoose.disconnect();
    }
}
module.exports = new Task();
