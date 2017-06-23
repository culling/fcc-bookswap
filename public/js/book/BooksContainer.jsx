// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state
 
import React from 'react';
import {render} from 'react-dom';

//Partials
import BooksHeaderContainer  from './../partials/BooksHeaderContainer.jsx';

//Books
import NewBookContainer     from './../book/NewBookContainer.jsx';
import LibraryContainer     from './../book/LibraryContainer.jsx';
import TradesContainer      from './../book/TradesContainer.jsx';

class BooksContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user:{}
        }


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
                <BooksHeaderContainer user={this.props.user} />
                <div id="allLibrary-container" className="div-visible">
                    <LibraryContainer key="allLibrary"  filterUser={{type:"all"}} user={ this.props.user } />
                </div>

                {this.props.user &&
                <div id="myLibrary-container" className="div-hidden" >
                    <LibraryContainer key="myLibrary"   filterUser={this.props.user} user={this.props.user}  id="myLibrary"  />
                    <NewBookContainer user={this.props.user} />
                </div>
                }

                <div id="trades-container" className="div-hidden">
                    <TradesContainer user={this.props.user} />
                </div>


            </div>
        )
    }

}


export default BooksContainer;