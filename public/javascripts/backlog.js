$(document).ready(function (event) {
    var dialog, form, dialogShow;
    var task;
    task = $( "#task");
    var description = $("#description");
    getTasks();

// ____________________________________________________________________________
    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 500,
        width: 450,
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
        if(task.val() != "" && $("#storyPoints").val() != "") {
            var priority = $( "#priority option:selected" ).text();
            var storyPoint = $( "#storyPoints" ).val();
            $.ajax(
                {
                    type: "POST",
                    url: "backlog/rest",
                    contentType: "application/json; charset=utf-8",
                    dataType : 'json',
                    data: JSON.stringify({"task" : task.val(), "description" : description.val(), "priority" : priority, "story_points" : storyPoint}),
                    success: newTasksuccess()
                }
            );
            dialog.dialog("close");
            formReset();

        }
        else {
            alert("Task und Story Points eingeben");
        }
    }

    function formReset() {
        task.val("");
        description.val("");
    }

    function newTasksuccess() {
        location.reload();
        $("#newTaskMessage").text("Task erfolgreich angelegt").addClass("alert alert-success");
        getTasks();
    }
// ____________________________________________________________________________


    dialogShow = $( "#dialog-form-task" ).dialog({
        autoOpen: false,
        height: 500,
        width: 450,
        modal: true,
        buttons: {
            "Offen": function () {
                updateTask(task._id, "Open");
                $("#statusShow").text("Open");
            },
            "In Arbeit": function () {
                updateTask(task._id, "In Progress");
                $("#statusShow").text("In Progress");
            },
            "Review": function () {
                updateTask(task._id, "Code Review");
                $("#statusShow").text("Code Review");
            },
            "Fertig": function () {
                updateTask(task._id, "Done");
                $("#statusShow").text("Done");
            },
            "Fenster Schließen": function () {
                dialogShow.dialog("close");
                $("#messageShow").text("").removeClass("alert alert-success fadeIn");
                location.reload();
            }
        },
        close: function () {
            $("#messageShow").text("").removeClass("alert alert-success fadeIn");
            location.reload();
        }
    });

    function getTasks() {
        $(".table").hide().find("tr:gt(1)").remove();
        $.getJSON( "backlog/rest", function( data ) {
            $.each(data, function (key ,val) {
                var text = '<tr><td id="'+ val._id +'" class="click">'+ val.task + '</td></tr>';
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

    function getTask(id) {
        $.getJSON( "backlog/rest/"+id, function( data ) {
            $("#taskShow").val(data.task);
            $("#descriptionShow").val(data.description);
            $("#statusShow").text(data.status);
            $("#createdShow").text("Von: " + data.author + " am " +data.created);
            $("#priorityShow").text(data.priority);
            $("#storyPointsShow").text(data.story_points);
            task = data;
        });
    }

    function updateTask(id, status) {
        $.ajax(
            {
                type: "POST",
                url: "backlog/rest/update",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify({"id" : id, "status" : status}),
                success: updatesuccess()
            }
        );
    }

    function updatesuccess() {
        $("#messageShow").text("Status erfolgreich geändert!").addClass("alert alert-success fadeIn");
    }

    $(".table").on("click", "td", function() {
        getTask($( this ).attr("id"));
        dialogShow.dialog( "open" );
    });




});
