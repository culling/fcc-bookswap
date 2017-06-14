class HeaderContainer extends React.Component{
    constructor(props){
        super();

    }

    render(){
        return(
            <div>
                <h1>Free Code Camp - Manage a Book Trading Club</h1>
                <a href="https://www.freecodecamp.com/challenges/manage-a-book-trading-club">
                    https://www.freecodecamp.com/challenges/manage-a-book-trading-club
                </a>
            </div>
        )
    }
}
ReactDOM.render (
    <HeaderContainer />, document.getElementById('header-container')
)