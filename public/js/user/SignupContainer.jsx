class SignupContainer extends React.Component{
    constructor(props){
        super();

    }

    _submitForm(){
        var formData = {
            username: jQuery("#username").val(),
            password: jQuery("#password").val(),
            email:    jQuery("#email").val(),
        }
        console.log(formData);

        jQuery.ajax({
            type: "POST",
            url: "api/users",
            data: JSON.stringify(formData),
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
                
            <button type="button" onClick={this._submitForm.bind(this)} >Submit</button>
            </form>
        </div>
        )}
}

ReactDOM.render (
    <SignupContainer />, document.getElementById('signup-container')
)
