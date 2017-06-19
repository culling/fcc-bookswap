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
    };

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
                        {foundBook.volumeInfo.imageLinks &&
                            <img src={foundBook.volumeInfo.imageLinks.smallThumbnail || foundBook.volumeInfo.imageLinks.thumbnail} 
                                alt={foundBook.volumeInfo.title} 
                                className="book-smallThumbnail"
                            />
                        }
                    </div>
                    )
                }) }
            </div>

        </div>
        )
    };
}


export default NewBookContainer;