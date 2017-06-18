// notes
//https://stackoverflow.com/questions/30146105/react-input-defaultvalue-doesnt-update-with-state

import React from 'react';
import {render} from 'react-dom';

class ProfileContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user
        }

    }

    componentWillMount(){
        this.setState({user: this.props.user});
    }

    _firstNameChange(){

        console.log("Firstname Change");
        
    }

    render(){
        return(
        <div id="profile-container" className="div-visible">
            <header>Profile</header>
            <form id="profileForm">
                <input id="username" name="username" type="text" disabled value={this.props.user.username || ""} />
                <input id="password" name="password" type="password" placeholder="Password"/>

                <input id="firstName" name="firstName" type="text" 
                    ref="firstName"
                    value={this.state.user || ""}
                    onChange={this._firstNameChange.bind(this)} 
                    placeholder="First Name"
                />
                <input id="lastName"  name="lastName"  type="text" defaultValue={this.state.user.lastName  || ""}  placeholder="Last Name" />

            <button type="button" className="btn" onClick={ this.props.updateProfileClick() } >Submit</button>
            </form>
        </div>
        )}
}


export default ProfileContainer;