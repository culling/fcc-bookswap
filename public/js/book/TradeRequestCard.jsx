//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';

class TradeRequestCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            user: this.props.user,
            tradeRequestBook: this.props.tradeRequestBook
        }

        //Binding to this for functions
        this._sendUserMessage   = this._sendUserMessage.bind(this);

    };


    
    componentWillReceiveProps(newProps){
        if (this.props.tradeRequestBook != newProps.tradeRequestBook){
            this.setState({tradeRequestBook: newProps.tradeRequestBook});
            jQuery("#tradeRequest-card")
                .attr("class", "div-visible");
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


    /*
    _promptForTradeRequestYesClick(book){
        console.log("promptForTradeRequestYesClick");

        book.usersRequestingTrade.push( this.props.user );
        //Message stuff
        let _this = this;
        var userMessageToBookOwner = { 
            user: book.owner,
            message: "New Trade Request for - "+ book.title
        }

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
            }
        });
      


    }
  */

    _promptForTradeRequestNoClick(book){
        console.log("promptForTradeRequestNoClick");
        jQuery("#tradeRequest-card")
            .attr("class", "div-hidden");
    }
    

    render(){
        return (
            <div id="tradeRequest-card">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={this.state.tradeRequestBook.thumbnailUrl} 
                            alt={this.state.tradeRequestBook.title} 
                            className="book-smallThumbnail"
                        />
                    </div>
                    <div className="card-stacked" id="tradeRequest-card-text">
                        <div className="card-content" >
                            <div><b>Submit a Trade Request</b></div>
                            <div><b>{this.state.tradeRequestBook.title}</b></div>
                            <div>Authors</div>
                            {this.state.tradeRequestBook.authors.map((author, i) =>{return <li key={i} >{author}</li>} ) }
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={this.props.promptForTradeRequestYesClick() }> Yes </a>
                            <a href="#" onClick={() => this._promptForTradeRequestNoClick(this.state.tradeRequestBook)} > No  </a>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    };
}


export default TradeRequestCard;