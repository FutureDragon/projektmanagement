var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    task : String,
    description : String,
    sprintID : String,
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Code Review', 'Done'],
        default: 'Open'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    author: String,
    created: Date,
    updated: Date

});
module.exports = mongoose.model('tasks', taskSchema);