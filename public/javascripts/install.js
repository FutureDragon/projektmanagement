$(document).ready(function (event) {
    var tasksIds = [];
    var sprintIds = [];
    var milestonesIds = [];
    $("#message").hide();
    $("#installBtn").click(function () {
        $(".logrow").remove();
        $("#log").append("<p class='logrow'>Start to Drop Database</p>");
        $.ajax(
            {
                type: "POST",
                url: "/rest/install",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='green logrow'>Database dropped</p>");
                        $("#log").append("<p class='logrow'>Start to Insert Users</p>");
                        setTimeout(addAdmin,1000);
                    }
                }
            }
        );
    });

    function addAdmin() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addUsers",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        firstname : "Roberto",
                        lastname : "Blanco",
                        email : "admin@admin.de",
                        pw : "admin",
                        role : "admin"
                    }),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='logrow'>Insert Admin</p>");
                        setTimeout(addScrum,100);
                    }
                }
            }
        );
    }
    function addScrum() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addUsers",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        firstname : "Peter",
                        lastname : "Keks",
                        email : "scrum@admin.de",
                        pw : "scrum",
                        role : "scrummaster"
                    }),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='logrow'>Insert Scrummaster</p>");
                        setTimeout(addUser,100);
                    }
                }
            }
        );
    }

    function addUser() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addUsers",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        firstname : "Bob",
                        lastname : "Baumeister",
                        email : "user@admin.de",
                        pw : "user",
                        role : "employee"
                    }),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='logrow'>Insert User</p>");
                        setTimeout(addUser2,100);
                    }
                }
            }
        );
    }

    function addUser2() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addUsers",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        firstname : "Franz",
                        lastname : "Kranz",
                        email : "user2@admin.de",
                        pw : "user",
                        role : "employee"
                    }),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='logrow'>Insert User</p>");
                        $("#log").append("<p class='green logrow'>Finished to Insert User</p>");
                        $("#log").append("<p class='logrow'>Start to Insert Tasks</p>");
                        setTimeout(addTask,300);
                        setTimeout(addTask2,500);
                        setTimeout(addTask3,700);
                        setTimeout(addTask4,900);
                        setTimeout(addTask5,1100);
                        setTimeout(finsihedtasks,1300);
                    }
                }
            }
        );
    }
    function addTask() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addTasks",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "TaskName",
                        description : "Task Beschreibung",
                        priority : "Low",
                        points : "10",
                        creator : "user@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='logrow'>Insert Task</p>");
                    }
                }
            }
        );
    }

    function finsihedtasks() {
        $("#log").append("<p class='green logrow'>Finished to Insert Tasks</p>");
        $("#log").append("<p class='logrow'>Start to Insert Sprints</p>");
        setTimeout(getTasks, 200);
        setTimeout(addSprint,500);
    }
    function addTask2() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addTasks",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "TaskName2",
                        description : "Task Beschreibung2",
                        priority : "Medium",
                        points : "15",
                        creator : "user@admin.de"
                    }),
                statusCode: {
                    200: function (response) {

                    }
                }
            }
        );
    }
    function addTask3() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addTasks",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "TaskName3",
                        description : "Task Beschreibung3",
                        priority : "High",
                        points : "2",
                        creator : "user@admin.de"
                    }),
                statusCode: {
                    200: function (response) {

                    }
                }
            }
        );
    }
    function addTask4() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addTasks",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "TaskName4",
                        description : "Task Beschreibung4",
                        priority : "Medium",
                        points : "15",
                        creator : "user@admin.de"
                    }),
                statusCode: {
                    200: function (response) {

                    }
                }
            }
        );
    }
    function addTask5() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addTasks",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "TaskName5",
                        description : "Task Beschreibung5",
                        priority : "Medium",
                        points : "15",
                        creator : "user@admin.de"
                    }),
                statusCode: {
                    200: function (response) {

                    }
                }
            }
        );
    }
    function getTasks() {
        $.getJSON( "/backlog/rest", function( data ) {
            $.each(data, function (key ,val) {
              tasksIds.push(val._id);
            });

        });
    }

    function addSprint() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addSprints",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "SprintName",
                        description : "Sprint Beschreibung",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        setTimeout(addSprint2, 200);
                    }
                }
            }
        );
    }
    function addSprint2() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addSprints",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "SprintName2",
                        description : "Sprint Beschreibung2",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        setTimeout(addSprint3, 200);
                    }
                }
            }
        );
    }
    function addSprint3() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addSprints",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "SprintName3",
                        description : "Sprint Beschreibung3",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        setTimeout(addSprint4, 200);
                    }
                }
            }
        );
    }
    function addSprint4() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addSprints",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "SprintName4",
                        description : "Sprint Beschreibung4",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        setTimeout(addSprint5, 200);
                    }
                }
            }
        );
    }
    function addSprint5() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addSprints",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "SprintName5",
                        description : "Sprint Beschreibung5",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='green logrow'>Finished to Insert Sprints</p>");

                        $("#log").append("<p class='logrow'>Start to Add Tasks to Sprints</p>");
                        setTimeout(getSprints,200);
                        setTimeout(addTaskToSprint,400);
                        //
                    }
                }
            }
        );
    }

    function getSprints() {
        $.getJSON( "/sprint/rest", function( data ) {
            $.each(data, function (key ,val) {
                sprintIds.push(val._id);
            });
        });
    }

    function addTaskToSprint() {
        $.ajax(
            {
                type: "POST",
                url: "/backlog/rest/addSprint",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({"sprint_id": sprintIds[0], "tasks": tasksIds[0]}),
                statusCode: {
                    200: function (response) {
                        setTimeout(addTaskToSprint2,200);
                    }
                }
            }
        );
    }
    function addTaskToSprint2() {
        $.ajax(
            {
                type: "POST",
                url: "/backlog/rest/addSprint",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({"sprint_id": sprintIds[0], "tasks": tasksIds[1]}),
                statusCode: {
                    200: function (response) {
                        setTimeout(addTaskToSprint3,200);
                    }
                }
            }
        );
    }
    function addTaskToSprint3() {
        $.ajax(
            {
                type: "POST",
                url: "/backlog/rest/addSprint",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify({"sprint_id": sprintIds[0], "tasks": tasksIds[2]}),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='logrow'>Start to Insert Milestones</p>");
                        $("#log").append("<p class='green logrow'>Finished to Add Tasks to Sprints</p>");
                        setTimeout(addMilestone, 200);
                    }
                }
            }
        );
    }
    function addMilestone() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addMilestones",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "MilestoneName",
                        description : "Milestone Beschreibung",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        setTimeout(addMilestone2, 200);
                    }
                }
            }
        );
    }
    function addMilestone2() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addMilestones",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "MilestoneName2",
                        description : "Milestone Beschreibung2",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        setTimeout(addMilestone3, 200);
                    }
                }
            }
        );
    }
    function addMilestone3() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addMilestones",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "MilestoneName3",
                        description : "Milestone Beschreibung3",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        setTimeout(addMilestone4, 200);
                    }
                }
            }
        );
    }
    function addMilestone4() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addMilestones",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {
                        name : "MilestoneName4",
                        description : "Milestone Beschreibung4",
                        start : "02/15/2017",
                        end : "02/16/2017",
                        creator : "scrum@admin.de"
                    }),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='green logrow'>Finished to Insert Milestones</p>");
                        $("#log").append("<p class='logrow'>Start to make some other things</p>");
                        setTimeout(getMilestones,200);
                        installFinished();
                    }
                }
            }
        );
    }
    function getMilestones() {
        $.getJSON( "/milestone/rest", function( data ) {
            $.each(data, function (key ,val) {
                milestonesIds.push(val._id);
            });
        });
    }

    function installFinished() {
        $("#log").fadeOut(2000);
        $("#message").fadeIn(3000).addClass("alert alert-success").text("Installation erfolgreich!");
    }
});
