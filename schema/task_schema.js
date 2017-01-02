var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskShema = new Schema({
    task : String,
    description : String
});
module.exports = mongoose.model('tasks', taskShema);
