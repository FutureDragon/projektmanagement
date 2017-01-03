$(document).ready(function (event) {
    var dialog, form;
    task = $( "#task");
    description = $("#description");

    getTasks();

// ____________________________________________________________________________
    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Task erstellen": createTask,
            "Schließen": function () {
                dialog.dialog("close");
                formReset();
            }
        },
        close: function () {
            formReset();
        }
    });
    $( "#newTaskBtn" ).button().on( "click", function() {
        dialog.dialog( "open" );

    });
    function createTask() {
        $.ajax(
            {
                type: "POST",
                url: "backlog/rest",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify({"task" : task.val(), "description" : description.val()}),
                success: newTaskSuccese()
            }
        );
        dialog.dialog("close");
        formReset();
    }

    function formReset() {
        task.val("");
        description.val("");
    }
// ____________________________________________________________________________

    function newTaskSuccese() {
        $("#newTaskMessage").text("Task erfolgreich angelegt").addClass("alert alert-success");
        getTasks();
    }

    function getTasks() {
        $(".table").hide().find("tr:gt(1)").remove();
        $.getJSON( "backlog/get", function( data ) {
            $.each(data, function (key ,val) {
                var text = '<tr><td><details class="details">' +'<summary>'+ val.task +'</summary><p>' + val.description + '</p></details></td></tr>';
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
    }




});
