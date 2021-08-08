import React from 'react';
import axios from 'axios';

export class EditEvent extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this.retrieveEditEvent();
    }

    retrieveOneEvent = (key) =>{
        //Search by key
        //Also probably shouldn't get to this screen unless event exists
        axios.get('/getOneEvent', key)
        .then(response => {
            //Return event 

        })
    }

    sendEditedEvent = (event) =>{
        axios.put('editEvent')
        .then(response => {

        } )
    }

    render (){


    }


}