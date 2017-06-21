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
            user: {}
        }

    };

    _getLibraryContents(){
        
        console.log("Get Library Contents");
        
        jQuery.ajax({
            method: 'GET',
            url:("/api/library"),
            data: {"user": this.props.user},
            success: (rawResult)=>{
                //console.log(rawResult);

                var booksArray = JSON.parse(rawResult);
                if (booksArray.length > 0 ){
                    console.log(booksArray );
                    this.setState({"books": booksArray});
                }
            }
        });
    }

    componentWillMount(){
        //Set the user
        if(this.props.user && this.props.user.username){
            this.setState({user: this.props.user.username});
        }else{
            this.setState({user: "jim"});
        }


        this._getLibraryContents();
    }

    render(){
        return (
        <div>
            <header>{ (this.state.user).toUpperCase() }'s Library</header>

            {(this.state.books.length > 0) && 
            <div className="row found-books" >

                {console.log(this.state.books)}
                {this.state.books.map((book, i )=> {
                    return (
                    <div key={i} className="col l2 m4 s12 ">
                        <a onClick={console.log("Book Clicked in the Library") }>
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
            }

        </div>
        )
    };
}


export default LibraryContainer;