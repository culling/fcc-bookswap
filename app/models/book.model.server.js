"use strict";

var config  = require("./../../config/config");
var secrets = require("./../../config/secrets/secrets");
// mongo
var mongo               = require("mongodb").MongoClient;
var mongoPort           = config.mongoPort;
var mongoDatabase       = config.mongoDatabase;
var mongoServer         = config.mongoServer;
//var collectionName      = "users";

if(config.mongoUser){
	var mongoUser = config.mongoUser;
	var mongoUserPassword = secrets[mongoUser].password;
	var mongoUrl            =  `mongodb://${mongoUser}:${mongoUserPassword}@${mongoServer}:${mongoPort}/${mongoDatabase}`;
}else{
	var mongoUrl            =  `mongodb://${mongoServer}:${mongoPort}/${mongoDatabase}`;
}

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

var BookSchema = new Schema({
    authors: Array,
    title: String,
    owner: {type: Schema.Types.ObjectId, ref: "User" },
    thumbnailUrl: String,
    ISBN_13: String,
    ISBN_10: String,
	usersRequestingTrade: Array

});

// Compile model from schema
var BookModel       = mongoose.model('Book', BookSchema );
exports.BookModel   = BookModel;


exports.findAll = function(cb){
    BookModel.find()
	.populate("owner")
    .exec(
        function(err, results){
            if(err) return handleError(err);
            cb(results);
        }
    );
};

exports.updateBook = function(book){
	BookModel.findOne({ _id: book._id }, function (err, doc){
		doc.save();
	});
}

/*
// Example object
		{
			"kind": "books#volume",
			"id": "ioAgiBl46YsC",
			"etag": "VG3UOk9f6Wk",
			"selfLink": "https://www.googleapis.com/books/v1/volumes/ioAgiBl46YsC",
			"volumeInfo": {
				"title": "Schrodinger's Kittens",
				"subtitle": "And The Search For Reality",
				"authors": [
					"John Gribbin"
				],
				"publisher": "Hachette UK",
				"publishedDate": "2012-12-31",
				"description": "Accessible exploration of one of the most exciting areas of scientific inquiry - the nature of light. Following on from his bestseller, SCHRODINGER'S CAT, John Gribbin presents the recent dramatic improvements in experimental techniques that have enabled physicists to formulate and test new theories about the nature of light. He describes these theories not in terms of hard-to-imagine entities like spinning subnuclear particles, but in terms of the fate of two small cats, separated at a tender age and carried to opposite ends of the universe. In this way Gribbin introduces the reader to such new developments as quantum cryptography, through which unbreakable codes can be made, and goes on to possible future developments such as the idea that the Â¿entanglement' of quantum particles could be a way to build a STAR TREK style teleportation machine.",
				"industryIdentifiers": [
					{
						"type": "ISBN_13",
						"identifier": "9781780225999"
					},
					{
						"type": "ISBN_10",
						"identifier": "1780225997"
					}
				],
				"readingModes": {
					"text": true,
					"image": false
				},
				"pageCount": 272,
				"printType": "BOOK",
				"categories": [
					"Science"
				],
				"averageRating": 4,
				"ratingsCount": 1,
				"maturityRating": "NOT_MATURE",
				"allowAnonLogging": true,
				"contentVersion": "1.2.2.0.preview.2",
				"panelizationSummary": {
					"containsEpubBubbles": false,
					"containsImageBubbles": false
				},
				"imageLinks": {
					"smallThumbnail": "http://books.google.com/books/content?id=ioAgiBl46YsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
					"thumbnail": "http://books.google.com/books/content?id=ioAgiBl46YsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
				},
				"language": "en",
				"previewLink": "http://books.google.com.au/books?id=ioAgiBl46YsC&pg=PT237&dq=intitle:Schrodinger%27s+Kittens&hl=&cd=1&source=gbs_api",
				"infoLink": "https://play.google.com/store/books/details?id=ioAgiBl46YsC&source=gbs_api",
				"canonicalVolumeLink": "https://market.android.com/details?id=book-ioAgiBl46YsC"
			},
			"saleInfo": {
				"country": "AU",
				"saleability": "FOR_SALE",
				"isEbook": true,
				"listPrice": {
					"amount": 12.99,
					"currencyCode": "AUD"
				},
				"retailPrice": {
					"amount": 12.99,
					"currencyCode": "AUD"
				},
				"buyLink": "https://play.google.com/store/books/details?id=ioAgiBl46YsC&rdid=book-ioAgiBl46YsC&rdot=1&source=gbs_api",
				"offers": [
					{
						"finskyOfferType": 1,
						"listPrice": {
							"amountInMicros": 12990000,
							"currencyCode": "AUD"
						},
						"retailPrice": {
							"amountInMicros": 12990000,
							"currencyCode": "AUD"
						},
						"giftable": true
					}
				]
			},
			"accessInfo": {
				"country": "AU",
				"viewability": "PARTIAL",
				"embeddable": true,
				"publicDomain": false,
				"textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
				"epub": {
					"isAvailable": true,
					"acsTokenLink": "http://books.google.com.au/books/download/Schrodinger_s_Kittens-sample-epub.acsm?id=ioAgiBl46YsC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
				},
				"pdf": {
					"isAvailable": false
				},
				"webReaderLink": "http://play.google.com/books/reader?id=ioAgiBl46YsC&hl=&printsec=frontcover&source=gbs_api",
				"accessViewStatus": "SAMPLE",
				"quoteSharingAllowed": false
			},
			"searchInfo": {
				"textSnippet": "The central problem that we haveto explain, inorder to persuade ourselves that <br>\nwe understand the mysteries of the quantum world, is encapsulated in the story of <br>\nSchrÃ¶dinger&#39;s <b>kittens</b> that I told in the Prologue. The experiment is set up,&nbsp;..."
			}
		}
*/