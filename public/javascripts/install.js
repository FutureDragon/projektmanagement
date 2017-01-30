$(document).ready(function (event) {
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
                url: "/rest/install/addAdmin",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addScrum",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addUser",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addUser2",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='logrow'>Insert User</p>");
                        $("#log").append("<p class='green logrow'>Finished to Insert User</p>");
                        $("#log").append("<p class='logrow'>Start to Insert Tasks</p>");
                        setTimeout(addTask,100);
                        setTimeout(addTask2,300);
                        setTimeout(addTask3,500);
                        setTimeout(addTask4,700);
                        setTimeout(addTask5,900);
                        setTimeout(finsihedtasks,1100);
                    }
                }
            }
        );
    }
    function addTask() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addTask",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
        setTimeout(addSprint,200);
    }
    function addTask2() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addTask2",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addTask3",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addTask4",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addTask5",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
                statusCode: {
                    200: function (response) {

                    }
                }
            }
        );
    }

    function addSprint() {
        $.ajax(
            {
                type: "POST",
                url: "/rest/install/addSprint",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addSprint2",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addSprint3",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addSprint4",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addSprint5",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='green logrow'>Finished to Insert Sprints</p>");
                        $("#log").append("<p class='logrow'>Start to Insert Milestones</p>");
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
                url: "/rest/install/addMilestone",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addMilestone2",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addMilestone3",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
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
                url: "/rest/install/addMilestone4",
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(
                    {}),
                statusCode: {
                    200: function (response) {
                        $("#log").append("<p class='green logrow'>Finished to Insert Milestones</p>");
                    }
                }
            }
        );
    }
});
