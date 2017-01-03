/**
 * Include several packages which are needed
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./user_schema");
var Sprint = require("./sprint_schema");

/**
 * Define Schema for tasks
 */
var taskSchema = new Schema({
    task : String,
    description : String,
    sprintID : String,
    _creator: {type: String, ref: User},
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
    created: {type: Date, default: Date.now},
    updated: Date,
    _sprint : {type: String, ref: Sprint}
});

/**
 * Create new Task Model and export this Module
 */
module.exports = mongoose.model('Task', taskSchema);
