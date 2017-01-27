var mongoose = require('mongoose');

function Connection(){
    this.connect = function(){
        return mongoose.connect("mongodb://localhost/test", {server: {reconnectTries: Number.MAX_VALUE }});

    };

    this.disconnect = function(){
        return mongoose.disconnect();
    };

    this.dropAll = function () {
        mongoose.connect('mongodb://localhost/test',function(){
            /* Drop the DB */
            mongoose.connection.db.dropCollection('users', function(err, result) {});
            mongoose.connection.db.dropCollection('tasks', function(err, result) {});
            mongoose.connection.db.dropCollection('sprints', function(err, result) {});
            mongoose.connection.db.dropCollection('milestones', function(err, result) {});
        });
        mongoose.disconnect();
    }
}
// Exports a new Connection Object
module.exports = new Connection();
