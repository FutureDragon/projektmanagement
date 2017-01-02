var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    task : String,
    description : String,
    sprintID : String,
    status: {
        type: String,
        enum: ['Done', 'In Progress', 'Open'],
        default: 'Open'
    }
});
module.exports = mongoose.model('tasks', taskSchema);
