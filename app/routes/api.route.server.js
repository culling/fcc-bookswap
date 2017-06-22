//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

const url           = require("url");
const querystring   = require('querystring');


//Controllers
var books       = require("./../controllers/books.controller.server");


//Custom Functions
function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}


//Users
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
    let user    = req.body;
    clean(user);
    user._id      = req.user._id;
    user.username = req.user.username;
    //Let the password be set    
    if(user.password){
        mongoExport.users.updatePassword(user, function(){
            delete user.password;
        });
    }
    mongoExport.users.UserModel.update({"username": req.user.username},
        user,
        function(err, updatedUser){
            if (err){
                return next (err);
            } else {
                res.write("finished");
                res.end();
            }
        }
    );
});


//Send the current user or the IP Address if none logged in
router.get("/user", function(req, res){
    if(req.user){
        mongoExport.users.findByUsername(req.user.username, function(userArray){
            //Select the first found user
            user = Object.assign(userArray[0]);
            user.type = "user";
            res.send(user);
        });
    }else{
        var user = {
            type: "ip"
            //,username: req.ip
        }
        res.send(user);
    }
});

//Books
router.get("/book", function(req, res){
    console.log("Query Called : " );
    //console.log( req.query);

    if(req.query.title){
        books.lookup(req.query.title, function(found){
            //res.send(found);
            res.write( JSON.stringify( JSON.parse(found), null, "\t") );
            res.end();
        });        
    }else{
        res.end();
    }
});

router.post("/book", function(req, res){
    var book = req.body ; 
    book.owner = req.user;
    //console.log(book );
    books.create(book);
    res.write("Sent");
    res.end();
});

router.get("/library", function(req, res){
    console.log("Library Route hit");
    //console.log("Query: " );
    //example http://localhost/api/library?username=jim
    //console.log( req.query.username );

    var libraryForUser = req.query.username ;
    //console.log(libraryForUser);

    books.lookupAll(function(foundBooks){
        var filteredBooks = foundBooks;
        if(libraryForUser){
            filteredBooks = foundBooks.filter(foundBook => {
            //console.log(foundBook);
            return foundBook.owner.username == libraryForUser;
        } );
        };

        res.write(JSON.stringify(filteredBooks, null, "\t") );
        res.end();
    });
});

router.post("/trade", function(req, res){
    console.log("API/trade hit")

    var book = req.body;
    //var userRequestingTrade = req.user;

    //console.log("From User");
    //console.log(userRequestingTrade );
    console.log("Book");
    console.log(book);

    //book.usersRequestingTrade.push( usersRequestingTrade );



});


module.exports = router;