var mongoose = require('mongoose');

function Connection(){
    this.connect = function(){
        return mongoose.connect("mongodb://localhost/test", {server: {reconnectTries: Number.MAX_VALUE }});

    };

    this.disconnect = function(){
        return mongoose.disconnect();
    };
}
// Exports a new Connection Object
module.exports = new Connection();
