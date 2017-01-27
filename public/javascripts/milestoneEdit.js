$(document).ready(function () {
    var dialog, form, dialogDelete, dialogChange;
    var milestoneChange = $("#milestoneChange");
    var descriptionChange = $("#descriptionChange");
    var startDateChange = $("#startDateChange");
    var endDateChange = $("#endDateChange");
    var milestone;

    $("#startDateChange").datepicker({
        dateFormat: 'dd.mm.yy',
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember" ],
        firstDay: 1
    }).val();
    $("#endDateChange").datepicker({
        dateFormat: 'dd.mm.yy',
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember" ],
        firstDay: 1
    }).val();

    getMilestone($("#milestoneId").val());

    //____________________________________________________________________________

    function getMilestone(id) {
        $.getJSON("/milestone/rest/" + id, function (data) {
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
            $("#creator").text("Erstellt von: " + data._creator);
            $("#begin").text("Sprint startet: " + startDateString);
            $("#end").text("Sprint endet: " + endDateString);
            $("#milestoneChange").text(data.name);
            $("#descriptionChange").text(data.description);
            $("#startDateChange").val(startDateString);
            $("#endDateChange").val(endDateString);
            $("#milestoneName").text(data.name);
            milestone = data;
        }).done(function () {
            getSprintsWithoutMilestone();
        });
    }

    function getSprintsWithoutMilestone() {
        $.getJSON("/milestone/rest/sprintWithoutMilestone", function (data) {
            $.each(data, function (key, val) {
                color = "blue";
                var text = '<div class="checkbox sprintCheckbox ' + color + '">' +
                    '<label class="sprintname">' +
                    '<input class="checkbox-check" type="checkbox" name="sprint" value="' + val._id + '">' +
                    '<p>' + val.sprint + '</p>' +
                    '</label>' +
                    '</div>';
                $("#sprintContainer").append(text);
            });
            if (data.length == 0) {
                var text = "<div class='alert alert-warning'><p>Keine offenen Sprints vorhanden</p></div>";
                $("#sprintContainer").append(text);
            }
        }).done(function () {
            getSprints();
        });
    }

    function getSprints() {
        $.getJSON("/milestone/rest/getTasksToSprint/" + $("#sprintId").val(), function (data) {
            $.each(data, function (key, val) {
                color = "blue";
                var text = '<div class="checkbox sprintCheckbox ' + color + '">' +
                    '<label class="sprintname">' +
                    '<input class="checkbox-check" type="checkbox" name="sprint2" value="' + val._id + '">' +
                    '<p>' + val.sprint + '</p>' +
                    '</label>' +
                    '</div>';
                $("#sprintContainer2").append(text);
            });
            if (data.length == 0) {
                var text = "<div class='alert alert-warning'><p>Der Meilenstein besitzt noch keine Sprints</p></div>";
                $("#sprintContainer2").append(text);
            }
        });
    }

    //____________________________________________________________________________

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

    function addTasksToSprint() {
        var id = $("#milestoneId").val();
        if (tasks.length != 0) {
            $.ajax(
                {
                    type: "POST",
                    url: "/milestone/rest/addSprint",
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

    $("#changeMilestoneBtn").button().on("click", function () {
        $("#messageShow").text("").removeClass("alert alert-danger fadeIn");
        dialog.dialog("open");
    });

    dialog = $("#dialog-form-sprint").dialog({
        autoOpen: false,
        heigt: 500,
        width: 450,
        modal: true,
        buttons: {
            "Meilenstein löschen": function () {
                dialogDelete.dialog("open");
            },
            "Änderungen übernehmen": function () {
                if (milestoneChange.val() != "" && startDateChange.val() != "" && endDateChange.val() != ""
                    && startDateChange.val() <= endDateChange.val()) {
                    dialogChange.dialog("open");
                }
                else {
                    if (milestoneChange.val() == "") {
                        $("#messageShow").text("Bitte Namen eingeben!").addClass("alert alert-danger fadeIn");
                    }
                    else {
                        if (startDateChange.val() == "") {
                            $("#messageShow").text("Bitte Startdatum eingeben!").addClass("alert alert-danger fadeIn");
                        }
                        else {
                            if (endDateChange.val() == "") {
                                $("#messageShow").text("Bitte Enddatum eingeben!").addClass("alert alert-danger fadeIn");
                            }
                            else {
                                $("#messageShow").text("Enddatum kann nicht vor dem Startdatum liegen!").addClass("alert alert-danger fadeIn");
                            }
                        }
                    }
                }
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
            "Meilenstein löschen": deleteMilestone,
            "Abbrechen": function () {
                dialogDelete.dialog("close");
            }
        }
    });

    function deleteMilestone() {
        $.ajax(
            {
                type: "POST",
                url: "/milestone/rest/delete",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({"id": $("#sprintId").val()})
            }
        );
        setTimeout(function(){window.location = "/milestone";}, 500);
    }

    dialogChange = $("#dialog-form-change").dialog({
        autoOpen: false,
        height: 180,
        width: 420,
        modal: true,
        buttons: {
            "OK": changeMilestone,
            "Abbrechen": function () {
                dialogChange.dialog("close");
            }
        }
    });

    function changeMilestone() {
        if (milestoneChange.val() != "" && startDateChange.val() != "" && endDateChange.val() != ""
            && startDateChange.val() <= endDateChange.val()) {
            var startDateFormat = startDateChange.val();
            var startDateChanged = startDateFormat.substring(3, 5) + "/" + startDateFormat.substring(0, 2)
                + "/" + startDateFormat.substring(6, 10);
            var endDateFormat = endDateChange.val();
            var endDateChanged = endDateFormat.substring(3, 5) + "/" + endDateFormat.substring(0, 2)
                + "/" + endDateFormat.substring(6, 10);
            $.ajax(
                {
                    type: "POST",
                    url: "/milestone/rest/update",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({
                        "id": $("#sprintId").val(),
                        "name": milestoneChange.val(),
                        "description": descriptionChange.val(),
                        "start": startDateChanged,
                        "end": endDateChanged
                    }),
                    success: changeMilestoneSuccess()
                }
            );
            dialog.dialog("close");
            dialogChange.dialog("close");
        }
    }

    function changeMilestoneSuccess() {
        $("#sprintMessage").removeClass("alert-success").hide();
        $("#sprintMessage").text("Meilenstein erfolgreich geändert. Seite wird aktualisiert...").addClass("alert alert-success").fadeIn();
        $("#sprintMessage").animate({opacity: 1.0}, 2000).fadeOut('slow', function () {
        });
        setTimeout(function(){window.location = "/milestone/" + $("#sprintId").val() + "/edit";}, 500);
    }

});
