$(document).ready(function (event) {
    var countSprints = 0;
    var countTasks = 0;
    var countMilestones = 0;
    $('#container').show();
    $.getJSON( "/sprint/rest/count", function( data ) {
        countSprints = data.count;
    }).done(function () {
        $("#countSprints").text(countSprints).hide().fadeIn(3000);
        $.getJSON( "/backlog/rest/count", function( data ) {
            countTasks = data.count;
        }).done(function () {
            $("#countTasks").text(countTasks).hide().fadeIn(3000);
            $.getJSON( "/milestone/rest/count", function( data ) {
                countMilestones = data.count;
            }).done(function () {
                $("#countMilestones").text(countMilestones).hide().fadeIn(3000);
            });
        });
    });



    $("#backlog").hide();
    $("#sprint").hide();
    $("#milestone").hide();
    $("#backlog").show("slide", "", 700);

    $("#sprint").show("slide", "", 700);

    $("#milestone").show("slide", "", 700);
});
