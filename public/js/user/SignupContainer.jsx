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

    _signupForm(){
        var formDataSerializedArray = jQuery("#signupForm").serializeArray();
        var formDataObject = this.objectifyForm(formDataSerializedArray);
        console.log(JSON.stringify( formDataObject ));

        jQuery.ajax({
            type: "POST",
            url: "api/users",
            data: JSON.stringify(formDataObject ),
            success: function(){},
            dataType: "json",
            contentType : "application/json"
        });

    }

    render(){
        return(
        <div id="signup-container" className="div-hidden">
            <header>Sign Up</header>
            <form id="signupForm">
                <input id="username" name="username" type="text" placeholder="Username"/>
                <input id="password" name="password" type="password" placeholder="Password"/>
                <input id="email"    name="email"    type="email" placeholder="Email"/>
                
            <button type="button" className="btn" onClick={this._signupForm.bind(this)} >Submit</button>
            </form>
        </div>
        )}
}

export default SignupContainer;
