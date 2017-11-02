window.onload = function () {
    var d= new Date();
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = d.getMonth();
    var year = d.getFullYear();
    var firstDate = monthNames[month]+ " " + 1 + " "+ year;
    var firstDay = new Date(firstDate).toDateString().substring(0,3);
    var indexOfDay = dayNames.indexOf(firstDay);

    var totalDays = new Date(year,month+1,0).getDate(); //count number of days in the month;
    var Calendar = createCalendar(indexOfDay,totalDays);
    document.getElementById("calendar-month-year").innerHTML = monthNames[month] + " " + year;
    //document.getElementById("calendar-dates").appendChild(Calendar);
    $("#calendar-dates").append(Calendar);
};

function createCalendar(indexOfDay,totalDays) {
    var table = document.createElement("table");
    //first row
    var tr = document.createElement('tr');
    //row for days of the week
    for(var i =0;i<=6;i++){
        var td = document.createElement("td");
        td.innerHTML = "SMTWTFS"[i];
        tr.appendChild(td); //append wekdays to table row
    }
    //first row
    var count =0;
    for(;i<=6;i++){
        var td = document.createElement('td');
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //rest of date rows
    for(var j=3;j<=6;j++){
        tr= document.createElement("tr");
        for(var c=0;c<=6;c++){
            if(count>totalDays){
                table.append(tr);
            return table;            }
        }
        var td = document.createElement("td");
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.append(tr);
}