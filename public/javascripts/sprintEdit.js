$(document).ready(function () {
    var sprint;
    var tasks = [];
    var counter = 0;
    getSprint($("#sprintId").val());

    function getSprint(id) {
        $.getJSON("/sprint/rest/" + id, function (data) {
            var startDate = new Date(data.start);
            var startDateMonth = startDate.getMonth() + 1;
            if (startDateMonth.toString().length < 2) {
                startDateMonth = "0" + startDateMonth;
            }
            var startDateDay = startDate.getDate();
            if (startDateDay.toString().length < 2) {
                startDateDay = "0" + startDateDay;
            }
            var endDate = new Date(data.end);
            var endDateMonth = endDate.getMonth() + 1;
            if (endDateMonth.toString().length < 2) {
                endDateMonth = "0" + endDateMonth;
            }
            var endDateDay = endDate.getDate();
            if (endDateDay.toString().length < 2) {
                endDateDay = "0" + endDateDay;
            }
            $("#description").text(data.description);
            $("#author").text(data._creator);
            $("#begin").text("Sprint startet: " + startDateDay + "." + startDateMonth + "." + startDate.getFullYear());
            $("#end").text("Sprint endet: " + endDateDay + "." + endDateMonth + "." + endDate.getFullYear());
            sprint = data;
        }).done(function () {
            $("#sprintName").text(sprint.name);
            getTasksWithoutSprint();
        });
    }

    function getTasksWithoutSprint() {
        $.getJSON("/sprint/rest/taskWithoutSprint", function (data) {
            $.each(data, function (key, val) {
                if (val.priority == "Low") {
                    color = "green";
                }
                else if (val.priority == "Medium") {
                    color = "yellow";
                }
                else if (val.priority == "High") {
                    color = "red";
                }
                var text = '<div class="checkbox sprintCheckbox ' + color + '">' +
                    '<label class="sprintname">' +
                    '<input class="checkbox-check" type="checkbox" name="task" value="' + val._id + '">' +
                    '<p>' + val.task + '</p>' +
                    '</label>' +
                    '</div>';
                $("#taskContainer").append(text);
            });
            if (data.length == 0) {
                var text = "<div class='alert alert-warning'><p>Keine Offenen Tasks vorhanden</p></div>";
                $("#taskContainer").append(text);
                $("#save").prop("disabled", true);
            }
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
                dataType: 'json',
                data: JSON.stringify({"sprint_id": id, "tasks": tasks[counter]}),
                success: addTaskToSprintSuccess()
            }
        );
        //}

        //tasks.splice(0,tasks.length);
    }

    function addTaskToSprintSuccess() {
        counter++;
        if (counter != tasks.length) {
            setTimeout(addTasksToSprint, 200);
        }
        else {
            tasks.splice(0, tasks.length);
            window.location = "/sprint/" + $("#sprintId").val();
        }


    }

    $("#save").click(function () {
        $("input:checkbox[name=task]:checked").each(function () {
            tasks.push($(this).val());
        });
        if (tasks.length == 0) {
            $("#message").text("Kein Task ausgewählt!").addClass("alert alert-danger");
        }
        else {
            addTasksToSprint();
        }


    });

    $('body').on('click', '.checkbox', function () {
        var checkbox = $(this).find(".checkbox-check");
        if (checkbox.is(":checked")) {
            $(this).find(".checkbox-check").prop('checked', false);
            $(this).removeClass("green");
        }
        else {
            $(this).find(".checkbox-check").prop('checked', true);
            $(this).addClass("blue");
        }
    });

    /*
     $("#sprintName").click(function () {
     var title = $(this).text();
     $(this).html('');
     $('<input></input>')
     .attr({
     'type': 'textarea',
     'id': 'text_header',
     'value': title
     })
     .appendTo('#sprintName');
     $('#text_header').focus();
     });

     $(document).on('blur', '#text_header', function () {
     var title = $(this).val();
     $.ajax({
     type: 'post',
     url: '',
     success: function () {
     $('#text_header').text(title);
     }
     })
     });

     $("#description").click(function () {
     var textDescription = $(this).text();
     $(this).html('');
     $('<input></input>')
     .attr({
     'type': 'textarea',
     'id': 'text_description',
     'value': textDescription
     })
     .appendTo('#description');
     $('#text_description').focus();
     });

     $(document).on('blur', '#description', function () {
     var textDescription = $(this).val();
     $.ajax({
     type: "POST",
     url: "/backlog/...",
     contentType: "application/json; charset=utf-8",
     dataType: 'json',
     data: JSON.stringify({
     "sprint_id": id,
     "textDescription": description.val()
     }),
     success: function () {
     $('#text_description').text(textDescription);
     }
     })
     });
     */

});
