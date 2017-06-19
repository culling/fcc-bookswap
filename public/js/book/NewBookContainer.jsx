//https://developers.google.com/books/docs/v1/using#PerformingSearch
//    https://www.googleapis.com/books/v1/volumes?q=search+terms

import React from 'react';
import {render} from 'react-dom';

class NewBookContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {


        }
    };




    render(){
        return (
        <div>
            <input type="text" name="book" placeholder="New Book" />
        </div>
        )
    };


}


export default NewBookContainer;