$(function () {
    var options;
    var milestones = [];
    var data2 = [];
    var dataPoints = [];
    var sprints = [];
    var tasks = [];
    var startDateAxis = new Date(2999, 1, 1);
    var startDateAxisDay = 1;
    var startDateAxisMonth = 1;
    var startDateAxisYear = 1;
    var endDateAxis = new Date(1971, 1, 1);
    var endDateAxisDay = 1;
    var endDateAxisMonth = 1;
    var endDateAxisYear = 1;

    getMilestones();

    // ____________________________________________________________________________

    function getMilestones() {
        var i = 0;
        $.getJSON("/milestone/rest", function (data) {
            $.each(data, function (key, val) {
                milestones.push(data[i]);
                i++;
                var startDate = new Date(val.start);
                var endDate = new Date(val.end);
                if (startDate.getTime() < startDateAxis.getTime()) {
                    startDateAxis = new Date(startDate);
                    startDateAxisDay = startDateAxis.getDate();
                    startDateAxisMonth = startDateAxis.getMonth();
                    startDateAxisYear = startDateAxis.getFullYear();
                }
                if (endDate.getTime() > endDateAxis.getTime()) {
                    endDateAxis = new Date(endDate);
                    endDateAxisDay = endDateAxis.getDate();
                    endDateAxisMonth = endDateAxis.getMonth();
                    endDateAxisYear = endDateAxis.getFullYear();
                }
            });
        }).done(function () {
            getSprints();
        })
    }

    function getSprints() {
        var i = 0;
        $.getJSON("/sprint/rest/", function (data) {
            $.each(data, function () {
                sprints.push(data[i]);
                i++;
            });
        }).done(function () {
            getTasks();
        })
    }

    function getTasks() {
        var i = 0;
        $.getJSON("/backlog/rest/", function (data) {
            $.each(data, function () {
                tasks.push(data[i]);
                i++
            });
        }).done(function () {
            prepareChart();
        });
    }

    function prepareChart() {
        for (var i = 0; i < milestones.length; i++) {
            data2.push({
                type: "line",
                showInLegend: true,
                legendText: milestones[i].name,
                dataPoints: [
                    {x: new Date(milestones[i].start), y: milestones.length - i},
                    {x: new Date(milestones[i].end), y: milestones.length - i}
                ]
            });
            var id = milestones[i]._id;
            for (var y = 0; y < sprints.length; y++) {
                if (sprints[y]._milestone == id) {
                    dataPoints.push({
                        x: new Date(sprints[y].end),
                        y: milestones.length - i,
                        z: 10,
                        markerType: "circle",
                        markerColor: "blue"
                    });
                    var id2 = sprints[y]._id;
                    for (var z = 0; z < tasks.length; z++) {
                        if (tasks[z]._sprint == id2 && tasks[z].end != undefined && tasks[z].end != null) {
                            dataPoints.push({
                                x: new Date(tasks[z].end),
                                y: milestones.length - i,
                                z: 5,
                                markerType: "cross",
                                markerColor: "red"
                            })
                        }
                    }
                }
            }
        }
        dataPoints.push({
            x: new Date(endDateAxisYear, endDateAxisMonth, endDateAxisDay),
            y: 1,
            z: 100,
            markerType: "none"
        });
        dataPoints.push({
            x: new Date(endDateAxisYear, endDateAxisMonth, endDateAxisDay),
            y: 1,
            z: 1,
            markerType: "none"
        });
        data2.push({
            type: "bubble",
            dataPoints: dataPoints
        });
        createChart();
    }

    // ____________________________________________________________________________

    function createChart() {
        options = {
            title: {
                text: "Roadmap"
            },
            axisX: {
                minimum: new Date(startDateAxisYear, startDateAxisMonth, startDateAxisDay - 1),
                maximum: new Date(endDateAxisYear, endDateAxisMonth, endDateAxisDay + 1),
                labelFormatter: function (e) {
                    return CanvasJS.formatDate(e.value, "DD.MM.");
                }
            },
            axisY: {
                interval: 1
            },
            data: data2
        };
        $("#showMessage").removeClass("alert-info").hide();
        $("#showMessage").text("Blauer Kreis = Ende eines Sprints. Rotes " +
            "Kreuz = Ende eines Tasks").addClass("alert alert-info").fadeIn();
        $("#chartContainer").CanvasJSChart(options);
    }
});
