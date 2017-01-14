$(document).ready(function (event) {

    createIndex();

// ____________________________________________________________________________

    function createIndex() {
        $(".table").hide().find("tr:gt(1)").remove();
        $.getJSON("/sprint/rest", function (data) {
            $.each(data, function (key, val) {
                var color = "blue";
                var startDate = new Date(val.start);
                var startDateMonth = startDate.getMonth() + 1;
                if (startDateMonth.toString().length < 2) {
                    startDateMonth = "0" + startDateMonth;
                }
                var startDateDay = startDate.getDate();
                if (startDateDay.toString().length < 2) {
                    startDateDay = "0" + startDateDay;
                }
                var endDate = new Date(val.end);
                var endDateMonth = endDate.getMonth() + 1;
                if (endDateMonth.toString().length < 2) {
                    endDateMonth = "0" + endDateMonth;
                }
                var endDateDay = endDate.getDate();
                if (endDateDay.toString().length < 2) {
                    endDateDay = "0" + endDateDay;
                }
                var text = '<tr><td id="' + val._id + '" class="click tdBig ' + color + '">'
                    + '<b>' + val.name + '</b>' + '<br>' + 'Erstellt von: ' + val._creator
                    + '</b>' + '<br>' + startDateDay + '.' + startDateMonth + '.' + startDate.getFullYear()
                    + ' - ' + endDateDay + '.' + endDateMonth + '.' + endDate.getFullYear() + '</td></tr>';
                $("#sprintTable tr:last").after(text);
            });
            $(".table").fadeIn(500);
        });
    }

    $(".table").on("click", "td", function () {
        window.location = "/chart/" + $(this).attr("id");
    })

});