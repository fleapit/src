var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

app.use('/views', express.static(__dirname + "/views"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/static', express.static(__dirname + "/static"));
app.use('/models', express.static(__dirname + "/models"));
app.use('/controllers', express.static(__dirname + "/controllers"));

app.get('/', function(req, res){
    res.sendfile('views/index.html');
});

app.listen('3000', function(){
    console.log("Listening for Local Host 3000");
});