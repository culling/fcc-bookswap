"use strict";

var config  = require("./../../config/config");

// mongo
var mongo               = require("mongodb").MongoClient;
var mongoPort           = config.mongoPort;
var mongoDatabase       = config.mongoDatabase;
//var collectionName      = "users";
var mongoUrl            =  `mongodb://localhost:${mongoPort}/${mongoDatabase}`;


//Crypto 
var crypto      = require('crypto');


// Mongoose
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Import the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl);
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username            : String,
    password            : String,
    email               : String,
    salt                : String
    
});

UserSchema.pre('save', function (next){
    if (this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64' );
        this.password = this.hashPassword(this.password);
    }
    next();
} );

UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};


UserSchema.methods.authenticate = function(password){
    return this.password === this.hashPassword(password);
};


// Compile model from schema
var UserModel       = mongoose.model('User', UserSchema );
exports.UserModel   = UserModel;


/*
var jim = new UserModel({username: "jim",password: "secret", email: "jim@gmail.com"});
jim.save(function(err){
    if (err) return handleError(err);
    console.log("saved");
});
console.log("Jim Username: " + jim.username);

jim.username = "JIM";
jim.save(function(err){
    if (err) return handleError(err);
});
console.log("Jim Username: "+ jim.username);
*/


exports.findByUsername = function(username, cb){
    UserModel.find({"username": username}, function(err, foundUsers){
        if(err){
            console.error(err);
        }
        console.log("Found Users");
        console.log(foundUsers);
        cb(foundUsers);
    });
}

exports.drop = function(){
    UserModel.collection.drop();
};

exports.create  = function(user){
    "Create Called"
    console.log(user);
    var newUser = new UserModel(user);
    newUser.save();
};

exports.findAll = function(cb){
    UserModel.find()
    .exec(
        function(err, results){
            if(err) return handleError(err);
            cb(results);
        }
    );
};

