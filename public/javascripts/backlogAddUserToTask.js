$(document).ready(function (event) {
    var taskId = $("#taskId").val();
    var users= [];
    var counter = 0;
    getTask(taskId);

    function getTask(id) {
        openTaskId = id;
        $.getJSON("/backlog/rest/" + id, function (data) {
            $("#taskName").text(data.task);
            $("#taskDescription").text(data.description);

            task = data;
        }).done(function () {
            setTimeout(getEmployees, 200);
        });
    }

    function getEmployees() {
        $.getJSON("/users/rest/getEmployees", function (data) {
            $.each(data, function (key, val) {
                var text = '<div class="checkbox sprintCheckbox addUserToTask">' +
                    '<label class="sprintname">' +
                    '<input class="checkbox-check" type="checkbox" name="user" value="' + val._id + '">' +
                    '<p>' + val.email + '</p>' +
                    '</label>' +
                    '</div>';
                $("#userContainer").append(text);
            });
            if (data.length == 0) {
                var text = "<div class='alert alert-warning'><p>Keine User vorhanden</p></div>";
                $("#userContainer").append(text);
                $("#save").prop("disabled", true);
            }
        }).done(function () {

        });
    }

    $('body').on('click', '.checkbox', function () {
        var checkbox = $(this).find(".checkbox-check");
        if (checkbox.is(":checked")) {
            $(this).find(".checkbox-check").prop('checked', false);
            $(this).removeClass("blue").addClass("addUserToTask");
        }
        else {
            $(this).find(".checkbox-check").prop('checked', true);
            $(this).addClass("blue").removeClass("addUserToTask");
        }
    });

    $("#save").click(function () {
        $("input:checkbox[name=user]:checked").each(function () {
            users.push($(this).val());
        });
        if (users.length == 0) {
            $("#message").text("Kein User ausgewählt!").addClass("alert alert-danger");
        }
        else {
            addUserToTask();
        }
    });

    function addUserToTask() {
        if (users.length != 0) {
            $.ajax(
                {
                    type: "POST",
                    url: "/backlog/rest/addUserToTask",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify(
                        {
                            "userId": users[counter],
                            "taskId": taskId
                        }),
                    success: addUserToTaskSuccess()
                }
            );
        }
        else {

        }
    }

    function addUsersToTask() {
        if (users.length != 0) {
            $.ajax(
                {
                    type: "POST",
                    url: "/backlog/rest/addUsersToTask",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    data: JSON.stringify(
                        {
                            "userId": users,
                            "taskId": taskId
                        }),
                    success: function () {

                    }
                }
            );
        }
        else {

        }
        users.splice(0, users.length);
    }

    function addUserToTaskSuccess() {
        counter++;
        if (counter != users.length) {
            setTimeout(addUserToTask, 200);
        }
        else {
            //setTimeout(removeTasksFromSprint, 200);
            users.splice(0, users.length);
            //window.location = "/sprint/" + $("#sprintId").val();
        }
    }
});
