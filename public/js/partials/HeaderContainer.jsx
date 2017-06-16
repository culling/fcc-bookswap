class HeaderContainer extends React.Component{
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
                </div>
                <div><h5> Welcome {this.state.user.username} </h5></div>
                
            </div>
        )
    }
}

export default HeaderContainer;

