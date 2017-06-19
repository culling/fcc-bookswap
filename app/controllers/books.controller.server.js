var http = require("http");
var https = require("https");


exports.lookup = function(title, callback){
    console.log(escape(title));
    var hostname = "www.googleapis.com"
    var path = "/books/v1/volumes?q=intitle:" + escape(title);
    https.get({hostname: hostname, path: path},
    function(response){
        var responseBody="";
        response.on("data", function(data){
        responseBody += data;
        });
        response.on("end", function(){
            console.log(responseBody);
            var booksObjectResponseObject = responseBody;

            callback(booksObjectResponseObject);
        });
    });

};