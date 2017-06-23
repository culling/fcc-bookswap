import React from 'react';
import {render} from 'react-dom';

class MessageCollectionItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    };

    render(){
        return(
            <li className="collection-item">
                {this.props.message}
            </li>
        )
    }
}


export default MessageCollectionItem;