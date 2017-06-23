//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';


//Trade request Card
import TradeRequestCard     from './../book/TradeRequestCard.jsx';



class LibraryContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            user: {},
            tradeRequestBook: null
        }
        
        this._sendUserMessage   = this._sendUserMessage.bind(this);
        this._promptForTradeRequestYesClick = this._promptForTradeRequestYesClick.bind(this);
    };




    componentWillMount(){
        //Set the user
        this._getLibraryContents(this.props.user);
        //this.setState({tradeRequestBook: null});    
    }


    componentWillReceiveProps(newProps){
        if (this.props.filterUser != newProps.filterUser){
            this._getLibraryContents(newProps.filterUser);
            this.setState({filterUser: newProps.filterUser});
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


    _getLibraryContents(user){        
        //console.log("Get Library Contents");
        this.setState({"books":[]});
        
        if(user.type != "user"){
            user.username = undefined;
        }

        jQuery.ajax({
            method: 'GET',
            url:("/api/library"),
            data: {"username": user.username},
            success: (rawResult)=>{
                //console.log(rawResult);
                var booksArray = JSON.parse(rawResult);
                if (booksArray.length > 0 ){
                    //console.log(booksArray );
                    this.setState({"books": booksArray});
                }
            },
            dataType: "text",
            contentType : "application/json"
        });
    }


    _promptForTradeRequest(book){
        this.setState({tradeRequestBook: book});
        //jQuery("#tradeRequest-card")
        //    .attr("class", "div-visible");
    }


    _promptForTradeRequestYesClick(){
        console.log("promptForTradeRequestYesClick");
        var book = this.state.tradeRequestBook;
        book.usersRequestingTrade.push( this.props.user );
        //Message stuff
        let _this = this;
        var userMessageToBookOwner = { 
            user: book.owner,
            message: "New Trade Request for - "+ book.title
        };



        jQuery.ajax({
            method: 'POST',
            url:("/api/trade"),
            data: JSON.stringify(book),
            contentType: 'application/json', // for request
            dataType: "text",
            success: function(){
                jQuery("#tradeRequest-card")
                    .attr("class", "div-hidden");
                _this._sendUserMessage( userMessageToBookOwner );
                alert(`New Trade Request for - ${book.title} has been submitted`);
                _this.setState({tradeRequestBook: null});
            }
        });
    }


    _bookClicked(book){
        console.log("Book Clicked in the Library");
        //console.log(book);
        if(this.props.user && (this.props.user.type == "user" )){
            console.log(book);
            if(book.owner.username === this.props.user.username ){
                //console.log("book owned by user");
                alert("This book is in your Library already");
            }else{
                //window.confirm("Want to submit a trade request?");
                if(book != this.state.tradeRequestBook){
                    this._promptForTradeRequest(book);
                }
            }
        }
    }

    render(){
        return (
        <div>
            {this.props.filterUser.username &&
                <b> My Books</b>
            }
            {this.props.filterUser.type == "all" &&
                <b> Whole Library </b>
            }

            {this.state.tradeRequestBook &&
                <TradeRequestCard 
                    tradeRequestBook={this.state.tradeRequestBook} 
                    user={this.props.user} 
                    promptForTradeRequestYesClick={() => this._promptForTradeRequestYesClick.bind(this)}
                />
            }

            <div className="row found-books">

                {this.state.books.map((book, i )=> {
                    return (
                    <div key={i} className="col l2 m4 s12 ">
                        <a href="#" onClick={()=> this._bookClicked(book) }>
                        {book.thumbnailUrl &&
                            <img src={book.thumbnailUrl} 
                                alt={book.title} 
                                className="book-smallThumbnail"
                            />
                        }
                        </a>
                    </div>
                    )
                })}

            </div>

        </div>
        )
    };
}


export default LibraryContainer;