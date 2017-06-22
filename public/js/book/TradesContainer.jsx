import React from 'react';
import {render} from 'react-dom';


//Trade request Pending Card
import TradeRequestPendingCard      from './../book/TradeRequestPendingCard.jsx';


class TradesContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            books: [],
            myTradeRequests:[]
        }
    }

    componentWillMount(){
        this._getLibraryContentsAllUsers();
    }

    componentWillReceiveProps(newProps){
        if (this.props.user != newProps.user){
            this.setState({user: newProps.user});
            this._getLibraryContentsAllUsers();
        }
    }

    _getLibraryContentsAllUsers(){
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


                    var myTradeRequests = booksArray.filter(book=>{
                        return (this.props.user && (book.owner.username == this.props.user.username) && (book.usersRequestingTrade.length > 0 ))
                    });
                    console.log("My Trades");
                    console.log(myTradeRequests);
                    this.setState({myTradeRequests: myTradeRequests});

                    var otherTradeRequests = booksArray.filter(book=>{
                        return (this.props.user && (book.owner.username == this.props.user.username) && (book.usersRequestingTrade.length > 0 ))
                    });

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
                    <b>Approve Trade Requests</b>
                    {this.state.myTradeRequests.map((book, i )=>{
                        return(
                            <div key={i}>
                                {book.usersRequestingTrade.map((userRequestingTrade, j ) =>{
                                    return (<div key={j}>
                                    <TradeRequestPendingCard tradeRequestBook={book} userRequestingTrade={userRequestingTrade} />
                                    </div>)
                                } ) }
                            </div>
                        )
                    } )}
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