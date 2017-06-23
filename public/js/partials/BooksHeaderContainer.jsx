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
            <nav>
                <div className="row">
                    {(this.props.user && (this.props.user.type==="user")) &&
                    <ul id="user-library-buttons"> 
                        <li><button className="btn" onClick={this._myLibraryClicked.bind(this)}>My Library</button></li>
                        <li><button className="btn" onClick={this._allLibraryClicked.bind(this)}>Whole Library</button></li>
                        <li><button className="btn" onClick={this._tradesClicked.bind(this)}>Trades</button></li>
                    </ul>
                    }
    
                </div>
            </nav>
        )
    }
}

export default BooksHeaderContainer;