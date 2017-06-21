// References and useful pages
//https://stackoverflow.com/questions/41216948/this-setstate-is-not-a-function-when-trying-to-save-response-on-state
 
import React from 'react';
import {render} from 'react-dom';


class HomePanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user
        }
    };

    componentWillMount(){

    };

    componentWillReceiveProps(){
        this.setState({user: this.props.user});
    }


    render(){
        return(
            <div id="home-panel" className="div-visible" >
                <h3>Free Code Camp - Manage a Book Trading Club</h3>
                <a href="https://www.freecodecamp.com/challenges/manage-a-book-trading-club">
                    https://www.freecodecamp.com/challenges/manage-a-book-trading-club
                </a>
                {this.props.user.username && 
                <div>
                    Welcome {this.props.user.username}
                </div>}
            </div>
        )
    }

}


//render(<HomePanel />, document.getElementById('react-container'));

export default HomePanel;