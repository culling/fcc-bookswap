//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms
// example - https://www.googleapis.com/books/v1/volumes?q=intitle:people

import React from 'react';
import {render} from 'react-dom';

class LibraryContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            books: []
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
        if (this.props.user != newProps.user){
            this._getLibraryContents(newProps.user);
        }
    }


    render(){
        return (
        <div>
            {this.props.user.username &&
                <header>{ (this.props.user.username).toUpperCase() }'s Library</header>
            }


            <div className="row found-books">

                {this.state.books.map((book, i )=> {
                    return (
                    <div key={i} className="col l2 m4 s12 ">
                        <a onClick={()=> {console.log("Book Clicked in the Library")} }>
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