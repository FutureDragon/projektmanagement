/**
 * Created by Florian on 05.01.2017.
 */
var Task = require('./task_schema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskHistory_schema = new mongoose.Schema({
    _task: {type: mongoose.Schema.Types.ObjectId, Ref: Task},
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Code Review', 'Done'],
        default: 'Open'
    },
    updated: {type: Date, default: Date.now}
});

var TaskHistory = mongoose.model('TaskHistory', taskHistory_schema);

module.exports= TaskHistory;