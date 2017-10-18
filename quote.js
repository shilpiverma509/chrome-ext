
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

     var getWeather= (position)=>{
        var lat =position.coords.latitude;
        var lng = position.coords.longitude;
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


 
 
$(document).ready(()=>{
    $.getJSON(quoteAPI,'data',getQuote);
    navigator.geolocation.getCurrentPosition(getLocation);
    navigator.geolocation.getCurrentPosition(getWeather);
});