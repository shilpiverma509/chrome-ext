var elDays = document.getElementById('days');
var elList = document.querySelector('ul');
var elH1 = document.querySelector('h1');
var select = document.querySelector('select');


function clock(){
var date = new Date();
var n = date.toDateString();
var time = date.toLocaleTimeString();
var elTime = document.getElementById('time')
var timeTextNode = document.createTextNode(n + ' ' + time)
elTime.appendChild(timeTextNode);
}

setTimeout(clock, 1000);









select.onchange = function(){
    var choice = select.value;
    var days = 31;
    if(choice === 'February'){
        days = 28;
    } else if(choice === 'April' || choice === 'June' || choice === 'September' || choice === 'November'){
        days = 30;
    } 
    createCalendar(days, choice);
}

function createCalendar(days, choice){
    elList.innerHTML = '';
    elH1.textContent = choice;
    for(var i = 1; i <= days; i++) {
    var elListItem = document.createElement('li');
    elListItem.textContent = i;
    elList.appendChild(elListItem);
    }
}

createCalendar(31, 'January');

   

