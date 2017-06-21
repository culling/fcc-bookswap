import React from 'react';
import {render} from 'react-dom';

class HeaderContainer extends React.Component{
    constructor(props){
        super();
        this.state = {
            user:[]
        }
    }

    componentWillMount(){

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

    render(){
        return(
            <div>
                <div className="row">
                    <button className="btn" onClick={ this._homeClicked.bind(this)}>Home</button>
                    <button className="btn" onClick={ this._signUpClicked.bind(this)}>Sign Up</button>
                    <button className="btn" onClick={ this._loginClicked.bind(this)}>Log In</button>
                    <button className="btn" onClick={ this.props.logOutClick() }>Log Out</button>
                    <button className="btn" onClick={ this._profileClicked.bind(this)}>Profile</button>
                    <button className="btn" onClick={ this._booksClicked.bind(this) }>Books</button>
                    
                    <span   className="logo"> Welcome {this.props.user.username} </span>
                </div>
                
            </div>
        )
    }
}

export default HeaderContainer;

