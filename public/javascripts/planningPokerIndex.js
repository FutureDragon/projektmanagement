$(document).ready(function (event) {
    var dialogShow;
    var tasks = [];
    var openTaskId;
    getNotRatedTasks();
    dialogShow = $( "#dialog-form-task" ).dialog({
        autoOpen: false,
        height: "auto",
        width: "500",
        modal: true,
        buttons: {
            "Speichern": function () {
                updateTaskStoryPoints()
            },
            "Fenster Schließen": function () {
                dialogShow.dialog("close");
            }
        },
        close: function () {
            $("#storyPoints").val("")
            $("#taskShow").val("");
            $("#descriptionShow").val("");
            $("#pokermessage").text("").removeClass("alert alert-danger");
        }
    });


    function updateTaskStoryPoints() {
        var storyPoints = $("#storyPoints").val();
        var userId = Cookies.get("Id");
        if ($.isNumeric(storyPoints)) {
            $.ajax(
                {
                    type: "POST",
                    url: "/planningPoker/rest/update",
                    contentType: "application/json; charset=utf-8",
                    dataType : 'json',
                    data: JSON.stringify(
                        {
                            "userId" : userId,
                            "taskId" : openTaskId,
                            "storyPoints" : storyPoints
                        }),
                    statusCode: {
                        900: function (response) {
                            alert("asdasd");
                        },
                        200: function (response) {

                        }
                    },
                    success: function () {
                        getNotRatedTasks()
                    }
                }
            );
        }
        else {
            $("#pokermessage").text("Bitte story points eingeben").addClass("alert alert-danger");
        }
    }

    function getNotRatedTasks() {
        $("#pokerTable").hide().find("tr:gt(1)").remove();
        $.getJSON( "/planningPoker/rest/" + Cookies.get("Id"), function( data ) {
            $.each(data, function (key ,val) {
                tasks[val._id] = data;
                var text = '<tr class="click" id="'+ val._id +'">' +
                    '<td>'+ val.task+ '</td>' +
                    '</tr>';
                $("#pokerTable tr:last").after(text);
            });
            if(data.length == 0) {
                $("#pokermessages").text("Keine offenen Tasks zum Bewerten vorhanden").addClass("alert alert-warning")
            }
        });
        $("#pokerTable").fadeIn(500);
    }

    $(".table").on("click", "tr.click", function() {
        dialogShow.dialog( "open" );
        loadDataInForm($( this ).attr("id"));
    });

    function loadDataInForm(id) {
        openTaskId = id;
        $.getJSON( "backlog/rest/"+id, function( data ) {
            $("#taskShow").val(data.task);
            $("#descriptionShow").val(data.description);
            task = data;
        });
    }

});
