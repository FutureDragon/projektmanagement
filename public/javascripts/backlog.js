$(document).ready(function (event) {
    if($('#newTaskAction').val() == 'success') {
        $('#newTaskMessage').text("Task erfolgreich angelegt").addClass('alert alert-success');
        $('#newTaskAction').val('none');
    }

    $('#newTaskForm').submit(function (event) {
        var task = $("#task").val();
       if(task == "") {
           $("#task").parent().addClass("form-group has-error has-feedback");
           $('#newTaskMessage').text("Task eingeben").addClass('alert alert-danger');
       }
       else{
           event.defaultPrevented(event);
       }
       return false;
    });
});