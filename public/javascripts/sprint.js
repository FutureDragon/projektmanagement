$(document).ready(function (event) {
    var dialog, form;
    var sprint = $("#name");
    var description = $("#description");
    var startd = $("#start");
    var endd = $("#end");

    $("#start").datepicker();
    $("#end").datepicker();

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
                $("#messageShow").text("Bitte Sprint eingeben!").addClass("alert alert-danger fadeIn");
            }
            else {
                if (startd.val() == "") {
                    $("#messageShow").text("Bitte Startdatum eingeben!").addClass("alert alert-danger fadeIn");
                }
                else {
                    $("#messageShow").text("Bitte Enddatum eingeben!").addClass("alert alert-danger fadeIn");
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
                var text = '<tr><td id="' + val._id + '" class="click">' + val.name + '</td></tr>';
                $("#sprintTable tr:last").after(text);
            });
            $(".table").fadeIn(300);
        });
    }

    $(".table").on("click", "td", function () {
        window.location = "/sprint/" + $(this).attr("id");
    })

});
