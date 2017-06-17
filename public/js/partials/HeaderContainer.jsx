class HeaderContainer extends React.Component{
    constructor(props){
        super();
        this.state = {
            user:[]
        }
    }

    componentWillMount(){
        //this._getUser();
    }
/*
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
*/
    _signUpClicked(){
        console.log("signup Clicked");
        jQuery("#signup-container")
            .toggleClass("div-hidden");
        jQuery("#login-container")
            .attr("class", "div-hidden");
        
    }

    _loginClicked(){
        console.log("login Clicked");
        
        jQuery("#login-container")
            .toggleClass("div-hidden")
        jQuery("#signup-container")
            .attr("class", "div-hidden");
        //window.location = "/login";
    }


    _logOutClicked(){
        jQuery.ajax({
            type: "GET",
            url: "/logout",
            success: function(){
                console.log("Success from LogOut");
                //this.props._getUser;
                window.location = "/";
            },
            dataType: "json",
            contentType : "application/json"
        });

    }



    render(){
        return(
            <div>
                <h1>Free Code Camp - Manage a Book Trading Club</h1>
                <a href="https://www.freecodecamp.com/challenges/manage-a-book-trading-club">
                    https://www.freecodecamp.com/challenges/manage-a-book-trading-club
                </a>
                <div className="row">
                    <button className="btn" onClick={this._signUpClicked.bind(this)}>Sign Up</button>
                    <button className="btn" onClick={this._loginClicked.bind(this)}>Log In</button>
                    <button className="btn" onClick={this._logOutClicked.bind(this)}>Log Out</button>

                </div>
                <div><h5> Welcome {this.props.user.username} </h5></div>
                
            </div>
        )
    }
}

export default HeaderContainer;

