/**
 * Created by Florian on 02.01.2017.
 */
var Sprint = require('./sprint_schema');
var User = require('./user_schema');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//create a schema for users
var milestoneSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    _creator: {type: String, ref: User},
    sprints: [{type: mongoose.Schema.Types.ObjectId, ref: Sprint}]
});

// Create model for a sprint
var Milestone = mongoose.model('Milestone', milestoneSchema);

// Exports the module
module.exports = Milestone;