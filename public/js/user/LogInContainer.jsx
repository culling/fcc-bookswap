import React from 'react';
import {render} from 'react-dom';

class LogInContainer extends React.Component{
    componentWillMount(){

    }

    render(){
        return(
        <div id="login-container" className="div-hidden">
            <header>Log In</header>
            <form id="loginForm">
                <input id="username" name="username" type="text" placeholder="Username"/>
                <input id="password" name="password" type="password" placeholder="Password"/>   
            <button type="button" className="btn" onClick={ this.props.logInClick() } >Submit</button>
            </form>
        </div>
        )}
}

export default LogInContainer;
