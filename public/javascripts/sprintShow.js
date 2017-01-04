$(document).ready(function () {
    var sprint;
    var tasks = [];
    getSprint($("#sprintId").val());
    
    
    function getSprint(id) {
        $.getJSON( "/sprint/rest/"+id, function( data ) {
            $("#description").text(data.description);
            sprint = data;
        }).done(function () {
            $("#sprintName").text(sprint.name);
            getTasksWithoutSprint();
        });
    }
    
    function getTasksWithoutSprint() {
        $.getJSON( "/sprint/rest/taskWithoutSprint", function( data ) {
            $.each(data, function (key ,val) {
                var text = '<div class="checkbox"><label><input type="checkbox" name="task" value="' + val._id +'">' + val.task + '</label></div>';
                $("#taskContainer").append(text);
            });
        });
    }
    
    function addTasksToSprint() {
        
    }

    $("#save").click(function () {
        $("input:checkbox[name=task]:checked").each(function(){
            tasks.push($(this).val());
        });
    });
});
