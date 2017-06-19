import React from 'react';
import {render} from 'react-dom';

class BooksHeaderContainer extends React.Component{
    constructor(props){
        super();
        this.state = {
            
        }
    }

    componentWillMount(){

    }
    _newBookClicked(){
        console.log("new Book Clicked");
        jQuery("#newbook-container")
            .toggleClass("div-hidden")

    }


    render(){
        return(
                <div className="row">
                    <button className="btn" onClick={this._newBookClicked.bind(this)}>New Book</button>
                </div>
        )
    }
}

export default BooksHeaderContainer;