$(document).ready(function () {
    var sprint, task;
    var dialog, form, dialogShow;
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
            $("#author").text(data._creator);
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

    dialogShow = $("#dialog-form-task").dialog({
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
                //$("#messageShow").text("").removeClass("alert alert-success fadeIn");
                //location.reload();
            }
        },
        close: function () {
            $("#messageShow").text("").removeClass("alert alert-success fadeIn");
            setTimeout(getTasks, 200);
            //location.reload();
        }
    });

    function updateTask(id, status) {
        $.ajax(
            {
                type: "POST",
                url: "/backlog/rest/update",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({"id": id, "status": status}),
                success: updatesuccess()
            }
        );
    }

    function updatesuccess() {
        $("#messageShow").text("Status erfolgreich geändert!").addClass("alert alert-success fadeIn");
    }

    $(".table").on("click", "td", function () {
        getTask($(this).attr("id"));
        dialogShow.dialog("open");
    });

    function getTask(id) {
        $.getJSON("/backlog/rest/" + id, function (data) {
            $("#taskShow").val(data.task);
            $("#descriptionShow").val(data.description);
            $("#statusShow").text(data.status);
            $("#createdShow").text("Von: " + data.author + " am " + data.created);
            $("#priorityShow").text(data.priority);
            $("#storyPointsShow").text(data.story_points);
            task = data;
        });
    }


});
