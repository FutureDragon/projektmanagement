$(document).ready(function (event) {
    var dialog, form;
    var sprint = $("#name");
    var description = $("#description");
    var startd = $("#start");
    var endd = $("#end");
    var today = new Date();

    //$("#start").datepicker();
    //$("#end").datepicker();
    $("#start").datepicker({dateFormat: 'dd.mm.yy'}).val();
    $("#end").datepicker({dateFormat: 'dd.mm.yy'}).val();

    createIndex();

    // ____________________________________________________________________________

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 550,
        width: 450,
        modal: true,
        buttons: {
            "Sprint erstellen": createSprint,
            "Schließen": function () {
                dialog.dialog("close");
                formReset();
            }
        },
        close: function () {
            formReset();
        }
    });

    $("#newSprintBtn").button().on("click", function () {
        $("#messageShow").text("").removeClass("alert alert-danger fadeIn");
        dialog.dialog("open");
    });

    function createSprint() {
        if (sprint.val() != "" && startd.val() != "" && endd.val() != "" && startd.val() <= endd.val()) {
            var sdd = startDateFormat.substring(0, 2);
            var smm = startDateFormat.substring(3, 5);
            var syy = startDateFormat.substring(6, 10);
            var startDateChanged = smm + "/" + sdd + "/" + syy;
            var endDateFormat = endd.val();
            var edd = endDateFormat.substring(0, 2);
            var emm = endDateFormat.substring(3, 5);
            var eyy = endDateFormat.substring(6, 10);
            var endDateChanged = emm + "/" + edd + "/" + eyy;
            $.ajax(
                {
                    type: "POST",
                    url: "sprint/rest",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({
                        "name": sprint.val(),
                        "description": description.val(),
                        "start": startDateChanged,
                        "end": endDateChanged
                    }),
                    success: newSprintSuccess()
                }
            );
            dialog.dialog("close");
            formReset();
        }
        else {
            if (sprint.val() == "") {
                $("#messageShow").text("Bitte Sprint eingeben!").addClass("alert alert-danger fadeIn");
            }
            else {
                if (startd.val() == "") {
                    $("#messageShow").text("Bitte Startdatum eingeben!").addClass("alert alert-danger fadeIn");
                }
                else {
                    if (endd.val() == "") {
                        $("#messageShow").text("Bitte Enddatum eingeben!").addClass("alert alert-danger fadeIn");
                    }
                    else {
                        $("#messageShow").text("Enddatum kann nicht vor dem Startdatum liegen!").addClass("alert alert-danger fadeIn");
                    }
                }
            }
        }
    }

    function formReset() {
        sprint.val("");
        description.val("");
        startd.val("");
        endd.val("");
    }

    function newSprintSuccess() {
        location.reload();
        $("#newSprintMessage").text("Sprint erfolgreich angelegt").addClass("alert alert-success");
    }

    // ____________________________________________________________________________

    function createIndex() {
        $.getJSON("/sprint/rest", function (data) {
            $.each(data, function (key, val) {
                var color = "blue";
                var startDate = new Date(val.start);
                var startDateMonth = startDate.getMonth() + 1;
                var endDate = new Date(val.end);
                var endDateMonth = endDate.getMonth() + 1;
                var text = '<tr><td id="' + val._id + '" class="click tdBig ' + color + '">'
                    + '<b>' + val.name + '</b>' + '<br>' + 'Erstellt von: ' + val._creator
                    + '</b>' + '<br>' + startDate.getDate() + '.' + startDateMonth + '.' + startDate.getFullYear()
                    + ' - ' + endDate.getDate() + '.' + endDateMonth + '.' + endDate.getFullYear() + '</td></tr>';
                if (startDate > today) {
                    $("#sprintTable tr:last").after(text);
                }
                else {
                    endDate.setHours(23);
                    endDate.setMilliseconds(59);
                    endDate.setSeconds(59);
                    if (endDate >= today) {
                        $("#sprintTableStarted tr:last").after(text);
                    }
                    else {
                        $("#sprintTableClosed tr:last").after(text);
                    }
                }
            });
            $(".table").fadeIn(500);
        });
    }

    $(".table").on("click", "td", function () {
        window.location = "/sprint/" + $(this).attr("id");
    })

});
