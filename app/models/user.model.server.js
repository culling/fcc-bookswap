"use strict";

var config  = require("./../../config/config");

// mongo
var mongo               = require("mongodb").MongoClient;
var mongoPort           = config.mongoPort;
var mongoDatabase       = config.mongoDatabase;
var collectionName      = "users";
var mongoUrl            =  `mongodb://localhost:${mongoPort}/${mongoDatabase}`;



class User {
    constructor(
        username,
        password,
        email
    ){
        this.username   = username,
        this.password   = password,
        this.email      = email
    }
}


let jim     = new User("jim",   "secret",   "jim@gmail.com");
let jane    = new User("jane",  "secret",   "jane@gmail.com");

var usersArray = [jim,jane];

exports.findAll = function(cb){
    cb(usersArray);
}

