var elDays = document.getElementById('days');
var elList = document.querySelector('ul');
var elH1 = document.querySelector('h1');
var select = document.querySelector('select');


var d = new Date()

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


function updateClock(){
    var date = new Date();
    var n = date.toDateString();
    var time = date.toLocaleTimeString();
    var elTime = document.getElementById('time')
    timeContent = elTime.innerHTML;
    elTime.innerHTML = n + ' ' + time;
}

 setInterval(updateClock, 1000); 










            

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

   

