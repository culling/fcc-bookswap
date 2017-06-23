// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state

 
import React from 'react';
import {render} from 'react-dom';

//Partials
import HeaderContainer      from './partials/HeaderContainer.jsx';
import HomePanel            from './partials/HomePanel.jsx';
//import BooksHeaderContainer from './partials/BooksHeaderContainer.jsx';


//User
import LoginContainer       from './user/LogInContainer.jsx';
import SignupContainer      from './user/SignupContainer.jsx';
import ProfileContainer     from './user/ProfileContainer.jsx';


//Books
import BooksContainer       from './book/BooksContainer.jsx';
//import NewBookContainer     from './book/NewBookContainer.jsx';
//import LibraryContainer     from './book/LibraryContainer.jsx';


class ReactContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            user:[],
            activeContainer: "#home-panel"
        }

        //Binding to this for functions
        this._loginClick        = this._loginClick.bind(this);
        this._signupForm        = this._signupForm.bind(this);
        this._logOutClick       = this._logOutClick.bind(this);
        this._updateProfileClick = this._updateProfileClick.bind(this);
        this._hideAllContainers = this._hideAllContainers.bind(this);
    };

    componentWillMount(){
        this._getUser.bind(this);
        socket.on('new state', function(newState) {
            console.log("new state found");
            //this.setState(newState);
            this._getUser();
        }.bind(this));

    }


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
                jQuery("#messages-container").append(
                    `<ul id="signup-message" class="collection">
                        <li class="collection-item">Signup Complete - Login with your username and password</li>
                    </ul>`
                )
                _this._hideAllContainers();
                jQuery("#login-container")
                    .attr("class", "div-visible");
            },
            dataType: "text",
            contentType : "application/json"
        });
    };

    _loginClick(){
        let _this = this;
        this.setState({activeContainer: "#login-container"});

        var formDataSerializedArray = jQuery("#loginForm").serializeArray();
        var formDataObject = this._objectifyForm(formDataSerializedArray);
        jQuery.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify(formDataObject),
            success: function(){
                jQuery("#signup-message").remove() ;
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
        console.log("logout Clicked");

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

    _hideAllContainers(){
        jQuery("#signup-container")
            .add("#login-container")
            .add("#profile-container")
            .add("#home-panel")
            .add("#books-container")
            .attr("class", "div-hidden");
    }

    _getUser(){
        //User
        jQuery.ajax({
            method: 'GET',
            url:"/api/user",
            success: (user)=>{

                this.setState({ user: user });


                //Active Container to switch away from sign in
                // Work in progress
                if (this.state.activeContainer == "#login-container"){
                    this.setState({activeContainer: "#home-panel"});
                    this._hideAllContainers();
                    jQuery("#home-panel")
                        .attr("class", "div-visible");
                    }
            }
            
        });
    };



    render(){
        return(

            <div>
                <HeaderContainer  user={this.state.user}  logOutClick={ () => this._logOutClick.bind(this) } />
                <HomePanel user={this.state.user} />

                <SignupContainer  onClick={()=> this._signupForm.bind(this)}/>
                <LoginContainer   logInClick={()=> this._loginClick.bind(this) } />  


                {(this.state.user.type == "user" ) &&
                    <ProfileContainer user={this.state.user} updateProfileClick={() => this._updateProfileClick.bind(this) } />
                }

                <BooksContainer user={this.state.user} />


            </div>
        )
    }

}


render(<ReactContainer />, document.getElementById('react-container'));