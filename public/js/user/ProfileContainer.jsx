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


    render(){
        return(
        <div id="profile-container" className="div-hidden">
            <header>Profile</header>
            <form id="profileForm">
                <input id="username" name="username" 
                    type="text" disabled
                    value={this.props.user.username || ""} 
                />

                <input id="password" name="password" 
                    type="password" placeholder="Password"
                />

                <input id="firstName" name="firstName" 
                    type="text" placeholder="First Name" 
                    defaultValue={  this.props.user.firstName || "" } 
                />
                
                <input id="lastName"  name="lastName"
                  type="text"  placeholder="Last Name"
                  defaultValue={this.state.user.lastName  || ""} 
                />

                <input id="city"  name="city"
                  type="text"  placeholder="City"
                  defaultValue={this.state.user.city  || ""} 
                />

                <input id="state"  name="state"
                  type="text"  placeholder="State"
                  defaultValue={this.state.user.state  || ""} 
                />

                <input id="country"  name="country"
                  type="text"  placeholder="Country"
                  defaultValue={this.state.user.country  || ""} 
                />



            <button type="button" className="btn" onClick={ this.props.updateProfileClick() } >Submit</button>
            </form>
        </div>
        )}
}


export default ProfileContainer;