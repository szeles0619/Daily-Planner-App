// Get today's schedule from 9am - 5pm
let currentHour = moment().format('H');
let firstHour = moment().startOf('day').add(8,'h');
let totalHours = 9;

// This is a function which display today's date and time
function displayTodayDate() {
    let today = moment().format('[Today date is] MMMM Do YYYY, h:mm:ss a [Have a wonderful day!]');
    $('#currentDay').text(today);
}

// Schedule
function fillTimeTable() {

    for (let hour = 0; hour < totalHours; hour ++) { 
        let realHour = hour + 8;

        timeTableElement = firstHour.add(1,'h').format('HH:mm A');

        if (currentHour == realHour) {
            currentState = 'present';
        } else if (currentHour < realHour) {
            currentState = 'past';
        } else {
            currentState = 'future';
        }

        let appendBlock = 
            `<div id="hour-${realHour}" class="row time-block ${currentState}">
                <div class="col-md-1 hour">${timeTableElement}</div>
                <textarea class="col-md-10 description ${realHour}"></textarea>
                <button class="btn saveBtn col-md-1">
                    <i class="fas fa-save"></i>
                </button>
            </div>`;

        $(".container").append(appendBlock);

    }

    loadSchedule();
}

// Save schedule to local storage function
function saveSchedule() {

    let keyName = $(this).parent().attr('id');
    let keyValue = $(this).parent().children().eq(1).val();

    localStorage.setItem(keyName, keyValue);
}

function loadSchedule() {

    for (let hour = 0; hour < totalHours; hour++) {
        let realHour = hour + 8;
        let loadedSchedule = localStorage.getItem(`hour-${realHour}`);

        $(`.${realHour}`).val(loadedSchedule);
    }

}

displayTodayDate();
fillTimeTable();
$('.saveBtn').on('click', saveSchedule);

// Updating date and time table every minute
setInterval(function() {
    fillTimeTable(), displayTodayDate();
}, 600000);