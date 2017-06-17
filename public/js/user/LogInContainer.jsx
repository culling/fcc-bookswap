class LogInContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:[]
        }
    }

    componentWillMount(){
        //this.props._getUser();
    }


    objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }

    _submitForm(){
        var formDataSerializedArray = jQuery("#signinForm").serializeArray();
        var formDataObject = this.objectifyForm(formDataSerializedArray);
        console.log(JSON.stringify( formDataObject ));
        console.log("Login Clicked");

        jQuery.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify(formDataObject),
            success: function(){
                console.log("Success from Login Container");
                this.props._getUser;
                window.location = "/";
            },
            dataType: "json",
            contentType : "application/json"
        });
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

    render(){
        return(
        <div id="login-container" className="div-hidden">
            <header>Log In</header>
            <form id="signinForm">
                <input id="username" name="username" type="text" placeholder="Username"/>
                <input id="password" name="password" type="password" placeholder="Password"/>   
            <button type="button" className="btn" onClick={this._submitForm.bind(this)} >Submit</button>
            </form>
        </div>
        )}
}

export default LogInContainer;
