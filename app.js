var elDays = document.getElementById('days');
var elList = document.querySelector('ul');
var elH1 = document.querySelector('h1');
var select = document.querySelector('select');


var d = new Date();
// var today = date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear();

//changes background from day to night from 6:00pm to 6 a.m.
function updateBackground(){
    var hour = d.getHours();

    if(hour > 6 && hour < 18) 
        document.body.style.backgroundImage = "url('images/day.jpg')";      
    else
        document.body.style.backgroundImage = "url('images/darkSky.jpg')";
}
updateBackground();

//takes month for creating calendar
var monthArray = new Array(12);
monthArray[0] = "January";
monthArray[1] = "Febuary";
monthArray[2] = "March";
monthArray[3] = "April";
monthArray[4] = "May";
monthArray[5] = "June";
monthArray[6] = "July";
monthArray[7] = "August";
monthArray[8] = "September";
monthArray[9] = "October";
monthArray[10] = "November";
monthArray[11] = "December";

var utcMonth = monthArray[d.getUTCMonth()];


//updates the date every second
function updateClock(){
    var date = new Date();
    var n = date.toDateString();
    var time = date.toLocaleTimeString();
    var elTime = document.getElementById('time');
    timeContent = elTime.innerHTML;
    elTime.innerHTML = n + ' ' + time;
}

 setInterval(updateClock, 1000); 


 //creates a calendar depending upon which month it is
function createCalendar(days, choice){
    elList.innerHTML = '';
    elH1.textContent = utcMonth;
    var days = 31;
    if(choice === 'February'){
        days = 28;
    } else if(choice === 'April' || choice === 'June' || choice === 'September' || choice === 'November'){
        days = 30;
    } 
    for(var i = 1; i <= days; i++) {
    var elListItem = document.createElement('li');
    elListItem.textContent = i;
    elList.appendChild(elListItem);
    }
}

createCalendar();