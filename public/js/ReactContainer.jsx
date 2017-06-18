// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

 
import React from 'react';
import {render} from 'react-dom';

import HeaderContainer  from './partials/HeaderContainer.jsx';
import LoginContainer   from './user/LogInContainer.jsx';
import SignupContainer  from './user/SignupContainer.jsx';
/*
*/
import ProfileContainer  from './user/ProfileContainer.jsx';

class ReactContainer extends React.Component{

    constructor(props){
        super();

        this.state = {
            user:[]
        }

        //Binding to this for functions
        this._loginClick        = this._loginClick.bind(this);
        this._signupForm        = this._signupForm.bind(this);
        this._logOutClick       = this._logOutClick.bind(this);
        this._updateProfileClick = this._updateProfileClick.bind(this);

    };

    componentWillMount(){
        this._getUser.bind(this);
    };


    _objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    };


    _signupForm(){
        let _this = this;
        var formDataSerializedArray = jQuery("#signupForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "POST",
            url: "api/users",
            data: JSON.stringify(formDataObject ),
            success: function(){

            },
            dataType: "text",
            contentType : "application/json"
        });
    };

    _loginClick(){
        let _this = this;
        var formDataSerializedArray = jQuery("#loginForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        jQuery.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify(formDataObject),
            success: function(){
                _this._getUser();
            },
            statusCode:{
                400:function(){
                    alert("Login Failed");
                },
                401: function(){
                    alert("Username or password incorrect");
                }
            },
            dataType: "text",
            contentType : "application/json"
        });
    };

    _logOutClick(){
        let _this = this;
        jQuery.ajax({
            type: "GET",
            url: "/logout",
            success: function(){
                console.log("Success from LogOut");
                _this._getUser();
            },
            dataType: "text",
            contentType : "application/json"
        });
    };

    _updateProfileClick(){
        let _this = this;
        var formDataSerializedArray = jQuery("#profileForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        console.log(JSON.stringify( formDataObject ));
        jQuery.ajax({
            type: "PUT",
            url: "api/users",
            data: JSON.stringify(formDataObject ),
            success: function(){
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
                console.log("User");
                console.log(user);
                this.setState({ user: user });
            }
        });
        jQuery("#login-container")
            .attr("class", "div-hidden");
        jQuery("#signup-container")
            .attr("class", "div-hidden");
    };



    render(){
        return(

            <div>
                <HeaderContainer  user={this.state.user}  logOutClick={() => this._logOutClick.bind(this) } />
                <SignupContainer  onClick={()=> this._signupForm.bind(this)}/>
                <LoginContainer   logInClick={()=> this._loginClick.bind(this) } />  
                <ProfileContainer user={this.state.user} updateProfileClick={() => this._updateProfileClick.bind(this) } />
  
            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));