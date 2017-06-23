
import React from 'react';
import {render} from 'react-dom';

//MessagesCollectionItem
import MessagesCollectionItem    from './../user/MessageCollectionItem.jsx';


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
                    <ul className="collection">
                        {this.props.user.messages.map((message, i) =>{
                            return (
                                <MessagesCollectionItem key={i} message={message} />
                            )
                        })
                        }
                    </ul>
                }
            </div>
        )
    }
}


export default MessagesContainer;