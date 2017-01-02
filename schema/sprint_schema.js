/**
 * Created by Florian on 02.01.2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a schema for users
var sprintSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    start: {type: Date, required: true},
    end: {type: Date, required: true}
});

module.exports = mongoose.Model('Sprint', sprintSchema);