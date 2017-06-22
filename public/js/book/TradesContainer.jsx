import React from 'react';
import {render} from 'react-dom';

class TradesContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            books: []
        }
    }

    componentWillMount(){
        var allUsers= {type:"all"};
        this._getLibraryContents(allUsers);
    }

    
    _getLibraryContents(user){        

        console.log("Get Library Contents");
        this.setState({"books":[]});
        
        if(user.type != "user"){
            user.username = undefined;
        }

        jQuery.ajax({
            method: 'GET',
            url:("/api/library"),
            data: {"username": user.username},
            success: (rawResult)=>{
                //console.log(rawResult);
                var booksArray = JSON.parse(rawResult);
                if (booksArray.length > 0 ){
                    console.log(booksArray );
                    this.setState({"books": booksArray});
                    /*
                    var myTradeRequests = booksArray.filter(book=>{
                        return ((book.owner.username == this.props.user.username) && (book.usersRequestingTrade.length > 0 ))
                    });
                        console.log(myTradeRequests);

                    var otherTradeRequests = booksArray.filter(book=>{
                        return ((book.owner.username == this.props.user.username) && (book.usersRequestingTrade.length > 0 ))
                    });
                    */

                }
            },
            dataType: "text",
            contentType : "application/json"

        });

    }


    render(){
        return(
            <div>
                <div>
                    <b>Waiting for Approval</b>

                </div>

                <div>
                    <b>Waiting for Approval</b>
                </div>
                
            </div>
        )
    }
}

export default TradesContainer;
TradesContainer