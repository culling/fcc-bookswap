var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

var BookModel   = mongoExport.books.BookModel;

exports.lookup = function(title, callback){
    //console.log(escape(title));
    var hostname = "www.googleapis.com"
    var path = "/books/v1/volumes?q=intitle:" + escape(title);
    console.log(path);
    https.get({hostname: hostname, path: path},
    function(response){
        var responseBody="";
        response.on("data", function(data){
        responseBody += data;
        });
        response.on("end", function(){
            //console.log(responseBody);
            var booksObjectResponseObject = responseBody;

            callback(booksObjectResponseObject);
        });
    });
};


exports.create  = function(rawBookObject){
    console.log("Book - Create Called");

    //Find the ISBN Numbers
    var isbnObjects = rawBookObject.volumeInfo.industryIdentifiers;
    var ISBN_13 = isbnObjects.filter((isbnObject)=> { return isbnObject.type === "ISBN_13"} )[0];
    var ISBN_10 = isbnObjects.filter((isbnObject)=> { return isbnObject.type === "ISBN_10"} )[0];
    


    if(rawBookObject.owner){
        var book = {
            authors: rawBookObject.volumeInfo.authors ,
            title: rawBookObject.volumeInfo.title ,
            owner: rawBookObject.owner._id,
            thumbnailUrl: rawBookObject.volumeInfo.imageLinks.smallThumbnail ,
            ISBN_13: ISBN_13.identifier ,
            ISBN_10: ISBN_10.identifier
        }
        var newBook = new BookModel(book);
        console.log(newBook);
        newBook.save();
    }
};


exports.lookupAll = function(done){
    console.log("Book - lookupAll Called");
    console.log("");

    mongoExport.books.findAll(function(foundBooks){
        //console.log(foundBooks);
        
        done(foundBooks);
    });

 
}