import React from 'react';
import {render} from 'react-dom';

class MessageCollectionItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    };



    _dismissMessage(message){
        console.log("Dismiss Message Clicked");
        var newStateDiff = {
            user: this.props.user,
            message: message
        }
        jQuery.ajax({
            type: "DELETE",
            url: "/api/users/messages",
            data: JSON.stringify( newStateDiff ),
            success: function(){
                console.log("Delete message sent to db");

                //
                socket.emit('new state', {message: "deleted message"});
            },
            dataType: "text",
            contentType : "application/json"
        });


    }

    render(){
        return(
            <li className="collection-item">
                {this.props.message}
                <a href="#!" className="secondary-content"><i className="material-icons" onClick={() => this._dismissMessage(this.props.message) } >send</i></a>
            </li>
        )
    }
}


export default MessageCollectionItem;