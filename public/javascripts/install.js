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
});
