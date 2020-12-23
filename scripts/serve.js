const express = require('express');
const app = express();
const path = require('path');

app.use('/rok-compensation/static', express.static(path.join(__dirname + '/../build/static')));
app.use('/rok-compensation', express.static(path.join(__dirname + '/../build')));

app.get('/rok-compensation/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

console.log('serving at:');
console.log('localhost:5000/rok-compensation/');

app.listen(5000);