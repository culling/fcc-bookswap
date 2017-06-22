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
            user: {},
            tradeRequestBook: this.props.tradeRequestBook
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

        

        jQuery("#tradeRequest-card")
            .attr("class", "div-hidden");

    }

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
                            <a href="#" onClick={() => this._promptForTradeRequestYesClick(this.state.tradeRequestBook)}> Yes </a>
                            <a href="#" onClick={() => this._promptForTradeRequestNoClick(this.state.tradeRequestBook)} > No  </a>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    };
}


export default TradeRequestCard;