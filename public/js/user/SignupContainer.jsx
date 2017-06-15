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

    _submitForm(){
        var formDataSerializedArray = jQuery("#signinForm").serializeArray();
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
        <div>
            <header>Sign Up</header>
            <form id="userForm">
                <input id="username" type="text" placeholder="Username"/>
                <input id="password" type="password" placeholder="Password"/>
                <input id="email"   type="email" placeholder="Email"/>
                
            <button type="button" className="btn" onClick={this._submitForm.bind(this)} >Submit</button>
            </form>
        </div>
        )}
}

ReactDOM.render (
    <SignupContainer />, document.getElementById('signup-container')
)
