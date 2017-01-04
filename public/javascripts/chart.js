$(function () {
    //Better to construct options first and then pass it as a parameter
    var options = {
        title: {
            text: "Spline Chart using jQuery Plugin"
        },
        animationEnabled: true,
        data: [
            {
                type: "spline", //change it to line, area, column, pie, etc
                dataPoints: [
                    { x: 10, y: 10 },
                    { x: 20, y: 70 },
                    { x: 30, y: 0 },
                    { x: 40, y: 6 },
                    { x: 50, y: 6 },
                    { x: 60, y: 90 },
                    { x: 70, y: -50 },
                    { x: 80, y: 5 }
                ]
            }
        ]
    };

    $("#chartContainer").CanvasJSChart(options);

});
