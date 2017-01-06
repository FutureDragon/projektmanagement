$(document).ready(function (event) {
    var dialog, form, dialogShow, dialogConfirm;
    var task;
    task = $( "#task");
    var description = $("#description");
    var openTaskId;
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
        task = $( "#task");
        if(task.val() != "" && $("#storyPoints").val() != "") {
            var priority = $( "#priority option:selected" ).text();
            var storyPoint = $( "#storyPoints" ).val();
            $.ajax(
                {
                    type: "POST",
                    url: "backlog/rest",
                    contentType: "application/json; charset=utf-8",
                    dataType : 'json',
                    data: JSON.stringify(
                        {
                            "task" : task.val(),
                            "description" : description.val(),
                            "priority" : priority,
                            "story_points" : storyPoint
                        }),
                    success: newTasksuccess()
                }
            );
            dialog.dialog("close");
            formReset();

        }
        else {
            $("#message").text("Task und Story Points eingeben").addClass("alert alert-danger");
        }
    }

    function formReset() {
        task.val("");
        description.val("");
        $( "#storyPoints" ).val("");
    }

    function newTasksuccess() {
        $("#newTaskMessage").text("Task erfolgreich angelegt").removeClass("alert-warning").addClass("alert alert-success").fadeIn(200);
        if($('#newTaskMessage').length>0){
            $('#newTaskMessage').animate({opacity: 1.0}, 2000).fadeOut('slow', function() {
            });
        }

        setTimeout(getTasks, 200);
    }
// ____________________________________________________________________________
    var wWidth = $(window).width();
    var dWidth = wWidth * 0.4;
    var wHeight = $(window).height();
    var dHeight = wHeight * 0.4;

    dialogShow = $( "#dialog-form-task" ).dialog({
        autoOpen: false,
        height: "auto",
        width: dWidth,
        modal: dHeight,
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
            "Bearbeiten":{
                id : "change",
                text : "Bearbeiten",
                click: function () {
              }
            },
            "Löschen" : function () {
                dialogConfirm.dialog( "open" );
            },
            "Fenster Schließen": function () {
                dialogShow.dialog("close");
            }
        },
        close: function () {
            $("#messageShow").text("").removeClass("alert alert-success fadeIn");
            $("#taskShow").prop("disabled", true);
            $("#descriptionShow").prop("disabled", true);
            $("#change").text("Bearbeiten");
            //getTasks();
            //setTimeout(getTasks, 200);
        }
    });

    dialogConfirm = $( "#dialog-delete-confirm" ).dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Löschen": function() {
                deleteTask();
                $( this ).dialog( "close" );
            },
            "Abbrechen": function() {
                $( this ).dialog( "close" );
            }
        }
    });

    function getTasks() {
        $(".table").hide().find("tr:gt(1)").remove();
        $.getJSON( "backlog/rest", function( data ) {
            $.each(data, function (key ,val) {
                var color;
                if(val.priority == "Low") {
                    color = "green";
                }
                else if(val.priority == "Medium") {
                    color = "yellow";
                }
                else if(val.priority == "High") {
                    color = "red";
                }
                var text = '<tr><td id="'+ val._id +'" class="click tdBig ' +color + '">'+ val.task + '</td></tr>';
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
            if(data.length == 0) {
                $("#newTaskMessage").text("Es sind noch keine Tasks angelegt").addClass("alert alert-warning");
            }
            $(".table").fadeIn(500);
        });
    }

    function getTask(id) {
        openTaskId = id;
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
                data: JSON.stringify(
                    {
                        "id" : id,
                        "status" : status
                    }),
                success: updatesuccess()
            }
        );
    }

    function updatesuccess() {
        $("#messageShow").text("Status erfolgreich geändert!").addClass("alert alert-success fadeIn");
        setTimeout(getTasks, 200);
    }

    $(".table").on("click", "td", function() {
        getTask($( this ).attr("id"));
        dialogShow.dialog( "open" );
    });

    $('body').on('click', '#change', function () {
        if($(this).text() == "Bearbeiten") {
            $("#taskShow").prop("disabled", false);
            $("#descriptionShow").prop("disabled", false);
            var actualPriority = $("#priorityShow").text();
            if(actualPriority == "Low") {
                var priorityOption =
                    '<select name="priority" id="priorityEdit">' +
                    '<option selected="selected">Low</option>' +
                    '<option>Medium</option>' +
                    '<option>High</option>' +
                    '</select> ';
            }
            else if(actualPriority == "Medium") {
                var priorityOption =
                    '<select name="priority" id="priorityEdit">' +
                    '<option>Low</option>' +
                    '<option selected="selected">Medium</option>' +
                    '<option>High</option>' +
                    '</select> ';
            }
            else if(actualPriority == "High") {
                var priorityOption =
                    '<select name="priority" id="priorityEdit">' +
                    '<option>Low</option>' +
                    '<option>Medium</option>' +
                    '<option selected="selected">High</option>' +
                    '</select> ';
            }
            $("#priorityShow").text("").append(priorityOption);
            var storyPointsInput = "<input class='form-control transparent' type='number' id='storyPointsEdit' value='" + $("#storyPointsShow").text() + "'>";
            $("#storyPointsShow").text("").append(storyPointsInput);
            $(this).text("Speichern");
        }
        else {
            var taskText = $("#taskShow").val();
            var descriptionText = $("#descriptionShow").val();
            var priority = $( "#priorityEdit option:selected" ).text();
            var storyPoints = $( "#storyPointsEdit" ).val();
            updateTaskDetails(taskText,descriptionText,priority, storyPoints);
            //$("#messageShow").text("Task erfolgreich geändert").addClass("alert alert-success fadeIn");
            $("#taskShow").prop("disabled", true);
            $("#descriptionShow").prop("disabled", true);
            $("#priorityShow").text(priority);
            $(this).text("Bearbeiten");
            $("#storyPointsShow").text(storyPoints);
        }
    });

    function updateTaskDetails(task, description, priority, storyPoints) {
        $.ajax(
            {
                type: "POST",
                url: "backlog/rest/updateTask",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify(
                    {
                        "id" : openTaskId,
                        "task": task,
                        "description" : description,
                        "priority" : priority,
                        "story_points" : storyPoints
                    }),
                success: taskupdatesuccess()
            }
        );
    }
    function taskupdatesuccess() {
        $("#messageShow").text("Task erfolgreich geändert").addClass("alert alert-success fadeIn");
        setTimeout(getTasks, 200);
    }

    function deleteTask() {
        $.ajax(
            {
                type: "POST",
                url: "/backlog/rest/delete",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify(
                    {
                        "id" : openTaskId,
                    }),
                success: deleteTaskSuccess()
            }
        );
    }
    function deleteTaskSuccess() {
        dialogShow.dialog("close");
        $("#newTaskMessage").text("Task erfolgreich gelöscht").removeClass("alert-warning").addClass("alert alert-success").fadeIn(200);
        $('#newTaskMessage').animate({opacity: 1.0}, 2000).fadeOut('slow', function() {
        });
        setTimeout(getTasks, 200);
    }

});
