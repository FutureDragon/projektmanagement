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


        TaskSchema.find({}, function(err, tasks) {
            if (err) throw err;
            // object of all the users
            return tasks;
        });

        mongoose.disconnect();
    };
}
module.exports = new Task();
