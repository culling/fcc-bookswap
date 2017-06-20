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

    _signUpClicked(){
        console.log("signup Clicked");
        jQuery("#signup-container")
            .toggleClass("div-hidden");
        jQuery("#login-container")
            .attr("class", "div-hidden");
        jQuery("#profile-container")
            .attr("class", "div-hidden");
    }

    _loginClicked(){
        console.log("login Clicked");
        jQuery("#login-container")
            .toggleClass("div-hidden")
        jQuery("#signup-container")
            .attr("class", "div-hidden");
        jQuery("#profile-container")
            .attr("class", "div-hidden");
    }

    _profileClicked(){
        console.log("Profile Clicked");
        jQuery("#signup-container")
            .attr("class", "div-hidden");
        jQuery("#login-container")
            .attr("class", "div-hidden");
        jQuery("#profile-container")
            .toggleClass("div-hidden");
    }

    render(){
        return(
            <div>
                <h6>Free Code Camp - Manage a Book Trading Club</h6>
                <a href="https://www.freecodecamp.com/challenges/manage-a-book-trading-club">
                    https://www.freecodecamp.com/challenges/manage-a-book-trading-club
                </a>
                <div className="row">
                    <button className="btn" onClick={this._signUpClicked.bind(this)}>Sign Up</button>
                    <button className="btn" onClick={this._loginClicked.bind(this)}>Log In</button>
                    <button className="btn" onClick={ this.props.logOutClick() }>Log Out</button>
                    <button className="btn" onClick={this._profileClicked.bind(this)}>Profile</button>
                    <span   className="welcome"> Welcome {this.props.user.username} </span>
                </div>
                
            </div>
        )
    }
}

export default HeaderContainer;

