$(document).ready(function () {
    var sprint;
    var tasks = [];
    var counter = 0;
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
            getTasksWithoutSprint();
        });
    }
    
    function getTasksWithoutSprint() {
        $.getJSON( "/sprint/rest/taskWithoutSprint", function( data ) {
            $.each(data, function (key ,val) {
                var text = '<div class="checkbox sprintCheckbox">' +
                    '<label class="sprintname">' +
                    '<input class="checkbox-check" type="checkbox" name="task" value="' + val._id +'">' +
                    '<p>' + val.task + '</p>' +
                    '</label>' +
                    '</div>';
                $("#taskContainer").append(text);
            });
        });
    }
    
    function addTasksToSprint() {
        var id = $("#sprintId").val();
        //for(var i = 0, len = tasks.length; i < len; i++) {
            $.ajax(
                {
                    type: "POST",
                    url: "/backlog/rest/addSprint",
                    contentType: "application/json; charset=utf-8",
                    dataType : 'json',
                    data: JSON.stringify({"sprint_id" : id, "tasks" : tasks[counter]}),
                    success: addTaskToSprintSuccess()
                }
            );
        //}

        //tasks.splice(0,tasks.length);
    }

    function addTaskToSprintSuccess() {
        counter++;
        if(counter != tasks.length) {
            setTimeout(addTasksToSprint, 200);
        }
        else {
            tasks.splice(0,tasks.length);
            window.location = "/sprint/" + $("#sprintId").val();
        }


    }

    $("#save").click(function () {
        $("input:checkbox[name=task]:checked").each(function(){
            tasks.push($(this).val());
        });
        if(tasks.length == 0) {
            alert("Keien Tasks ausgewählt!");
        }
        else{
            addTasksToSprint();
        }


    });

    $('body').on('click', '.checkbox', function () {
        var checkbox = $(this).find(".checkbox-check");
        if(checkbox.is(":checked")) {
            $(this).find(".checkbox-check").prop('checked', false);
            $(this).removeClass("green");
        }
        else
        {
            $(this).find(".checkbox-check").prop('checked', true);
            $(this).addClass("green");
        }
    });
});
