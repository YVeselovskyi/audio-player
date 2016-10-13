const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/songs', (req, res) => {
    fs.readdir('./public/songs', (eventType, filename) => {
        if (filename)
            res.send(filename);
    });
});



app.listen(port);
