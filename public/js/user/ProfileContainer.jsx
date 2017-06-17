class ProfileContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user
        }

    }

    componentWillMount(){

    }

    render(){
        return(
        <div id="profile-container" className="div-visible">
            <header>Profile</header>
            <form id="profileForm">
                <input id="username" name="username" type="text" disabled value={this.props.user.username || ""} />
                <input id="password" name="password" type="password" placeholder="Password"/>

                <input id="firstName" name="firstName" type="text" defaultValue={this.state.user.firstName} placeholder="First Name"/>
                <input id="lastName"  name="lastName"  type="text" defaultValue={this.state.user.firstName} placeholder="Last Name"/>

            <button type="button" className="btn" onClick={ this.props.updateProfileClick() } >Submit</button>
            </form>
        </div>
        )}
}


export default ProfileContainer;