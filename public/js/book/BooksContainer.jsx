// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state
 
import React from 'react';
import {render} from 'react-dom';

//Partials
import BooksHeaderContainer  from './../partials/BooksHeaderContainer.jsx';

//Books
import NewBookContainer     from './../book/NewBookContainer.jsx';
import LibraryContainer     from './../book/LibraryContainer.jsx';


class BooksContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user:{}
        }


    };

    componentWillMount(){

    };

    componentWillReceiveProps(){
        this.setState({user: this.props.user})
    }

    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };

    render(){
        return(
            <div id="books-container" className="div-hidden" >
                <BooksHeaderContainer />
                <LibraryContainer user={this.props.user} />
                <NewBookContainer />
            </div>
        )
    }

}


export default BooksContainer;