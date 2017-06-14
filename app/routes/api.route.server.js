//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");


router.get('/users', function(req, res){
    mongoExport.users.findAll(function(users){
        res.send(JSON.stringify(users, null,"\t" ))
    }) ;
});



module.exports = router;