import React from 'react';
import axios from 'axios';

export default class AccountInfoContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account : {},
            //This the account id for 'will' for now
            account_id : "611bd2c35559631aa4b67542",
            eventsHosted : [{}],
            eventsRSVP : [{}]
        }
    }

    componentDidMount() {
        this.setUserToken()
        this.getAccount();
    }
    setUserToken = () => {
        let tok = localStorage.getItem("userToken");
        this.setState({account_id : tok})
    }
    getAccount = async () => {
        console.log(this.state.account_id);
        let acc = await axios.post('/accounts/getOneAccount',
        {id: this.state.account_id})
            .then(response => this.setState({account: response.data,
            eventsHosted : response.data.eventsHosted, eventsRSVP : response.data.eventsRSVP}));
        console.log(this.state.account);
    }
    render (){
        return(
            <div>
                <h1>test</h1>
            </div>
        )
    }
}