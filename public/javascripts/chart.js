$(function () {
    var sprint;
    var dataPoints = [];
    var countTasks = 0;
    var startDate;
    var endDate;
    var startDay;
    var startMonth;
    var startYear;
    var endDay;
    var endMonth;
    var endYear;
    var endDateAxis;
    var endDateAxisDay;
    var endDateAxisMonth;
    var endDateAxisYear;

    getSprint($("#sprintId").val());

    // ____________________________________________________________________________

    function getSprint(id) {
        $.getJSON("/sprint/rest/" + id, function (data) {
            sprint = data;
        }).done(function () {
            startDate = new Date(sprint.start);
            endDate = new Date(sprint.end);
            startDay = startDate.getDate();
            startMonth = startDate.getMonth();
            startYear = startDate.getFullYear();
            endDay = endDate.getDate();
            endMonth = endDate.getMonth();
            endYear = endDate.getFullYear();
            endDateAxisDay = endDay;
            endDateAxisMonth = endMonth;
            endDateAxisYear = endYear;
            setTimeout(function () {
                getTasks();
            }, 20);
        })
    }

    function getTasks() {
        // TODO: getJSON umstellen
        /*$.getJSON("/backlog/rest/getTasksToSprint/" + $("#sprintId").val(), function (data) {
         $.each(data, function (key, val) {
         tasks.push(val.enddate);
         });
         });
         */
        $.getJSON("/sprint/rest", function (data) {
            $.each(data, function (key, val) {
                countTasks++;
            });
        }).done(function () {
            dataPoints.push({x: new Date(startYear, startMonth, startDay), y: countTasks});
            setTimeout(function () {
                $.getJSON("/sprint/rest", function (data) {
                    $.each(data, function (key, val) {
                        dataPoints.push({x: new Date(val.start), y: countTasks});
                    });
                }).done(function () {
                    dataPoints.sort(function (a, b) {
                        return a.x - b.x
                    });
                    for (var i = 0; i < dataPoints.length; i++) {
                        dataPoints[i].y = countTasks - i;
                    }
                    //alert(JSON.stringify(dataPoints));
                    if(dataPoints[countTasks].x > endDate) {
                        endDateAxis = new Date(dataPoints[countTasks].x);
                        endDateAxisDay = endDateAxis.getDate();
                        endDateAxisMonth = endDateAxis.getMonth();
                        endDateAxisYear = endDateAxis.getFullYear();
                    }
                    createChart();
                });
            }, 20);
        });
    }

    // ____________________________________________________________________________

    function createChart() {
        var options = {
            title: {
                text: "Burn-Down-Chart - " + sprint.name
            },
            animationEnabled: true,
            axisX: {
                minimum: new Date(startYear, startMonth, startDay - 1),
                maximum: new Date(endDateAxisYear, endDateAxisMonth, endDateAxisDay + 1),
                labelFormatter: function (e) {
                    return CanvasJS.formatDate(e.value, "DD.MM.");
                }
            },
            data: [
                {
                    type: "line",
                    color: "blue",
                    showInLegend: true,
                    legendText: "Geschätzter Aufwand",
                    dataPoints: [
                        {x: new Date(startYear, startMonth, startDay), y: countTasks, indexLabel: "geplanter Start"},
                        {x: new Date(endYear, endMonth, endDay), y: 0, indexLabel: "geplantes Ende"}
                    ]
                },
                {
                    type: "line",
                    color: "red",
                    showInLegend: true,
                    legendText: "Verbleibende Tasks",
                    dataPoints: dataPoints
                }
            ]
        };
        if (countTasks > 0) {
            if (countTasks < 3) {
                $("#showMessage").removeClass("alert-warning").hide();
                $("#showMessage").text("Warnung: Der Sprint enthält " +
                    "nur wenige Tasks.").addClass("alert alert-warning").fadeIn();
                $("#showMessage").animate({opacity: 1.0}, 2000).fadeOut('slow', function () {
                });
            }
            $("#chartContainer").CanvasJSChart(options);
        }
        else {
            $("#showMessage").removeClass("alert-danger").hide();
            $("#showMessage").text("Der Sprint enthält keine Tasks. Deshalb kann kein " +
                "Burn-Down-Chart erstellt werden!").addClass("alert alert-danger").fadeIn();
        }
    }

});
