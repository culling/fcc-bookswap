import React from 'react';
import {render} from 'react-dom';

import HeaderContainer  from './partials/HeaderContainer.jsx';
import LoginContainer   from './user/LogInContainer.jsx';
import SignupContainer  from './user/SignupContainer.jsx';


class ReactContainer extends React.Component{

    constructor(props){
        super();
        this.state = {
            user:[]
        }
    }

    componentWillMount(){
        this._getUser();
    }

    _getUser(){
        //User
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{
                this.setState({ user: user })
            }
        });
    }

    render(){
        return(
            <div>
                <HeaderContainer />
                <SignupContainer />
                <LoginContainer />

            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));