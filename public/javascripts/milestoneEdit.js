$(document).ready(function () {
    var dialog, form, dialogDelete, dialogChange;
    var milestoneChange = $("#milestoneChange");
    var descriptionChange = $("#descriptionChange");
    var startDateChange = $("#startDateChange");
    var endDateChange = $("#endDateChange");
    var milestone;
    var sprints = [];
    var sprints2 = [];
    var counter = 0;
    var counter2 = 0;

    $("#startDateChange").datepicker({
        dateFormat: 'dd.mm.yy',
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember"],
        firstDay: 1
    }).val();
    $("#endDateChange").datepicker({
        dateFormat: 'dd.mm.yy',
        dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
        monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni",
            "Juli", "August", "September", "Oktober", "November", "Dezember"],
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
            $("#begin").text("Meilenstein startet: " + startDateString);
            $("#end").text("Meilenstein endet: " + endDateString);
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
                    '<p>' + val.name + '</p>' +
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
        $.getJSON("/sprint/rest/getSprintsToMilestone/" + $("#milestoneId").val(), function (data) {
            $.each(data, function (key, val) {
                color = "blue";
                var text = '<div class="checkbox sprintCheckbox ' + color + '">' +
                    '<label class="sprintname">' +
                    '<input class="checkbox-check" type="checkbox" name="sprint2" value="' + val._id + '">' +
                    '<p>' + val.name + '</p>' +
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
        $("input:checkbox[name=sprint]:checked").each(function () {
            sprints.push($(this).val());
        });
        $("input:checkbox[name=sprint2]:checked").each(function () {
            sprints2.push($(this).val());
        });
        if (sprints.length == 0 && sprints2.length == 0) {
            $("#message").text("Kein Sprint ausgewählt!").addClass("alert alert-danger");
        }
        else {
            addSprintsToMilestone();
        }
    });

    function addSprintsToMilestone() {
        var id = $("#milestoneId").val();
        if (sprints.length != 0) {
            $.ajax(
                {
                    type: "POST",
                    url: "/sprint/rest/addMilestone",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({"milestone_id": id, "sprints": sprints[counter]}),
                    success: addSprintsToMilestoneSuccess()
                }
            );
        }
        else {
            removeSprintsFromMilestone();
        }
    }

    function addSprintsToMilestoneSuccess() {
        counter++;
        if (counter != sprints.length) {
            setTimeout(function () {
                addSprintsToMilestone();
            }, 200);
        }
        else {
            setTimeout(function () {
                removeSprintsFromMilestone();
            }, 200);
            sprints.splice(0, sprints.length);
        }
    }

    function removeSprintsFromMilestone() {
        var id = $("#milestoneId").val();
        if (sprints2.length != 0) {
            $.ajax(
                {
                    type: "POST",
                    url: "/sprint/rest/removeMilestone",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({"milestone_id": id, "sprints": sprints2[counter2]}),
                    success: removeSprintsFromMilestoneSuccess()
                }
            );
        }
        else {
            window.location = "/milestone/" + $("#milestoneId").val();
        }
    }

    function removeSprintsFromMilestoneSuccess() {
        counter2++;
        if (counter2 != sprints2.length) {
            setTimeout(function () {
                removeSprintsFromMilestone();
            }, 200);
        }
        else {
            sprints2.splice(0, sprints2.length);
            window.location = "/milestone/" + $("#milestoneId").val();
        }
    }

    $('body').on('click', '.checkbox', function () {
        var checkbox = $(this).find(".checkbox-check");
        if (checkbox.is(":checked")) {
            $(this).find(".checkbox-check").prop('checked', false);
            $(this).removeClass("green");
            $(this).addClass("blue");
        }
        else {
            $(this).find(".checkbox-check").prop('checked', true);
            $(this).removeClass("blue");
            $(this).addClass("green");
        }
    });

//____________________________________________________________________________
// Ändern und Löschen des Meilensteins

    $("#changeMilestoneBtn").button().on("click", function () {
        $("#messageShow").text("").removeClass("alert alert-danger fadeIn");
        dialog.dialog("open");
    });

    dialog = $("#dialog-form-milestone").dialog({
        autoOpen: false,
        height: 570,
        width: 450,
        modal: true,
        buttons: {
            /* Meilenstein löschen
            "Meilenstein löschen": function () {
                dialogDelete.dialog("open");
            },*/
            "Änderungen übernehmen": function () {
                var startDateFormat = startDateChange.val();
                var startDateChanged = startDateFormat.substring(3, 5) + "/" + startDateFormat.substring(0, 2)
                    + "/" + startDateFormat.substring(6, 10);
                var endDateFormat = endDateChange.val();
                var endDateChanged = endDateFormat.substring(3, 5) + "/" + endDateFormat.substring(0, 2)
                    + "/" + endDateFormat.substring(6, 10);
                var startDate = new Date(startDateChanged);
                var endDate = new Date(endDateChanged);
                if (milestoneChange.val() != "" && startDateChange.val() != "" && endDateChange.val() != ""
                    && startDate <= endDate) {
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

    /* Meilenstein löschen
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
                data: JSON.stringify({"id": $("#milestoneId").val()})
            }
        );
        setTimeout(function () {
            window.location = "/milestone";
        }, 500);
    }
    */

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
        var startDateFormat = startDateChange.val();
        var startDateChanged = startDateFormat.substring(3, 5) + "/" + startDateFormat.substring(0, 2)
            + "/" + startDateFormat.substring(6, 10);
        var endDateFormat = endDateChange.val();
        var endDateChanged = endDateFormat.substring(3, 5) + "/" + endDateFormat.substring(0, 2)
            + "/" + endDateFormat.substring(6, 10);
        var startDate = new Date(startDateChanged);
        var endDate = new Date(endDateChanged);
        if (milestoneChange.val() != "" && startDateChange.val() != "" && endDateChange.val() != ""
            && startDate <= endDate) {
            var id = $("#milestoneId").val();
            $.ajax(
                {
                    type: "POST",
                    url: "/milestone/rest/update",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({
                        "id": id,
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
        $("#milestoneMessage").removeClass("alert-success").hide();
        $("#milestoneMessage").text("Meilenstein erfolgreich geändert. Seite wird aktualisiert...").addClass("alert alert-success").fadeIn();
        $("#milestoneMessage").animate({opacity: 1.0}, 2000).fadeOut('slow', function () {
        });
        setTimeout(function () {
            window.location = "/milestone/" + $("#milestoneId").val();
        }, 500);
    }

});
