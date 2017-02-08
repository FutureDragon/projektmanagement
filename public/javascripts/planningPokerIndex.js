$(document).ready(function (event) {
    var dialogShow, dialogWait;
    var tasks = [];
    var openTaskId;
    var average;
    if(Cookies.get("Id") != null) {
        getNotRatedTasks();
    }
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

    dialogWait = $( "#waitDialog" ).dialog({
        autoOpen: false,
        height: "auto",
        width: "500",
        modal: true,
        buttons: {
        },
        close: function () {

        }
    });



    function updateTaskStoryPoints() {
        var storyPoints = $("#storyPoints").val();
        var userId = Cookies.get("Id");
        if ($.isNumeric(storyPoints)) {
            dialogWait.dialog( "open" );
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
                        200: function (response) {
                            dialogShow.dialog("close");
                            setTimeout(getNotRatedTasks, 200);
                            $('#pokermessages').text("Story Points wurden gespeichert").addClass("alert alert-success");
                            $('#pokermessages').animate({opacity: 1.0}, 2000).fadeOut('slow', function() {
                            });
                            setTimeout(isRatingComplete, 500);
                        }
                    }
                }
            );
        }
        else {
            $("#pokermessage").text("Bitte story points eingeben").addClass("alert alert-danger");
        }
    }

    function tick() {
        $.getJSON( "/planningPoker/rest/tick", function( data ) {

        });
    }

    function calculateAverageRating() {
        $.getJSON( "backlog/rest/"+openTaskId, function( data ) {
            var i = 0;
            var j = 0;
            var sum = 0;
            $.each(data.assigned_users,function () {
                if(data.assigned_users[i].rating != null) {
                    sum += data.assigned_users[i].rating;
                    j++;
                }
                i++;
            });
            average = sum / j;
        });
        setTimeout(setRating,2000);
    }

    function isRatingComplete() {
        $.ajax(
            {
                type: "POST",
                url: "/planningPoker/rest/ratingComplete",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify(
                    {
                        "taskId" : openTaskId
                    }),
                statusCode: {
                    200: function (response) {
                        setTimeout(calculateAverageRating, 2000);
                    },
                    900: function (responce) {

                    }
                }
            }
        );
    }


    function setRating() {
        $.ajax(
            {
                type: "POST",
                url: "/planningPoker/rest/setRating",
                contentType: "application/json; charset=utf-8",
                dataType : 'json',
                data: JSON.stringify(
                    {
                        "taskId" : openTaskId,
                        "storyPoints" : average
                    }),
                statusCode: {
                    200: function (response) {
                        dialogWait.dialog("close");
                    }
                }
            }
        );
    }

    function getNotRatedTasks() {
        $("#pokerTable").hide().find("tr:gt(0)").remove();
        $.getJSON( "/planningPoker/rest/" + Cookies.get("Id"), function( data ) {
            $.each(data, function (key ,val) {
                tasks[val._id] = data;
                var text = '<tr class="click tdBig" id="'+ val._id +'">' +
                    '<td class="cursor">'+ val.task+ '<br>Runde: ' + val.rating_round + '</td>' +
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
