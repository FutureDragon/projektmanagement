$(document).ready(function (event) {
    $('#newTaskForm').submit(function (event) {
        var task = $("#task").val();
       if(task == "") {
           $("#task").parent().addClass("form-group has-error has-feedback");
           alert("Task eingeben!");
       }
       else{
           event.defaultPrevented(event);
       }
       return false;
    });
});