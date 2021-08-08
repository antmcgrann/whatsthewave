import React from 'react';
import axios from 'axios';

export class LogInContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username = '',
            password = ''
        }
    }
    sendLogInRequest = (req) =>{
        //Send log in data to backend and recieve response
        axios.get('/logInAccount')
        .then(response => {
            // Recieves success or failure
        })
    }
}