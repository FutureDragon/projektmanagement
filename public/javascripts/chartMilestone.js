$(function () {
    var milestone;
    var dataPoints = [];
    var countSprints = 0;
    var startDate, startDay, startMonth, startYear;
    var endDate, endDay, endMonth, endYear;
    var endDateAxis, endDateAxisDay, endDateAxisMonth, endDateAxisYear;

    getMilestone($("#milestoneId").val());

    // ____________________________________________________________________________

    function getMilestone(id) {
        $.getJSON("/milestone/rest/" + id, function (data) {
            milestone = data;
        }).done(function () {
            startDate = new Date(milestone.start);
            endDate = new Date(milestone.end);
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
                getSprints();
            }, 20);
        })
    }

    function getSprints() {
        $.getJSON("/sprint/rest/getSprintsToMilestone/" + $("#milestoneId").val(), function (data) {
            $.each(data, function (key, val) {
                countSprints++;
            });
        }).done(function () {
            dataPoints.push({x: new Date(startYear, startMonth, startDay), y: countSprints});
            setTimeout(function () {
                $.getJSON("/sprint/rest/getSprintsToMilestone/" + $("#milestoneId").val(), function (data) {
                    $.each(data, function (key, val) {
                        if (val.end != null && val.end != undefined) {
                            dataPoints.push({x: new Date(val.end), y: 1});
                        }
                        else {
                            dataPoints.push({x: 0, y: 0});
                        }
                    });
                }).done(function () {
                    for (var i = 0; i < dataPoints.length; i++) {
                        if (dataPoints[i].x == 0 || dataPoints[i].y == 0) {
                            dataPoints[i].x = new Date(2999, 0, 1);
                            dataPoints[i].y = undefined;
                        }
                    }
                    dataPoints.sort(function (a, b) {
                        return a.x - b.x
                    });
                    for (var i = 1; i < dataPoints.length; i++) {
                        dataPoints[i].y = countSprints - i;
                    }
                    for (var i = 0; i < dataPoints.length; i++) {
                        if (dataPoints[i].y == undefined) {
                            dataPoints[i].x = undefined;
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
                    createChart();
                });
            }, 20);
        });
    }

    // ____________________________________________________________________________

    function createChart() {
        var options = {
            title: {
                text: "Burn-Down-Chart - " + milestone.name
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
                title: "Anzahl der Sprints"
            },
            data: [
                {
                    type: "line",
                    color: "blue",
                    showInLegend: true,
                    legendText: "Meilenstein",
                    dataPoints: [
                        {
                            x: new Date(startYear, startMonth, startDay),
                            y: countSprints
                        },
                        {x: new Date(endYear, endMonth, endDay), y: 0}
                    ]
                },
                {
                    type: "line",
                    color: "red",
                    showInLegend: true,
                    legendText: "Sprints",
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
        if (countSprints > 0) {
            $("#chartContainer").CanvasJSChart(options);
        }
        else {
            if (countSprints == 0) {
                $("#showMessage").removeClass("alert-danger").hide();
                $("#showMessage").text("Der Meilenstein enthält keine Sprints. Deshalb kann kein " +
                    "Burn-Down-Chart erstellt werden!").addClass("alert alert-danger").fadeIn();
            }
        }
    }

});
