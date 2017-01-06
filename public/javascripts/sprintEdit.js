$(document).ready(function () {
    var dialog, form, dialogShow;
    var sprintChange = $("#sprintChange");
    var descriptionChange = $("#descriptionChange");
    var sprint;
    var tasks = [];
    var tasks2 = [];
    var counter = 0;
    var counter2 = 0;
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
            sprint = data;
        }).done(function () {
            $("#sprintName").text(sprint.name);
            $("#sprintChange").text(sprint.name);
            $("#descriptionChange").text(sprint.description);
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
        if(tasks.length != 0){
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
        if (tasks2.length != 0 ) {
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
    //Dialoge zum Ändern des Sprintnamens und Beschreibung

    dialog = $("#dialog-form-sprint").dialog({
        autoOpen: false,
        height: 300,
        width: 450,
        modal: true,
        buttons: {
            "Sprint umbennen": renameSprint,
            "Schließen": function() {
                dialog.dialog("close");
                sprintChange = "";
            }
        }
    });

    function renameSprint() {
        if(sprintChange.val != "") {
            $ajax(
                {
                    type: "POST",
                    url: "sprint/rest",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({
                        "name": sprintChange.val()
                    }),
                }
            )
        }
    }

    dialogShow = $("#dialog-form-description").dialog({
        autoOpen: false,
        height: 350,
        width: 450,
        modal: true,
        buttons: {
            "Beschreibung ändern": changeDescription,
            "Schließen": function () {
                dialogShow.dialog("close");
                descriptionChange = "";
            }
        }
    });

    function changeDescription() {
        if(descriptionChange.val != "") {
            $ajax(
                {
                    type: "POST",
                    url: "sprint/rest",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({
                        "description": descriptionChange.val()
                    }),
                }
            )
        }
    }

});
