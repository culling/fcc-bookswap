class HeaderContainer extends React.Component{
    constructor(props){
        super();

    }
    _signUpClicked(){
        console.log("signup Clicked");
        jQuery("#signup-container")
            .toggleClass("div-hidden")
    }

    _loginClicked(){
        console.log("login Clicked");
        /*
        jQuery("#signin-container")
            .toggleClass("div-hidden")
        */
        window.location = "/login";
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

            </div>
        )
    }
}
ReactDOM.render (
    <HeaderContainer />, document.getElementById('header-container')
)