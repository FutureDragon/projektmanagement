$(document).ready(function (event) {
    var countSprints = 0;
    var countTasks = 0;
    var countMilestones = 0;
    var countTasksInProgress = 0;
    var countTasksInOpen = 0;
    var countTasksInDone = 0;
    var countTasksInReview = 0;
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
                $.getJSON( "/backlog/rest/countInProgress", function( data ) {
                    countTasksInProgress = data.count;
                }).done(function () {
                    $("#countTasksInProgress").text(countTasksInProgress).hide().fadeIn(3000);
                    $.getJSON( "/backlog/rest/countInOpen", function( data ) {
                        countTasksInOpen = data.count;
                    }).done(function () {
                        $("#countTasksInOpen").text(countTasksInOpen).hide().fadeIn(3000);
                        $.getJSON( "/backlog/rest/countInReview", function( data ) {
                            countTasksInReview = data.count;
                        }).done(function () {
                            $("#countTasksInReview").text(countTasksInReview).hide().fadeIn(3000);
                            $.getJSON( "/backlog/rest/countInDone", function( data ) {
                                countTasksInDone = data.count;
                            }).done(function () {
                                $("#countTasksInDone").text(countTasksInDone).hide().fadeIn(3000);
                            });
                        });
                    });
                });
            });
        });
    });



    $("#backlog").hide();
    $("#sprint").hide();
    $("#milestone").hide();
    if(Cookies.get("Login") == "true") {
        $("#backlog").show("slide", "", 700);

        $("#sprint").show("slide", "", 700);

        $("#milestone").show("slide", "", 700);
    }

});
