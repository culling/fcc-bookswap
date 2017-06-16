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

                <div id='header-container'/>
                <div id="signup-container"  className="div-hidden"></div>
                <div id="login-container"  className="div-hidden"></div>

            </div>
        )
    }

}



ReactDOM.render (
    <ReactContainer />, document.getElementById('react-container')
)
