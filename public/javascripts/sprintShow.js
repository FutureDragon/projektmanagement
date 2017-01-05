$(document).ready(function () {
    var sprint;
    getSprint($("#sprintId").val());

    function getSprint(id) {
        $.getJSON( "/sprint/rest/"+id, function( data ) {
            $("#description").text(data.description);
            $("#author").text(data._creator);
            $("#begin").text("Sprint startet: " + data.start);
            $("#end").text("Sprint endet: " +data.end);
            sprint = data;
        }).done(function () {
            $("#sprintName").text(sprint.name);
            getTasks();
        });
    }

    function getTasks() {
        //$(".table").hide().find("tr:gt(1)").remove();
        $.getJSON( "/backlog/rest/getTasksToSprint/"+$("#sprintId").val(), function( data ) {
            $.each(data, function (key ,val) {
                var color;
                if(val.priority == "Low") {
                    color = "green";
                }
                else if(val.priority == "Medium") {
                    color = "yellow";
                }
                else if(val.priority == "High") {
                    color = "red";
                }
                var text = '<tr><td id="'+ val._id +'" class="click tdBig ' +color + '">'+ val.task + '</td></tr>';
                $("#done tr:last").after(text);
                /*if(val.status == "Open") {
                    $("#opentable tr:last").after(text);
                }
                else if(val.status == "In Progress") {
                    $("#progress tr:last").after(text);
                }
                else if(val.status == "Done") {
                    $("#done tr:last").after(text);
                }*/
            });
            //$(".table").fadeIn(500);
        });
    }
    



});
