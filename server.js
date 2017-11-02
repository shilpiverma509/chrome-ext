const express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));


app.listen(8000, () => {
    console.log('server is up on port 8000');
});