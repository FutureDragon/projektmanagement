$(document).ready(function () {
    var sprint, task;
    var dialog, form, dialogShow, dialogConfirm, dialogEnd;
    var openTaskId;
    var endDate = $("#endDate");
    var today = new Date();
    var endDateMonth = today.getMonth() + 1;
    if (endDateMonth.toString().length < 2) {
        endDateMonth = "0" + endDateMonth;
    }
    var endDateDay = today.getDate();
    if (endDateDay.toString().length < 2) {
        endDateDay = "0" + endDateDay;
    }
    var endDateString = "";
    endDateString = endDateDay + "." + endDateMonth + "." + today.getFullYear();

    $("#endDate").datepicker({
        dateFormat: 'dd.mm.yy',
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember" ],
        firstDay: 1
    }).val(endDateString);

    if (Cookies.get("Role") != "scrummaster" && Cookies.get("Role") != "admin") {
        $("#scrumboardHead").hide();
        $("#edit").hide();
    }

    getSprint($("#sprintId").val());

    function getSprint(id) {
        $.getJSON("/sprint/rest/" + id, function (data) {
            var startDate = new Date(data.start);
            var startDateMonth = startDate.getMonth() + 1;
            if (startDateMonth.toString().length < 2) {
                startDateMonth = "0" + startDateMonth;
            }
            var startDateDay = startDate.getDate();
            if (startDateDay.toString().length < 2) {
                startDateDay = "0" + startDateDay;
            }
            var endDate = new Date(data.end);
            var endDateMonth = endDate.getMonth() + 1;
            if (endDateMonth.toString().length < 2) {
                endDateMonth = "0" + endDateMonth;
            }
            var endDateDay = endDate.getDate();
            if (endDateDay.toString().length < 2) {
                endDateDay = "0" + endDateDay;
            }
            $("#description").text(data.description);
            $("#author").text("Erstellt von: " + data._creator);
            $("#begin").text("Sprint startet: " + startDateDay + "." + startDateMonth + "." + startDate.getFullYear());
            $("#end").text("Sprint endet: " + endDateDay + "." + endDateMonth + "." + endDate.getFullYear());
            $("#edit").attr("href", $("#sprintId").val() + "/edit");
            sprint = data;
        }).done(function () {
            $("#sprintName").text(sprint.name);
            getTasks();
        });
    }

    function getTasks() {
        $(".table").hide().find("tr:gt(1)").remove();
        $.getJSON("/backlog/rest/getTasksToSprint/" + $("#sprintId").val(), function (data) {
            $.each(data, function (key, val) {
                var color;
                if (val.priority == "Low") {
                    color = "green";
                }
                else if (val.priority == "Medium") {
                    color = "yellow";
                }
                else if (val.priority == "High") {
                    color = "red";
                }
                var text = '<tr><td id="' + val._id + '" class="click tdBig ' + color + '">' + val.task + '</td></tr>';
                if (val.status == "Open") {
                    $("#opentable tr:last").after(text);
                }
                else if (val.status == "In Progress") {
                    $("#progress tr:last").after(text);
                }
                else if (val.status == "Code Review") {
                    $("#review tr:last").after(text);
                }
                else if (val.status == "Done") {
                    $("#done tr:last").after(text);
                }
            });
            if (data.length == 0) {
                $("#message").text("Der Sprint enthält noch keine Tasks").addClass("alert alert-warning");
            }
            $(".table").fadeIn(500);
        });
    }

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
                $("#endDate").val(endDateString);
                dialogEnd.dialog("open");
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
        }
    });

    function updateTask(id, status) {
        $.ajax(
            {
                type: "POST",
                url: "/backlog/rest/update",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        "id": id,
                        "status": status,
                        "end": undefined
                    }),
                success: updatesuccess()
            }
        );
    }

    dialogEnd = $("#dialog-form-end").dialog({
        autoOpen: false,
        height: 300,
        width: 500,
        modal: true,
        buttons: {
            "OK": function() {
                updateTaskEnd(task._id, "Done");
            },
            "Abbrechen": function () {
                dialogEnd.dialog("close");
            }
        }
    });

    function updateTaskEnd(id, status) {
        var endDateFormat = endDate.val();
        var endDateChanged = endDateFormat.substring(3, 5) + "/" + endDateFormat.substring(0, 2)
            + "/" + endDateFormat.substring(6, 10);
        $.ajax(
            {
                type: "POST",
                url: "/backlog/rest/updateEnd",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        "id": id,
                        "status": status,
                        "end": endDateChanged
                    }),
                success: updatesuccess()
            }
        );
        $("#statusShow").text("Done" + " am " + endDate.val());
        dialogEnd.dialog("close");
    }

    function updatesuccess() {
        $("#messageShow").text("Status erfolgreich geändert!").addClass("alert alert-success fadeIn");
        setTimeout(getTasks, 200);
    }

    $(".table").on("click", "td", function () {
        getTask($(this).attr("id"));
        dialogShow.dialog("open");
    });

    function getTask(id) {
        openTaskId = id;
        $.getJSON("/backlog/rest/" + id, function (data) {
            var endDate2 = new Date(data.end);
            var endDate2Month = endDate2.getMonth() + 1;
            if (endDate2Month.toString().length < 2) {
                endDate2Month = "0" + endDate2Month;
            }
            var endDate2Day = endDate2.getDate();
            if (endDate2Day.toString().length < 2) {
                endDate2Day = "0" + endDate2Day;
            }
            var createdDate = new Date(data.created);
            var createdDateMonth = createdDate.getMonth() + 1;
            if (createdDateMonth.toString().length < 2) {
                createdDateMonth = "0" + createdDateMonth;
            }
            var createdDateDay = createdDate.getDate();
            if (createdDateDay.toString().length < 2) {
                createdDateDay = "0" + createdDateDay;
            }
            var createdDateHours = createdDate.getHours();
            if (createdDateHours.toString().length < 2) {
                createdDateHours = "0" + createdDateHours;
            }
            var createdDateMinutes = createdDate.getMinutes();
            if (createdDateMinutes.toString().length < 2) {
                createdDateMinutes = "0" + createdDateMinutes;
            }
            var createdDateSeconds = createdDate.getSeconds();
            if (createdDateSeconds.toString().length < 2) {
                createdDateSeconds = "0" + createdDateSeconds;
            }
            var createdString = createdDateDay + "." + createdDateMonth + "." + createdDate.getFullYear()
                + "  " + createdDateHours + ":" + createdDateMinutes + ":" + createdDateSeconds;
            $("#taskShow").val(data.task);
            $("#descriptionShow").val(data.description);
            if (data.status == "Done") {
                $("#statusShow").text(data.status + " am " + endDate2Day + "."
                    + endDate2Month + "." + endDate2.getFullYear());
            }
            else {
                $("#statusShow").text(data.status);
            }
            $("#createdShow").text("Von " + data._creator + " am " + createdString);
            $("#priorityShow").text(data.priority);
            $("#storyPointsShow").text(data.story_points);
            task = data;
        });
    }

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
            var storyPointsInput = "<input disabled='true' type='number' id='storyPointsEdit' value='" + $("#storyPointsShow").text() + "'>";
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
                url: "/backlog/rest/updateTask",
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

});
