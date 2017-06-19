// notes
//https://stackoverflow.com/questions/30146105/react-input-defaultvalue-doesnt-update-with-state

import React from 'react';
import {render} from 'react-dom';

class ProfileContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            firstName: ""
        }

    }

    componentWillMount(){
        this.setState({user:  this.props.user });
    }

    _firstNameChange(event){
        //console.log("Firstname Change");
        //console.log ("VALUE", event.target.value);
        //var user = Object.assign(this.state.user);
        //user.firstName = event.target.value;
        //this.setState({user: user});

        //this.setState({firstName: event.target.value});

    }

    render(){
        //this.state.firstName = this.state.firstName || this.props.user.firstName;

        return(
        <div id="profile-container" className="div-hidden">
            <header>Profile</header>
            <form id="profileForm">
                <input id="username" name="username" type="text" disabled value={this.props.user.username || ""} />
                <input id="password" name="password" type="password" placeholder="Password"/>

                <input id="firstName" name="firstName" type="text" 
                    ref="firstName" 
                    placeholder="First Name"
                    defaultValue={  this.props.user.firstName || "" } 
                    //onChange={this._firstNameChange.bind(this)}
                />
                <input id="lastName"  name="lastName"  type="text" defaultValue={this.state.user.lastName  || ""}  placeholder="Last Name" />

            <button type="button" className="btn" onClick={ this.props.updateProfileClick() } >Submit</button>
            </form>
        </div>
        )}
}


export default ProfileContainer;