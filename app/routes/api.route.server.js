//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

//
var passport    = require("./../../config/passport");


router.get('/users', function(req, res){
    mongoExport.users.findAll(function(users){

        res.write(JSON.stringify(users, null, "\t" ));
        res.end();
    }) ;
});

router.post("/users", function(req, res){
    //var newUser = ({username: "jane",password: "secret", email: "jane@gmail.com"});
    var newUser = req.body;
    mongoExport.users.create(newUser);
    res.end();
});

router.put("/users", function(req, res){
    //var newUser = ({username: "jane",password: "secret", email: "jane@gmail.com"});
    let user = req.body;
        user.username = req.user.username;

    //console.log(req.user);
    console.log(user);
    
    
    //mongoExport.users.UserModel.update({"username": user.username}) //.create(newUser);
    res.end();
});


router.get("/user", function(req, res){
    var user = req.user;
    if(user){
        user.type = "user";
    }else{
        user = {
            type: "ip",
            username: req.ip
        }
    }
    res.send(user);
});






module.exports = router;