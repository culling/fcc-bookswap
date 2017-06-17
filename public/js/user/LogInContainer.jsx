class LogInContainer extends React.Component{
    componentWillMount(){
        this.props.getUser();
    }

    render(){
        return(
        <div id="login-container" className="div-hidden">
            <header>Log In</header>
            <form id="signinForm">
                <input id="username" name="username" type="text" placeholder="Username"/>
                <input id="password" name="password" type="password" placeholder="Password"/>   
            <button type="button" className="btn" onClick={ this.props.getUser() } >Submit</button>
            </form>
        </div>
        )}
}

export default LogInContainer;
