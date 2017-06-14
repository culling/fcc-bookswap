//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");


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
})

module.exports = router;