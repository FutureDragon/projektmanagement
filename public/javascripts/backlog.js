$(document).ready(function (event) {
    $(".table").hide();
    $.getJSON( "backlog/get", function( data ) {
        $.each(data, function (key ,val) {
            var text = '<tr><td><details class="details">'+ val.description +'<summary>'+ val.task +'</summary></details></td></tr>';
            if(val.status == "Open") {
                $("#opentable tr:last").after(text);
            }
            else if(val.status == "In Progress") {
                $("#progress tr:last").after(text);
            }
            else if(val.status == "Code Review") {
                $("#review tr:last").after(text);
            }
            else if(val.status == "Done") {
                $("#done tr:last").after(text);
            }
        });
        $(".table").fadeIn(500);
    });

    if($('#newTaskAction').val() == 'success') {
        $('#newTaskMessage').text("Task erfolgreich angelegt").addClass('alert alert-success').hide().fadeIn(700);
        $('#newTaskAction').val('none');
    }

    $('#newTaskForm').submit(function (event) {
        var task = $("#task").val();
       if(task == "") {
           $("#task").parent().addClass("form-group has-error has-feedback");
           $('#newTaskMessage').text("Task eingeben").addClass('alert alert-danger').hide().fadeIn(700);
       }
       else{
           event.defaultPrevented(event);
       }
       return false;
    });
});


db.test.update(
    { "task" : "df" },
    {
        $set: { "status": "In Progress" }
    }
)
