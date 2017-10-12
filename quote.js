var quoteAPI="http://quotes.stormconsultancy.co.uk/random.json";

var getQuote= (data)=>{
    $(".quote-text").text(data.quote);
    if(data.author===""){
        data.author="Unknown";
    }
    $(".author-text").text(`-${data.author}`);
};

$(document).ready(()=>{
    $.getJSON(quoteAPI,'data',getQuote);
})