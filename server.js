console.log("server.js loaded");
process.env.NODE_ENV = process.env.NODE_ENV || 'heroku';
var config  = require("./config/config.js");

var express = require("./config/express");
var app     = express();

app.listen(config.port, function(){
    console.log("Listening on Port: "+ config.port);
});