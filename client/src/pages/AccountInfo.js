import React from 'react';
import axios from 'axios';

export class AccountInfoContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account = {}
        }
    }

    componentDidMount() {
        this.getAccount();
    }

    getAccount = () => {
        axios.get('/getOneAccount')
        .then(response => {
            //store in state
        })
    }
}