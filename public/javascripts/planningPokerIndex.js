$(document).ready(function (event) {
    var dialogShow;
    var tasks = [];
    getNotRatedTasks();


    dialogShow = $( "#dialog-form-task" ).dialog({
        autoOpen: false,
        height: "450",
        width: "500",
        modal: true,
        buttons: {
            "Speichern": function () {

            },
            "Fenster Schließen": function () {
                dialogShow.dialog("close");
            }
        },
        close: function () {
            $("#messageShow").text("").removeClass("alert alert-success fadeIn");
            $("#taskShow").prop("disabled", true);
            $("#descriptionShow").prop("disabled", true);
            $("#change").text("Bearbeiten");
            //getTasks();
            //setTimeout(getTasks, 200);
        }
    });


    function updateTaskStoryPoints() {

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
        /*
        Get Json 
         */
    }
});
