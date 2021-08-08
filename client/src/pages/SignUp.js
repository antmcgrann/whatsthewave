import React from 'react';
import axios from 'axios';



export class AccountCreation extends React.Component(){
    constructor(props){
        super(props);
        this.state = {
            accountName = '',
            key = Number
            //Add more
        }
    }

    sendAccountCreation = () => {
        axios.put('/createAccount')
        .then(response => {

        })
    }

    render(){

    }

}