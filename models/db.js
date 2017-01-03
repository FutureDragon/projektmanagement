var mongoose = require('mongoose');
function db() {
    this.connectionString = "mongodb://localhost/test"

    this.connect = function () {
        mongoose.createConnection(this.connectionString);
    };

    this.disconnect = function () {
        mongoose.disconnect();
    };
}
module.exports = new db();
