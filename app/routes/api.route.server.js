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

    function clean(obj){
        for (var propName in obj){
            if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
                delete obj[propName];
            }
        }
    }

    let user    = req.body;
    clean(user);
    user.id     = req.user._id;
    
    console.log(user);
    //mongoExport.users.update(user);
    
    mongoExport.users.UserModel.update({"username": req.user.username},
        user,
        function(err, updatedUser){
            if (err){
                return next (err);
            } else {

                //res.json(updatedUser);
                res.write("finished");
                res.end();
            }
        }
    );
    

});


router.get("/user", function(req, res){
    //var requser = req.user;
    //var user = null;
    if(req.user){
        mongoExport.users.findByUsername(req.user.username, function(userArray){
            //Select the first found user
            user = Object.assign(userArray[0]);
            user.type = "user";
            console.log(user);
            res.send(user);
        });
    }else{
        var user = {
            type: "ip",
            username: req.ip
        }
        res.send(user);
    }
});






module.exports = router;