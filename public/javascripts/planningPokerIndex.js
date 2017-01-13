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
        }
    });


    function updateTaskStoryPoints() {
        var storyPoints = $("#storyPoints").val();
        var userId = Cookies.get("Id");
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
                success: function (response) {

                }
            }
        );
    }

    function getNotRatedTasks() {
        $.getJSON( "/planningPoker/rest", function( data ) {
            $.each(data, function (key ,val) {
                tasks[val._id] = data;
                var text = '<tr class="click" id="'+ val._id +'">' +
                    '<td>'+ val.task+ '</td>' +
                    '</tr>';
                $("#pokerTable tr:last").after(text);
            });
            if(data.length == 0) {
            }
        });
    }

    $(".table").on("click", "tr", function() {
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
