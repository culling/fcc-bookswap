class SignupContainer extends React.Component{
    constructor(props){
        super();

    }
    objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }

    render(){
        return(
        <div id="signup-container" className="div-hidden">
            <header>Sign Up</header>
            <form id="signupForm">
                <input id="username" name="username" type="text" placeholder="Username"/>
                <input id="password" name="password" type="password" placeholder="Password"/>
                <input id="email"    name="email"    type="email" placeholder="Email"/>
                
            <button type="button" className="btn" onClick={this.props.onClick() } >Submit</button>
            </form>
        </div>
        )}
}

export default SignupContainer;
