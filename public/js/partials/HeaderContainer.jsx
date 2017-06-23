import React from 'react';
import {render} from 'react-dom';


//Messages Container
import MessagesContainer    from './../user/MessagesContainer.jsx';


class HeaderContainer extends React.Component{
    constructor(props){
        super();
        this.state = {
            user:[]
        }
    }

    componentWillMount(){
        jQuery( document ).ready(function(){
            jQuery(".button-collapse").sideNav();
        })
    }

    _hideAllContainers(){
        jQuery("#signup-container")
            .add("#login-container")
            .add("#profile-container")
            .add("#home-panel")
            .add("#books-container")
            .attr("class", "div-hidden");
    }


    _homeClicked(){
        console.log("signup Clicked");
        this._hideAllContainers();
        jQuery("#home-panel")
            .attr("class", "div-visible");   
    }

    _signUpClicked(){
        console.log("signup Clicked");

        this._hideAllContainers();

        jQuery("#signup-container")
            .attr("class", "div-visible");

        
    }

    _loginClicked(){
        console.log("login Clicked");

        this._hideAllContainers();
        
        jQuery("#login-container")
            .attr("class", "div-visible");

    }

    _profileClicked(){
        console.log("Profile Clicked");

        this._hideAllContainers();
        
        jQuery("#profile-container")
            .attr("class", "div-visible");

    }

    _booksClicked(){
        console.log("Books Clicked");

        this._hideAllContainers();        

        jQuery("#books-container")
            .attr("class", "div-visible");
        
    }

    _tradesClicked(){
        console.log("Trades Clicked");

        this._hideAllContainers();
        jQuery("#allLibrary-container")
            .add("#myLibrary-container")
            .attr("class", "div-hidden");


        jQuery("#books-container")
            .add("#trades-container")
            .attr("class", "div-visible");
        
    }


    render(){
        return(
            <div>
                <nav>
                    <div className="nav-wrapper" >
                        <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            <li  onClick={ this._signUpClicked.bind(this)}><a >Sign Up</a></li>
                            <li  onClick={ this._loginClicked.bind(this)}><a >Log In</a></li>
                            {(this.props.user.type=="user") &&
                                <li  onClick={ this.props.logOutClick() }><a >Log Out</a></li>
                            }
                            {(this.props.user.type=="user") && 
                                <li  onClick={ this._profileClicked.bind(this)}><a >Profile</a></li>
                            }
                            <li  onClick={ this._booksClicked.bind(this) }><a >Books </a></li>
                            {(this.props.user.type=="user") &&
                                <li  onClick={ this._tradesClicked.bind(this) }><a >Trades </a></li>
                            }
                        </ul>
                        <ul className="side-nav" id="mobile-menu">
                            <li  onClick={ this._homeClicked.bind(this)}><a >Home</a></li>
                            <li  onClick={ this._signUpClicked.bind(this)}><a >Sign Up</a></li>
                            <li  onClick={ this._loginClicked.bind(this)}><a >Log In</a></li>
                            {(this.props.user.type=="user") &&
                                <li  onClick={ this.props.logOutClick() }><a >Log Out</a></li>
                            }
                            {(this.props.user.type=="user") &&
                                <li  onClick={ this._profileClicked.bind(this)}><a >Profile</a></li>
                            }
                            <li  onClick={ this._booksClicked.bind(this) }><a >Books </a></li>
                            {(this.props.user.type=="user") &&
                                <li  onClick={ this._tradesClicked.bind(this) }><a >Trades </a></li>
                            }
                        </ul>                    
                        
                        
                    </div>
                </nav>
                <MessagesContainer user={this.props.user} />

            </div>
        )
    }
}

export default HeaderContainer;

