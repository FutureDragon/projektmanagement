var mongoose = require('mongoose');
var TaskSchema = require("../schema/task_schema");
function Task() {

    this.new = function (task, description, res) {
        mongoose.connect('mongodb://localhost/test');
        var taskModel = TaskSchema({ task: task, description: description });
        taskModel.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Task angelegt');
            }
        });
        res.sendStatus(200);
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

    this.get = function (id ,res) {
        mongoose.connect('mongodb://localhost/test');
        TaskSchema.findById(id, function(err, task) {
            if (err) throw err;
            res.send(task);
        });
        mongoose.disconnect();
    };

    this.updateStatus = function (id, status, res) {
        mongoose.connect('mongodb://localhost/test');
        TaskSchema.findOneAndUpdate({ _id: id}, { status: status }, function(err, user) {
            if (err) throw err;

            // we have the updated user returned to us
            console.log(user);
        });

        mongoose.disconnect();
        res.sendStatus(200);
    }
}
module.exports = new Task();
