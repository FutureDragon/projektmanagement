$(function () {
    var sprint;
    var dataPoints = [];
    var countTasks = 0;
    var countTasksW = 0;
    var countStoryPoints = 0;
    var countStoryPointsMax = 0;
    var calcStoryPoints = 0;
    var startDate, startDay, startMonth, startYear;
    var endDate, endDay, endMonth, endYear;
    var endDateAxis, endDateAxisDay, endDateAxisMonth, endDateAxisYear;

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
        $.getJSON("/backlog/rest/getTasksToSprint/" + $("#sprintId").val(), function (data) {
            $.each(data, function (key, val) {
                countTasks++;
                if (val.story_points > 0) {
                    countStoryPoints = countStoryPoints + val.story_points;
                }
                else {
                    countTasksW++;
                }
            });
        }).done(function () {
            dataPoints.push({x: new Date(startYear, startMonth, startDay), y: countStoryPoints});
            setTimeout(function () {
                $.getJSON("/backlog/rest/getTasksToSprint/" + $("#sprintId").val(), function (data) {
                    $.each(data, function (key, val) {
                        if (val.story_points > 0 && val.end != null && val.end != undefined) {
                            dataPoints.push({x: new Date(val.end), y: val.story_points});
                        }
                        else {
                            dataPoints.push({x: undefined, y: 0});
                        }
                    });
                }).done(function () {
                    for (var i = 0; i < dataPoints.length; i++) {
                        if (dataPoints[i].x == null || dataPoints[i].x == undefined || dataPoints[i].y == 0) {
                            dataPoints[i].x = new Date(2999, 0, 1);
                            dataPoints[i].y = undefined;
                        }
                    }
                    dataPoints.sort(function (a, b) {
                        return a.x - b.x
                    });
                    countStoryPointsMax = countStoryPoints;
                    for (var i = 1; i < dataPoints.length; i++) {
                        if (dataPoints[i].y != undefined) {
                            calcStoryPoints = countStoryPoints;
                            countStoryPoints = calcStoryPoints - dataPoints[i].y;
                            dataPoints[i].y = countStoryPoints;
                        }
                    }
                    for (var i = 0; i < dataPoints.length; i++) {
                        if (dataPoints[i].x == null || dataPoints[i].x == undefined || dataPoints[i].y == undefined) {
                            dataPoints[i].x = undefined;
                            dataPoints[i].y = undefined;
                        }
                    }
                    for (var i = 0; i < dataPoints.length; i++) {
                        if (dataPoints[i].x > endDate) {
                            endDateAxis = new Date(dataPoints[i].x);
                            endDateAxisDay = endDateAxis.getDate();
                            endDateAxisMonth = endDateAxis.getMonth();
                            endDateAxisYear = endDateAxis.getFullYear();
                        }
                    }
                    //alert(JSON.stringify(dataPoints));
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
            axisY: {
                title: "Story Points"
            },
            data: [
                {
                    type: "line",
                    color: "blue",
                    showInLegend: true,
                    legendText: "Geschätzter Aufwand",
                    dataPoints: [
                        {
                            x: new Date(startYear, startMonth, startDay),
                            y: countStoryPointsMax,
                            indexLabel: "geplanter Start"
                        },
                        {x: new Date(endYear, endMonth, endDay), y: 0, indexLabel: "geplantes Ende"}
                    ]
                },
                {
                    type: "line",
                    color: "red",
                    showInLegend: true,
                    legendText: "Verbleibender Aufwand",
                    dataPoints: dataPoints
                }
            ]
        };
        var rest = endDate.getTime() - startDate.getTime();
        if (rest < 7) {
            options.axisX = {
                minimum: new Date(startYear, startMonth, startDay - 1),
                maximum: new Date(endDateAxisYear, endDateAxisMonth, endDateAxisDay + 1),
                interval: 1,
                intervalType: "day",
                labelFormatter: function (e) {
                    return CanvasJS.formatDate(e.value, "DD.MM.");
                }
            };
        }
        if (countTasks > 0 && countStoryPointsMax > 0) {
            if (countTasksW > 0) {
                $("#showMessage").removeClass("alert-warning").hide();
                $("#showMessage").text("Warnung: Der Sprint enthält " + countTasksW + " Tasks, denen noch keine Story " +
                    "Points zugeordnet wurden. Diese werden nicht im Burn-Down-Chart " +
                    "angezeigt!").addClass("alert alert-warning").fadeIn();
            }
            $("#chartContainer").CanvasJSChart(options);
        }
        else {
            if (countTasks == 0) {
                $("#showMessage").removeClass("alert-danger").hide();
                $("#showMessage").text("Der Sprint enthält keine Tasks. Deshalb kann kein " +
                    "Burn-Down-Chart erstellt werden!").addClass("alert alert-danger").fadeIn();
            }
            else {
                $("#showMessage").removeClass("alert-danger").hide();
                $("#showMessage").text("Die Tasks, die diesem Sprint zugeordnet sind, enthalten keine Story Points. " +
                    "Deshalb kann kein Burn-Down-Chart erstellt werden!").addClass("alert alert-danger").fadeIn();
            }
        }
    }

});
