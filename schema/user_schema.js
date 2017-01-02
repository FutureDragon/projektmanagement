/**
 * Created by Florian on 02.01.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema for users
var userSchema = new Schema({
    firstname: {type: String, required:true},
    lastname: {type: String, required: true},
    username: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    created: {type: Date, default: Date.now },
    updated: Date
});

module.exports = mongoose.Model('User', userSchema);