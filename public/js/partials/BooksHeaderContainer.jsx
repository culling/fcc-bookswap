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

    _hideAllContainers(){
        jQuery("#allLibrary-container")
            .add("#myLibrary-container")
            .add("#trades-container")
            .attr("class", "div-hidden");
    }

    _myLibraryClicked(){
        this._hideAllContainers();
        jQuery("#myLibrary-container")
           .attr("class", "div-visible");
    }


    _allLibraryClicked(){
        this._hideAllContainers();
        jQuery("#allLibrary-container")
           .attr("class", "div-visible");
    }

    _tradesClicked(){
        this._hideAllContainers();
        jQuery("#trades-container")
           .attr("class", "div-visible");
        
    }


    render(){
        return(
                <div className="row">
                    {(this.props.user && (this.props.user.type==="user")) &&
                    <div id="user-library-buttons"> 
                        <button className="btn" onClick={this._myLibraryClicked.bind(this)}>My Library</button>
                        <button className="btn" onClick={this._allLibraryClicked.bind(this)}>Whole Library</button>
                        <button className="btn" onClick={this._tradesClicked.bind(this)}>Trades</button>
                    </div>
                    }
    
                </div>
        )
    }
}

export default BooksHeaderContainer;