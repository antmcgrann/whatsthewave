import React from 'react';
import axios from 'axios';

export class AccountInfoContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account = {},
            account_id = ''
        }
    }

    componentDidMount() {
        this.getAccount();
    }

    getAccount = () => {
        axios.get('/accounts/getOneAccount',
        {params: {ID: account_id}})
            .then(response => {
                //store in state
            })
    }
}