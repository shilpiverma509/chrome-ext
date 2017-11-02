//calendar

//changes background from day to night from 6:00pm to 6 a.m.
function updateBackground() {
    var d = new Date();

    var hour = d.getHours();

    if (hour > 6 && hour < 18)
        document.body.style.backgroundImage = "url('images/day.jpg')";
    else
        document.body.style.backgroundImage = "url('images/darkSky.jpg')";
}

function displayCalendar() {
    var htmlContent = "";
    var FebNumberOfDays = "";
    var counter = 1;
    var dateNow = new Date();
    var month = dateNow.getMonth();
    var nextMonth = month + 1; //+1; //Used to match up the current month with the correct start date.
    var prevMonth = month - 1;
    var day = dateNow.getDate();
    var year = dateNow.getFullYear();
    //Determing if February (28,or 29)  
    if (month == 1) {
        if ((year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0)) {
            FebNumberOfDays = 29;
        } else {
            FebNumberOfDays = 28;
        }
    }
    // names of months and week days.
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    var dayPerMonth = ["31", "" + FebNumberOfDays + "", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"]
    // days in previous month and next one , and day of week.
    var nextDate = new Date(nextMonth + ' 1 ,' + year);
    var weekdays = nextDate.getDay();
    var weekdays2 = weekdays
    var numOfDays = dayPerMonth[month];
    // this leave a white space for days of pervious month.
    while (weekdays > 0) {
        htmlContent += "<td class='monthPre'></td>";

        // used in next loop.
        weekdays--;
    }
    // loop to build the calander body.
    while (counter <= numOfDays) {

        // When to start new line.
        if (weekdays2 > 6) {
            weekdays2 = 0;
            htmlContent += "</tr><tr>";
        }
        // if counter is current day.
        // highlight current day using the CSS defined in header.
        if (counter == day) {
            htmlContent += "<td class='dayNow clickDate'>" + counter + "</td>";
        } else {
            htmlContent += "<td class='monthNow clickDate'>" + counter + "</td>";

        }
        weekdays2++;
        counter++;
    }
    // building the calendar html body.
    var calendarBody = "<table class='calendar'> <tr class='monthNow'><th colspan='7'>" +
        monthNames[month] + " " + year + "</th></tr>";
    calendarBody += "<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>" +
        "<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
    calendarBody += "<tr>";
    calendarBody += htmlContent;
    calendarBody += "</tr></table>";
    // set the content of div .
    document.getElementById("calendar").innerHTML = calendarBody;
}



//updates the date every second
function updateClock() {
    var d = new Date();
    var n = d.toDateString();
    var time = d.toLocaleTimeString();
    var elTime = document.getElementById('time');
    elTime.innerHTML = n + ' ' + time;
}


//get quotes

var quoteAPI="http://quotes.stormconsultancy.co.uk/random.json";

var getQuote= (data)=>{
    $(".quote-text").text(data.quote);
    if(data.author===""){
        data.author="Unknown";
    }
    $(".author-text").text(`-${data.author}`);
};



 var getLocation = (position)=>{
     var lat =position.coords.latitude;
     var lng = position.coords.longitude;
     API_key="AIzaSyAj_8ug2w-MjDHqx4mvQoJXlnFxV2-riBM";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_key}`;
     console.log (url);
        $.getJSON(url,(data)=>{
            console.log(data);
        $('.display-location').text(data.results[3].address_components[0].short_name);

     })
     .done(getWeather)
     .fail(function() {
        console.log( "error" );
      });
    };

     var getWeather= function(position){
        var lng = position.coords.longitude;
        var lat =position.coords.latitude;        
       var  url= `https://api.darksky.net/forecast/e446c63584e4c1c50e08f61db0ce7efa/${lat},${lng}?callback=?`;
       console.log(url);
         $.getJSON(url,(response)=>{
            var tempDegree="&deg;F";
            var icon = response.currently.icon;
            $('.display-weather').html(Math.round(response.currently.temperature)+tempDegree);      
            $(".weather-icon").html("<i class='wi wi-forecast-io-" + icon + "'></i>");
        })
        .fail(function() {
            console.log( "Cannot retrieve weather for your location" );
          });
    
    };  



 //to-do 
 
 //todo list
//retrieve todo's from localStorage.Retun an empty array if no list is found
//localStorage are key/valye pairs and always stored as strings. Always parse them
//to a valid JS object before using them

var date = new Date(); // current date
var dateClicked = date.getDate() + "_" + (date.getMonth()+1) + "_" + date.getFullYear();

var month = (date.getMonth())+1; //current month
var year = date.getFullYear(); //current year

//get todo's from localStorage
function get_todos(){
    var todos = [];
    var todos_str = localStorage.getItem(dateClicked); 
    if(todos_str !=null){
        todos = JSON.parse(todos_str);
    }
    return todos;
}
// Adding a new TODO entry
function add(){
    var todos = get_todos();
    var task = $('#task').val();     
    var taskObj = {    
        task:task,
        isDone:false,
    };
    
    todos.push(taskObj);
    
    localStorage.setItem(dateClicked,JSON.stringify(todos));
    //update list of the TODO's displayed on webpage
    show();
    $("input").val("");
    //avoid any further actions generated by 'click' event
    return false;
}

//remove the to-do list items from localStorage
function removeStorage(){
    var todos = get_todos();    
    var id = event.currentTarget.getAttribute('id');
        todos.splice(id,1);
    localStorage.setItem(dateClicked,JSON.stringify(todos));
    show();
    return false;
}

//update localStorage for completed tasks
function updateLocalStorage(val){
    
     var todos = get_todos();
        for(var i=0;i<todos.length;i++){
            if(todos[i].task === val){
                    todos[i].isDone = true;
            }
        }
    localStorage.setItem(dateClicked,JSON.stringify(todos));
    
}

//display the current todo list on webpage
function show(){

    var todos = get_todos();
    var html="<ul>";
    for(var i=0; i<todos.length; i++) {
        var addClassStr = todos[i].isDone ? 'class=taskCompleted' : '';
        html+= '<li ' + addClassStr + ' value='+ todos[i].task + '>' + todos[i].task + '<button class="remove" id="' + i  + '">x</button></li>';
    }
    html+="</ul>";
    $("#todos").html(html);
    $(".remove").click(function(event){
        event.currentTarget.parentElement.remove();
        removeStorage();        
    }); 
    
    $("#todos").on('click','li',function(){
        $(this).addClass("taskCompleted");
        updateLocalStorage($(this).attr("value"));

    });
}

$("input").keydown(function(e){
    if( $(this).val()!=="" && e.keyCode===13){
        event.preventDefault();
        add();    
    }
});


$(".todo-bar").hide();
$(".cross").hide();
    $(".hamburger").click(()=>{
    $(".todo-bar").slideToggle( "slow", ()=> {
        $( ".hamburger" ).hide();
        $( ".cross" ).show();
        });
    });
   $(".cross").click(()=>{
       $(".todo-bar").slideToggle("slow",()=>{
           $(".cross").hide();
           $(".hamburger").show();
        });
   });

function taskDate() {
    $(document).on('click', '.clickDate', function () {
        $(".todo-bar").show("slow", function (event) {
            $(".hamburger").hide();
            $(".cross").show();
        });
        dateClicked = $(event.target).text() + "_" + month + "_" + year;
        console.log(dateClicked);
        show();
    });
}
    
$(document).ajaxStop(function () {
        $('#loading').hide();
    });
$(document).ready(()=>{
    updateBackground();
    setInterval(updateClock, 1000);
    $.getJSON(quoteAPI,'data',getQuote);
    navigator.geolocation.getCurrentPosition(getLocation);
    navigator.geolocation.getCurrentPosition(getWeather);   
    show();
    taskDate();


   
});
$(document).ajaxStart(function () {
    $('#loading').show();
});




