"use strict";
// Initialize
var list = document.getElementById("list");
list.style.display = "none";
var day = document.getElementById("day");
var month = document.getElementById("month");
var active_list = "";
var date = new Date();
var year_list = document.getElementById("year-list");
var year = document.getElementById("year");
var left_year = document.getElementById("years-left");
var right_year = document.getElementById("years-right");
var colors = [
    "##DFFF00",
    "#FFBF00",
    "#FF7F50",
    "#DE3163",
    "#9FE2BF",
    "#40E0D0",
    "#6495ED",
    "#CCCCFF",
];
function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
year_list.innerHTML = String(date.getFullYear());
year_list.style.color = randomChoice(colors);
left_year.onclick = function () {
    var current_year = Number(year_list.innerHTML);
    year_list.innerHTML = String(current_year - 1);
    return false;
};
right_year.onclick = function () {
    var current_year = Number(year_list.innerHTML);
    year_list.innerHTML = String(current_year + 1);
    return false;
};
var output = document.getElementById("output-block-item");
// Lists of days, months, years
function createList(items_value, div_id, span_id, list_id) {
    var _a;
    var days_or_months_list = document.createElement("div");
    var _loop_1 = function (i) {
        var div = document.createElement("div");
        var span = document.createElement("span");
        var textSpan = document.createTextNode(String(i));
        days_or_months_list.id = list_id;
        div.id = div_id;
        span.id = span_id;
        span.style.color = randomChoice(colors);
        span.onclick = function () {
            if (list_id === "days-list") {
                var max_days_in_month = daysInMonth(Number(year_list.innerHTML), Number(month.placeholder));
                if (Number(span.innerHTML) > max_days_in_month) {
                    day.placeholder = String(max_days_in_month);
                }
                else {
                    day.placeholder = span.innerHTML;
                }
            }
            else {
                month.placeholder = span.innerHTML;
                var max_days_in_month = daysInMonth(Number(year_list.innerHTML), Number(span.innerHTML));
                if (day.placeholder !== "Day" &&
                    Number(day.placeholder) > max_days_in_month) {
                    day.placeholder = String(max_days_in_month);
                }
            }
            year.placeholder = year_list.innerHTML;
            output.innerHTML = day.placeholder + "th " + month.placeholder + " " + year.placeholder;
            active_list = "";
            list.removeChild(days_or_months_list);
            list.style.display = "none";
            return false;
        };
        span.appendChild(textSpan);
        div.appendChild(span);
        days_or_months_list.appendChild(div);
    };
    for (var i = 1; i <= items_value; i++) {
        _loop_1(i);
    }
    (_a = document.getElementById("list")) === null || _a === void 0 ? void 0 : _a.appendChild(days_or_months_list);
    return false;
}
// List events
day.onclick = function () {
    if (!active_list || active_list === "month") {
        if (active_list === "month") {
            var months_list = document.getElementById("months-list");
            list.removeChild(months_list);
        }
        createList(31, "days-list-block", "days-list-block-item", "days-list");
        active_list = "day";
        list.style.display = "block";
    }
    return false;
};
month.onclick = function () {
    if (!active_list || active_list === "day") {
        if (active_list === "day") {
            var days_list = document.getElementById("days-list");
            list.removeChild(days_list);
        }
        createList(12, "months-list-block", "months-list-block-item", "months-list");
        active_list = "month";
        list.style.display = "block";
    }
    return false;
};
