$(function () {
    var sprint;
    var startDate;
    var endDate;
    var startDay;
    var startMonth;
    var startYear;
    var endDay;
    var endMonth;
    var endYear;

    getSprint($("#sprintId").val());

    // ____________________________________________________________________________

    function getSprint(id) {
        $.getJSON("/sprint/rest/" + id, function (data) {
            sprint = data;
            startDate = new Date(sprint.start);
            day = startDate.getDate();
            endDate = new Date(sprint.end);

            var options = {
                title: {
                    text: "Burn-Down-Chart"
                },
                animationEnabled: true,
                axisX: {
                    labelFormatter: function (e) {
                        return CanvasJS.formatDate(e.value, "DD MMM");
                    }
                },
                data: [
                    {
                        type: "spline",
                        showInLegend: true,
                        legendText: "Geschätzter Projektaufwand",
                        dataPoints: [
                            { x: new Date(2017, 0, day), y: 80},
                            { x: new Date(2017, 0, 30), y: 70}
                        ]
                    },
                    {
                        type: "spline",
                        showInLegend: true,
                        legendText: "Verbleibender Projektaufwand",
                        dataPoints: [
                            { x: new Date(2017, 01, 1), y: 26},
                            { x: new Date(2017, 01, 3), y: 38},
                            { x: new Date(2017, 01, 5), y: 43},
                            { x: new Date(2017, 01, 7), y: 29},
                            { x: new Date(2017, 01, 11), y: 41},
                            { x: new Date(2017, 01, 13), y: 54},
                            { x: new Date(2017, 01, 20), y: 66},
                            { x: new Date(2017, 01, 21), y: 60},
                            { x: new Date(2017, 01, 25), y: 53},
                            { x: new Date(2017, 01, 27), y: 60}
                        ]
                    }
                ]

            };

            $("#chartContainer").CanvasJSChart(options);
        });
    }

});
