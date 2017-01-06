/**
 * Created by Florian on 06.01.2017.
 */
var mongoose = require('mongoose');
var TaskStatusSchema = require("../schema/taskStatus_schema");
var db = require("./db");

function taskStatus(){

    // Create a new insertion if a tasks changes his status
    this.newTaskStatus = function (id, status, res) {
        db.connect();
        var taskStatusModel = new TaskStatusSchema({
            _task: id,
            status: status,
        });
        taskStatusModel.save(function (err) {
           if (err) throw err;
        });
        res.sendStatus(200);
        db.disconnect();
    }
}

//Exports the module
module.exports= new taskStatus();