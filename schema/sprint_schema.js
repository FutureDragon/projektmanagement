/**
 * Created by Florian on 02.01.2017.
 */
var Task = require('./task_schema');
var User = require('./user_schema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//create a schema for users
var sprintSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    _creator: {type: String, ref: User},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: User}],
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: Task}]
});

module.exports = mongoose.model('Sprint', sprintSchema);