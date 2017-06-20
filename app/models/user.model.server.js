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
    salt                : String,
    firstName           : String,
    lastName            : String,    
    type                : String,
    city                : String,
    state               : String,
    country             : String
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




UserSchema.methods.validatePassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

// Compile model from schema
var UserModel       = mongoose.model('User', UserSchema );
exports.UserModel   = UserModel;


exports.updatePassword  = function(user, done){
    console.log("Update Called");
    UserModel.findOne({ username: user.username }, function (err, doc){
        doc.password = user.password;
        doc.save();
    });
};


exports.findByUsername = function(username, cb){
    UserModel.find({"username": username}, function(err, foundUsers){
        if(err){
            console.error(err);
        }
        cb(foundUsers);
    });
}

exports.drop = function(){
    UserModel.collection.drop();
};

exports.create  = function(user){
    console.log("Create Called");
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

UserSchema.set('toJSON',{
    getters: true,
    virtuals: true}
);
