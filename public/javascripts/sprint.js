$(document).ready(function (event) {
    var dialog, form;
    var sprint = $("#name");
    var description = $("#description");
    var startd = $("#start");
    var endd = $("#end");

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 500,
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
        $("#messageShow").text("").removeClass("alert alert-success fadeIn");
        dialog.dialog("open");
    });

    function createSprint() {
        if (sprint.val() != "" && startd.val() != "" && endd.val() != "") {
            $.ajax(
                {
                    type: "POST",
                    url: "sprint/rest",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify({
                        "name": sprint.val(),
                        "description": description.val(),
                        "start": startd.val(),
                        "end": endd.val()
                    }),
                    success: newSprintSuccess()
                }
            );
            dialog.dialog("close");
            formReset();
        }
        else {
            if (sprint.val() == "") {
                $("#messageShow").text("Bitte Sprint eingeben!").addClass("alert alert-success fadeIn");
            }
            else {
                if (startd.val() == "") {
                    $("#messageShow").text("Bitte Startdatum eingeben!").addClass("alert alert-success fadeIn");
                }
                else {
                    $("#messageShow").text("Bitte Enddatum eingeben!").addClass("alert alert-success fadeIn");
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

});
