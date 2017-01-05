$(document).ready(function () {
    var sprint, task;
    var dialog, form, dialogShow;
    getSprint($("#sprintId").val());

    function getSprint(id) {
        $.getJSON( "/sprint/rest/"+id, function( data ) {
            $("#description").text(data.description);
            $("#author").text(data._creator);
            $("#begin").text("Sprint startet: " + data.start);
            $("#end").text("Sprint endet: " +data.end);
            $("#edit").attr("href", $("#sprintId").val()+"/edit");
            sprint = data;
        }).done(function () {
            $("#sprintName").text(sprint.name);
            getTasks();
        });
    }

    function getTasks() {
        //$(".table").hide().find("tr:gt(1)").remove();
        $.getJSON( "/backlog/rest/getTasksToSprint/"+$("#sprintId").val(), function( data ) {
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
            //$(".table").fadeIn(500);
        });
    }
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

    function updateTask(id, status) {
        $.ajax(
            {
                type: "POST",
                url: "/backlog/rest/update",
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

    function getTask(id) {
        $.getJSON( "/backlog/rest/"+id, function( data ) {
            $("#taskShow").val(data.task);
            $("#descriptionShow").val(data.description);
            $("#statusShow").text(data.status);
            $("#createdShow").text("Von: " + data.author + " am " +data.created);
            $("#priorityShow").text(data.priority);
            $("#storyPointsShow").text(data.story_points);
            task = data;
        });
    }



});
