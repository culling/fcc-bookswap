import React from 'react';
import {render} from 'react-dom';

class BooksHeaderContainer extends React.Component{
    constructor(props){
        super(props);
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

    _myLibraryClicked(){
        console.log("new Book Clicked");
        jQuery("#allLibrary-container")
            .attr("class", "div-hidden");

        jQuery("#myLibrary-container")
            .toggleClass("div-hidden");
    }


    _allLibraryClicked(){
        console.log("new Book Clicked");
        jQuery("#myLibrary-container")
            .attr("class", "div-hidden");

        jQuery("#allLibrary-container")
            .toggleClass("div-hidden");
    }


    render(){
        return(
                <div className="row">
                    {(this.props.user && (this.props.user.type==="user")) &&
                    <div id="user-library-buttons"> 
                        <button className="btn" onClick={this._myLibraryClicked.bind(this)}>My Library</button>
                        <button className="btn" onClick={this._allLibraryClicked.bind(this)}>Whole Library</button>
                    </div>
                    }
                    {/*<button className="btn" onClick={this._newBookClicked.bind(this)}>New Book</button>*/}
    
                </div>
        )
    }
}

export default BooksHeaderContainer;