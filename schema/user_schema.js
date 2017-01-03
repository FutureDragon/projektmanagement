/**
 * Created by Florian on 02.01.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = require("./task_schema");

//create a schema for users
var userSchema = new Schema({
    firstname: {type: String, required:true},
    lastname: {type: String, required: true},
    username: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    created: {type: Date, default: Date.now },
    updated: Date,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: Task}]
});

module.exports = mongoose.model('User', userSchema);