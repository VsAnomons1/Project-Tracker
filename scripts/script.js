var date = $("#date");
var dateCalendar = $("#due-date");
var addBtn = $(".btn");
var table = $(".table");
var closeBtn = $("#close-btn");
var submitBtn = $("#submit-btn");
var dueDate = moment("2023-05-04");
// Adds datepicker widget
dateCalendar.datepicker({
    minDate: "+1d"
});
// Gets current time and renders and updates by the second 
var setDate = setInterval(function(){
    var currentDate = moment().format("MMM DD, YYYY [at] hh:mm:ss a");
    date.text(currentDate);
}, 1000)

// Retrieves project info and renders it to the table
function projectDataHandler(){
    var projectName = $("#project-name").prop("value");
    var projectType = $("#project-type").prop("value");
    var hourlyRate = $("#hourly-rate").prop("value");
    var dueDate = $("#due-date").prop("value");
if(!projectName && !projectType && !hourlyRate && !dueDate){
    return;
}
    var currentDate = moment();
    var due = moment(dueDate);
    var remainingDays = daysLeft(currentDate, due);
    var potentialEarnings = totalEarnings(hourlyRate, remainingDays);

    var tBody = $("<tbody>").addClass("table-group-divider bg-light");
    var tRow = $("<tr>");
    var tdName = $("<td>").text(projectName).addClass("align-middle");
    var tdType = $("<td>").text(projectType).addClass("align-middle");
    var tdHourlyRate = $("<td>").text("$" + hourlyRate).addClass("align-middle");
    var tdDueDate = $("<td>").text(due.format("MMM DD, YYYY")).addClass("align-middle");
    var tdRemainingDays = $("<td>").text(remainingDays).addClass("align-middle");
    var tdPotentialEarnings = $("<td>").text("$" + potentialEarnings).addClass("align-middle");
    var tdDeleteBtn = $("<td>");
    var deleteBtn = $("<button>").addClass("btn btn-custom").text("Delete Project");
    tdDeleteBtn.append(deleteBtn);
    tRow.append(tdName);
    tRow.append(tdType);
    tRow.append(tdHourlyRate);
    tRow.append(tdDueDate);
    tRow.append(tdRemainingDays);
    tRow.append(tdPotentialEarnings);
    tRow.append(tdDeleteBtn);
    tBody.append(tRow);
    table.append(tBody);

    $("#project-name").prop("value", "");
    $("#project-type").prop("value", "");
    $("#hourly-rate").prop("value", "");
    $("#due-date").prop("value", "");

    deleteBtn.on("click", function(e){
        var targetedProject = e.target;
        $(targetedProject).parent().parent().parent().remove();
    })
}
// Assuming it is an 8-hour shift
// Calculates the potential earnings before due date
function totalEarnings(hourlyRate, daysLeft){
    var total = (hourlyRate * 8) * daysLeft;
    return total;
}
// Gets days left before due date
function daysLeft(currentDate, dueDate){
    var remainingDays = dueDate.diff(currentDate, "days");
    return remainingDays;
}

submitBtn.on("click", projectDataHandler);
