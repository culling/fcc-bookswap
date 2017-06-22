//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';

class LibraryContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            user: {},
            tradeRequestBook: null
        }

    };

    _getLibraryContents(user){        
        console.log("Get Library Contents");
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
                    console.log(booksArray );
                    this.setState({"books": booksArray});
                }
            },
            dataType: "text",
            contentType : "application/json"

        });
    }

    componentWillMount(){
        //Set the user
        this._getLibraryContents(this.props.user);
    }


    componentWillReceiveProps(newProps){
        if (this.props.filterUser != newProps.filterUser){
            this._getLibraryContents(newProps.filterUser);
            this.setState({filterUser: newProps.filterUser});
        }
    }

    _promptForTradeRequest(book){
        this.setState({tradeRequestBook: book});
    }

    _promptForTradeRequestYesClick(book){
        console.log("promptForTradeRequestYesClick");
    }

    _promptForTradeRequestNoClick(book){
        console.log("promptForTradeRequestNoClick");
    }
    

    _bookClicked(book){
        console.log("Book Clicked in the Library");
        //console.log(book);
        if(this.props.user && (this.props.user.type == "user" )){
            console.log(book);
            if(book.owner.username === this.props.user.username ){
                console.log("book owned by user");
            }else{
                //window.confirm("Want to submit a trade request?");
                this._promptForTradeRequest(book);
            }
        }
    }

    render(){
        return (
        <div>
            {this.props.filterUser.username &&
                <header>{ (this.props.user.username).toUpperCase() }'s Library</header>
            }

            {this.state.tradeRequestBook &&
            <div id="tradeRequest-card" className="card">
                <div className="row">
                    <div className="col s3">
                        <img src={this.state.tradeRequestBook.thumbnailUrl} 
                            alt={this.state.tradeRequestBook.title} 
                            className="book-smallThumbnail"
                        />
                    </div>
                    <div className="col s9 card-content" id="tradeRequest-card-text">
                        <br />
                        <div id="tradeRequest-card-heading" ><b>Submit a Trade Request</b> </div>
                        <br />
                        

                        <div className="row"><b>{this.state.tradeRequestBook.title}</b></div>
                        Authors <br />
                        {this.state.tradeRequestBook.authors.map((author, i) =>{return <li key={i} >{author}</li>} ) }

                        <button className="btn" onClick={() => this._promptForTradeRequestYesClick(this.state.tradeRequestBook)}> Yes </button>
                        <button className="btn" onClick={() => this._promptForTradeRequestNoClick(this.state.tradeRequestBook)} > No  </button>
                        <br />
                    </div>
                </div>
            </div>
            }

            <div className="row found-books">

                {this.state.books.map((book, i )=> {
                    return (
                    <div key={i} className="col l2 m4 s12 ">
                        <a onClick={()=> this._bookClicked(book) }>
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