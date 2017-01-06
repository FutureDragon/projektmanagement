/**
 * Include several packages which are needed
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./user_schema");
var Sprint = require("./sprint_schema");
var taskStatus = require("./taskStatus_schema");

/**
 * Define Schema for tasks
 */
var taskSchema = new Schema({
    task : String,
    description : String,
    _creator: {type: String, ref: User},
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Code Review', 'Done'],
        default: 'Open'
    },
    //status: [{type: mongoose.Schema.Types.ObjectId, Ref: taskStatus}],
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    created: {type: Date, default: Date.now},
    updated: Date,
    story_points: {type: Number, required:true},
    _sprint : {type: String, ref: Sprint}
});

// Create new model for a task
var Task = mongoose.model('Task', taskSchema);

// Exports module
module.exports = Task;
