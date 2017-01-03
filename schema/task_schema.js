/**
 * Include several packages which are needed
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

/**
 * Connect to the database
 */
var connection = mongoose.createConnection("mongodb://localhost/test");

/**
 * Register auto increment for this connection
 */

autoIncrement.initialize(connection);

/**
 * Define Schema for tasks
 */
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
    created: {type: Date, default: Date.now},
    updated: Date
});

/**
 * Set up auto increment for Model 'tasks"
 */
taskSchema.plugin(autoIncrement.plugin, 'tasks');

/**
 * Create new Task Model
 */
var Task = connection.model('tasks', taskSchema);

/**
 * Export this Module
 */
module.exports = Task;