$(document).ready(function () {
    var dialog, form, dialogDelete, dialogChange;
    var sprintChange = $("#sprintChange");
    var descriptionChange = $("#descriptionChange");
    var startDateChange = $("#startDateChange");
    var endDateChange = $("#endDateChange");
    var sprint;
    var tasks = [];
    var tasks2 = [];
    var counter = 0;
    var counter2 = 0;

    $("#startDateChange").datepicker({dateFormat: 'dd.mm.yy'}).val();
    $("#endDateChange").datepicker({dateFormat: 'dd.mm.yy'}).val();

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
            var startDateString = "";
            startDateString = startDateDay + "." + startDateMonth + "." + startDate.getFullYear();
            var endDateString = "";
            endDateString = endDateDay + "." + endDateMonth + "." + endDate.getFullYear();
            $("#description").text(data.description);
            $("#author").text("Erstellt von: " + data._creator);
            $("#begin").text("Sprint startet: " + startDateString);
            $("#end").text("Sprint endet: " + endDateString);
            $("#sprintChange").text(data.name);
            $("#descriptionChange").text(data.description);
            $("#startDateChange").val(startDateString);
            $("#endDateChange").val(endDateString);
            sprint = data;
        }).done(function () {
            $("#sprintName").text(sprint.name);
            getTasksWithoutSprint();
        });
    }

    function getTasksWithoutSprint() {
        $.getJSON("/sprint/rest/taskWithoutSprint", function (data) {
            $.each(data, function (key, val) {
                if (val.priority == "Low") {
                    color = "green";
                }
                else if (val.priority == "Medium") {
                    color = "yellow";
                }
                else if (val.priority == "High") {
                    color = "red";
                }
                var text = '<div class="checkbox sprintCheckbox ' + color + '">' +
                    '<label class="sprintname">' +
                    '<input class="checkbox-check" type="checkbox" name="task" value="' + val._id + '">' +
                    '<p>' + val.task + '</p>' +
                    '</label>' +
                    '</div>';
                $("#taskContainer").append(text);
            });
            if (data.length == 0) {
                var text = "<div class='alert alert-warning'><p>Keine Offenen Tasks vorhanden</p></div>";
                $("#taskContainer").append(text);
                //$("#save").prop("disabled", true);
            }
        }).done(function () {
            getTasks();
        });
    }

    function getTasks() {
        $.getJSON("/backlog/rest/getTasksToSprint/" + $("#sprintId").val(), function (data) {
            $.each(data, function (key, val) {
                if (val.priority == "Low") {
                    color = "green";
                }
                else if (val.priority == "Medium") {
                    color = "yellow";
                }
                else if (val.priority == "High") {
                    color = "red";
                }
                var text = '<div class="checkbox sprintCheckbox ' + color + '">' +
                    '<label class="sprintname">' +
                    '<input class="checkbox-check" type="checkbox" name="task2" value="' + val._id + '">' +
                    '<p>' + val.task + '</p>' +
                    '</label>' +
                    '</div>';
                $("#taskContainer2").append(text);
            });
            if (data.length == 0) {
                var text = "<div class='alert alert-warning'><p>Der Sprint besitzt noch keine Tasks</p></div>";
                $("#taskContainer2").append(text);
                //$("#save") .prop("disabled", true);
            }
        });
    }

    function addTasksToSprint() {
        var id = $("#sprintId").val();
        if (tasks.length != 0) {
            $.ajax(
                {
                    type: "POST",
                    url: "/backlog/rest/addSprint",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({"sprint_id": id, "tasks": tasks[counter]}),
                    success: addTaskToSprintSuccess()
                }
            );
        }
        else {
            removeTasksFromSprint();
        }
    }

    function removeTasksFromSprint() {
        var id = $("#sprintId").val();
        if (tasks2.length != 0) {
            $.ajax(
                {
                    type: "POST",
                    url: "/backlog/rest/removeSprint",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({"sprint_id": id, "tasks": tasks2[counter2]}),
                    success: removeTaskFromSprintSuccess()
                }
            );
        }
        else {
            window.location = "/sprint/" + $("#sprintId").val();
        }

    }

    function removeTaskFromSprintSuccess() {
        counter2++;
        if (counter2 != tasks2.length) {
            setTimeout(removeTasksFromSprint, 200);
        }
        else {
            tasks2.splice(0, tasks2.length);
            window.location = "/sprint/" + $("#sprintId").val();
        }
    }

    function addTaskToSprintSuccess() {
        counter++;
        if (counter != tasks.length) {
            setTimeout(addTasksToSprint, 200);
        }
        else {
            setTimeout(removeTasksFromSprint, 200);
            tasks.splice(0, tasks.length);
            //window.location = "/sprint/" + $("#sprintId").val();
        }
    }

    $("#save").click(function () {
        $("input:checkbox[name=task]:checked").each(function () {
            tasks.push($(this).val());
        });
        $("input:checkbox[name=task2]:checked").each(function () {
            tasks2.push($(this).val());
        });
        if (tasks.length == 0 && tasks2.length == 0) {
            $("#message").text("Kein Task ausgewählt!").addClass("alert alert-danger");
        }
        else {
            addTasksToSprint();
        }


    });

    $('body').on('click', '.checkbox', function () {
        var checkbox = $(this).find(".checkbox-check");
        if (checkbox.is(":checked")) {
            $(this).find(".checkbox-check").prop('checked', false);
            $(this).removeClass("blue");
        }
        else {
            $(this).find(".checkbox-check").prop('checked', true);
            $(this).addClass("blue");
        }
    });

    //____________________________________________________________________________
    // Ändern und Löschen des Sprints

    $("#changeSprintBtn").button().on("click", function () {
        dialog.dialog("open");
    });

    dialog = $("#dialog-form-sprint").dialog({
        autoOpen: false,
        heigt: 500,
        width: 450,
        modal: true,
        buttons: {
            "Sprint löschen": function () {
                dialogDelete.dialog("open");
            },
            "Änderungen übernehmen": function () {
                dialogChange.dialog("open");
            },
            "Schließen": function () {
                dialog.dialog("close");
            }
        }
    });

    dialogDelete = $("#dialog-form-delete").dialog({
        autoOpen: false,
        height: 180,
        width: 560,
        modal: true,
        buttons: {
            "Sprint MIT Tasks löschen": deleteSprintAndTasks,
            "Sprint OHNE Tasks löschen": deleteSprint,
            "Abbrechen": function () {
                dialogDelete.dialog("close");
            }
        }
    });

    function deleteSprintAndTasks() {
        $.ajax(
            {
                type: "POST",
                url: "/sprint/rest/deleteWithTask",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({"id": $("#sprintId").val()})
            }
        );
        setTimeout(function(){window.location = "/sprint";}, 600);
    }

    function deleteSprint() {
        $.ajax(
            {
                type: "POST",
                url: "/sprint/rest/delete",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({"id": $("#sprintId").val()})
            }
        );
        setTimeout(function(){window.location = "/sprint";}, 600);
    }

    dialogChange = $("#dialog-form-change").dialog({
        autoOpen: false,
        height: 180,
        width: 420,
        modal: true,
        buttons: {
            "OK": changeSprint,
            "Abbrechen": function () {
                dialogChange.dialog("close");
            }
        }
    });

    function changeSprint() {
        if (sprintChange.val != "" && startDateChange.val() != "" && endDateChange.val() != "") {
            var startDateFormat = startDateChange.val();
            var startDateChanged = startDateFormat.substring(3, 5) + "/" + startDateFormat.substring(0, 2)
                + "/" + startDateFormat.substring(6, 10);
            var endDateFormat = endDateChange.val();
            var endDateChanged = endDateFormat.substring(3, 5) + "/" + endDateFormat.substring(0, 2)
                + "/" + endDateFormat.substring(6, 10);
            $.ajax(
                {
                    type: "POST",
                    url: "/sprint/rest/update",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({
                        "id": $("#sprintId").val(),
                        "name": sprintChange.val(),
                        "description": descriptionChange.val(),
                        "start": startDateChanged,
                        "end": endDateChanged
                    }),
                    success: changeSprintSuccess()
                }
            );
            dialog.dialog("close");
            dialogChange.dialog("close");
        }
    }

    function changeSprintSuccess() {
        $("#sprintMessage").removeClass("alert-success").hide();
        $("#sprintMessage").text("Sprint erfolgreich geändert").addClass("alert alert-success").fadeIn();
        $("#sprintMessage").animate({opacity: 1.0}, 2000).fadeOut('slow', function () {
        });
        setTimeout(function(){window.location = "/sprint/" + $("#sprintId").val() + "/edit";}, 600);
    }


});
