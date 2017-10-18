
var quoteAPI="http://quotes.stormconsultancy.co.uk/random.json";

var getQuote= (data)=>{
    $(".quote-text").text(data.quote);
    if(data.author===""){
        data.author="Unknown";
    }
};



 var getLocation = (position)=>{
     var lat =position.coords.latitude;
     var lng = position.coords.longitude;
     API_key="Enter your key";
     console.log(lat);
     console.log(lng);
     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_key}`;
     console.log (url);
        $.getJSON(url,(data)=>{
            console.log(data);
        $('.display-location').text(data.results[3].formatted_address);

     })
     .done(getWeather)
     .fail(function() {
        console.log( "error" );
      });
    };

     var getWeather= (position)=>{
        var lat =position.coords.latitude;
        var lng = position.coords.longitude;
       console.log(`lat is : ${lat}`);
       console.log(`long is :${lng}`);
       
       var  url= `https://api.darksky.net/forecast/"Enter your key"/${lat},${lng}?callback=?`;
       console.log(url);
         $.getJSON(url,(response)=>{
             console.log(response);
            var tempDegree="&deg;F";
            var icon = response.currently.icon;
            $('.display-weather').html(Math.round(response.currently.temperature)+tempDegree);      
            $(".weather-icon").html("<i class='wi wi-forecast-io-" + icon + "'></i>");
        })
        .fail(function() {
            console.log( "Cannot retrieve weather for your location" );
          });
    
    };  


 
 
$(document).ready(()=>{
    $.getJSON(quoteAPI,'data',getQuote);
    navigator.geolocation.getCurrentPosition(getLocation);
    navigator.geolocation.getCurrentPosition(getWeather);
});