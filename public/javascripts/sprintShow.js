$(document).ready(function () {
    
    getSprint($("#taskId").text());
    
    
    function getSprint(id) {
        $.getJSON( "/sprint/rest/"+id, function( data ) {
            $("#description").text(data.description);
            task = data;
        }).done(function () {
            getTasksWithoutSprint();
        });
    }
    
    function getTasksWithoutSprint() {
        $.getJSON( "/sprint/rest/taskWithoutSprint", function( data ) {
            $.each(data, function (key ,val) {
                var text = '<tr><td id="'+ val._id +'">'+ val.task + '</td></tr>';
                $("#taskTable tr:last").after(text);
            });
        });
    }
});
