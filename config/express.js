//Settings
var config      = require("./config");
var passport    = require("./passport");
//var mongo       = require("./mongo");

//var secrets     = require("./secrets");

//Modules
var http        = require('http');
var express     = require("express");
var socketio    = require('socket.io');
var cookieParser    = require('cookie-parser');
var expressSession  = require('express-session');
var flash       = require("connect-flash");


//Express App
var app         = express();

module.exports  = function(){
    //Socket.io 
    var server  = http.createServer(app);
    var io      = socketio.listen(server);

    //Connection Event
    io.on("connection", function(socket){
        //connected to socket
        console.log("user Connected");

        //On new state broadcast
        socket.on("new state", function(data){
            console.log("New State - Express.js - 26");
            console.log(data);
            io.sockets.emit("new state", data);
        });

        //Disconnect
        socket.on("disconnect", function(){
            console.log("User disconnected");
        });

    });

    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

    //Passport
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());


    //Views
    app.set("views", "./app/views");
    app.set("view engine", "ejs");

    //Routes
    var api = require("./../app/routes/api.route.server");
    app.use("/api", api);

    var index = require("./../app/routes/index.route.server");
    app.use("/", index);

    //static files
    app.use(express.static('./public'));

    return server;
}