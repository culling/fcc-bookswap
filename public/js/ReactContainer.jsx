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

        //Binding to this for functions
        this._loginClick = this._loginClick.bind(this);
    }

    componentWillMount(){
        this._getUser.bind(this);
    }


    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }


    _loginClick(){
        let _this = this;
        var formDataSerializedArray = jQuery("#signinForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        //console.log(JSON.stringify( formDataObject ));
        //console.log("Login Clicked");
        jQuery.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify(formDataObject),
            success: function(result,status,xhr){
                //console.log("Success from Login Container");
                _this._getUser();
            },
            dataType: "text",
            contentType : "application/json"
        });
    }

    _getUser(){
        //User
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{
                console.log("Called - GetUser");
                this.setState({ user: user });
            }
        });
    }



    render(){
        return(
            <div>
                <HeaderContainer  user={this.state.user}/>
                <SignupContainer  />
                <LoginContainer   getUser={()=> this._loginClick.bind(this) } />

            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));