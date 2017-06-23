
import React from 'react';
import {render} from 'react-dom';

class MessagesContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user
        }
    };

    render(){
        return(
            <div>
                Welcome User {this.props.user.username}
                {this.props.user.messages && 
                    <div>Messages</div>
                }
            </div>
        )
    }
}


export default MessagesContainer;