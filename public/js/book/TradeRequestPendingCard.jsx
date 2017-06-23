//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';

class TradeRequestPendingCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            user: this.props.user,
            tradeRequestBook: this.props.tradeRequestBook,
            userRequestingTrade: this.props.userRequestingTrade
        }
    };


    
    componentWillReceiveProps(newProps){
        if (this.props.tradeRequestBook != newProps.tradeRequestBook){
            this.setState({tradeRequestBook: newProps.tradeRequestBook});
            jQuery("#tradeRequest-card")
                .attr("class", "div-visible");
        }
    }


    _promptForTradeRequestYesClick(book){
        console.log("promptForTradeRequestYesClick");

        book.owner = ( this.props.userRequestingTrade );
        book.usersRequestingTrade = [];

        jQuery.ajax({
            method: 'POST',
            url:("/api/trade"),
            data: JSON.stringify(book),
            contentType: 'application/json' // for request
        });
        jQuery("#tradeRequest-card")
            .attr("class", "div-hidden");
    }


    _cancelTradeRequestFromUser(book, user){
        //book.owner = ( this.props.userRequestingTrade );
        book.usersRequestingTrade = book.usersRequestingTrade.filter(userRequestingTrade =>{
            return (userRequestingTrade.username !== user.username);
        });

        jQuery.ajax({
            method: 'POST',
            url:("/api/trade"),
            data: JSON.stringify(book),
            contentType: 'application/json' // for request
        });
    }

    _promptForTradeRequestNoClick(book){
        console.log("promptForTradeRequestNoClick");
        this._cancelTradeRequestFromUser(book, this.props.userRequestingTrade);
        jQuery("#tradeRequest-card")
            .attr("class", "div-hidden");
    }

    _promptForTradeRequestCancelClick(book){
        console.log("promptForTradeRequestCancelClick");
        this._cancelTradeRequestFromUser(book, this.props.user );
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
                            <div> </div>
                            <div> <b>User Requesting Trade:</b> {this.props.userRequestingTrade.username }</div>
                            <div><b>{this.state.tradeRequestBook.title}</b></div>
                            <div>Authors</div>
                            {this.state.tradeRequestBook.authors.map((author, i) =>{return <li key={i} >{author}</li>} ) }
                        </div>
                        { (this.props.user && (this.props.userRequestingTrade.username !== this.props.user.username)) &&
                        <div className="card-action">
                            <a href="#" onClick={() => this._promptForTradeRequestYesClick(this.state.tradeRequestBook)}> Yes </a>
                            <a href="#" onClick={() => this._promptForTradeRequestNoClick(this.state.tradeRequestBook)} > No  </a>
                        </div>
                        }
                        { (this.props.user && (this.props.userRequestingTrade.username === this.props.user.username)) &&
                        <div className="card-action">
                            <a href="#" onClick={() => this._promptForTradeRequestCancelClick(this.state.tradeRequestBook)}> Cancel </a>
                        </div>
                        }

                    </div>
                </div>
            </div>
        )
    };
}


export default TradeRequestPendingCard;