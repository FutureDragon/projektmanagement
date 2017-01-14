$(function () {
    var sprint;

    getSprint($("#sprintId").val());

    // ____________________________________________________________________________

    function getSprint(id) {
        $.getJSON("/sprint/rest/" + id, function (data) {
            sprint = data;
        });
    }

    var options = {
        title: {
            text: "Burn-Down-Chart"
        },
        animationEnabled: true,
        data: [
            {
                type: "spline",
                legendText: "Ideal Burndown",
                dataPoints: [
                    {x: 1, y: 70},
                    {x: 2, y: 60},
                    {x: 3, y: 50},
                    {x: 4, y: 40},
                    {x: 5, y: 30},
                    {x: 6, y: 20},
                    {x: 7, y: 10},
                    {x: 8, y: 0}
                ]
            },
            {
                type: "spline",
                legendText: "Noch zu erledigen",
                dataPoints: [
                    {x: 1, y: 70},
                    {x: 2, y: 65},
                    {x: 3, y: 60},
                    {x: 4, y: 55},
                    {x: 5, y: 50},
                    {x: 6, y: 45},
                    {x: 7, y: 40},
                    {x: 8, y: 35}
                ]
            }
        ]

    };

    $("#chartContainer").CanvasJSChart(options);

});
