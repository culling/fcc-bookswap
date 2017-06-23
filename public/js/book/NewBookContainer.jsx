//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';

class NewBookContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            foundBooks: []

        }

        //Binding to this for functions
        this._addNewBook        = this._addNewBook.bind(this);
        this._sendUserMessage   = this._sendUserMessage.bind(this);
    };

    componentWillReceiveProps(newProps){
        if (this.props.user != newProps.user){
            this.setState({user: newProps.user});
        }
    }
    
    _sendUserMessage(newStateDiff) {
        this.sendUserMessageToDB(newStateDiff);
        // 2. put diffs onto the websocket
        this.postToSocket(newStateDiff);

    }

    postToSocket(newStateDiff) {
        socket.emit('new state', newStateDiff);
    }

    sendUserMessageToDB(newStateDiff) {
        jQuery.ajax({
            type: "POST",
            url: "/api/users/messages",
            data: JSON.stringify( newStateDiff ),
            success: function(){
                console.log("message sent to db");
            },
            dataType: "text",
            contentType : "application/json"
        });        

        console.log(newStateDiff);
        console.log("Save to DB called");
    }
    //End _sendUserMessage


    _findBookClicked(event){
        event.preventDefault();
        console.log("Find Book Clicked");
        var bookTitle = jQuery("#title").val();
        jQuery.ajax({
            method: 'GET',
            url:("/api/book"),
            data: {"title": bookTitle},
            success: (rawResult)=>{
                var resultObject = JSON.parse(rawResult);
                var booksArray = resultObject.items
                if (booksArray.length > 0 ){
                    //console.log(booksArray );
                    var filteredBooksArray = booksArray.filter((foundBook) => {
                        //console.log(foundBook.volumeInfo.imageLinks)
                        return (foundBook.volumeInfo.imageLinks !== undefined)
                    });
                    console.log(filteredBooksArray);
                    this.setState({"foundBooks": filteredBooksArray});
                }
           }
        });
    }



    _addNewBook(newBook){
        //event.preventDefault();
        let _this = this;

        console.log("Find Book Clicked");
        //console.log(JSON.stringify(newBook) );
        console.log(newBook);
        var userMessage = {user:  this.props.user,
            message: "New Book added - "+ newBook.volumeInfo.title
        };

        jQuery.ajax({
            method: 'POST',
            url:("/api/book"),
            data: JSON.stringify(newBook),
            contentType: 'application/json', // for request
            dataType: 'text',
            success: function(){
                jQuery("#title")
                    .val("");
                _this.setState({foundBooks: []});
                _this._sendUserMessage(userMessage);
            }
        });
        

    }


    render(){
        return (
        <div>
            <header>Add a New Book</header>
            <form id="newBookForm"  onSubmit={this._findBookClicked.bind(this) }>
                <input type="text" name="title" id="title" placeholder="Title" />
                <button type="button" className="btn" onClick={this._findBookClicked.bind(this)}>Find Book</button>
            </form>

            <div className="row found-books" >
                {this.state.foundBooks.map((foundBook, i )=> {
                    return (
                    <div key={i} className="col l2 m4 s12 ">
                        <a onClick={()=>this._addNewBook(foundBook)}>
                        {foundBook.volumeInfo.imageLinks &&
                            <img src={foundBook.volumeInfo.imageLinks.smallThumbnail || foundBook.volumeInfo.imageLinks.thumbnail} 
                                alt={foundBook.volumeInfo.title} 
                                className="book-smallThumbnail"
                            />
                        }
                        </a>
                    </div>
                    )
                }) }
            </div>

        </div>
        )
    };
}


export default NewBookContainer;