import React from 'react';
import axios from 'axios';



export class EventForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            eventTitle: '',
            categoryTags: [],
            location: '',
            capacity: '',
            date: '',
            time: '',
            desc: '',
            contactInfo: ''
        }
    }

    handleChange = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }


    handleSubmit = (newEvent) => {
      axios.post("/createEvent", JSON(this.state))
        .then(response => console.log(response));
    }

    render() {
      // Need UI
        return (
          <form onSubmit={this.handleSubmit}>
          <h1>Event Creation</h1>
          <p>Enter event title: </p>
          <input
            type='text'
            name='eventTitle'
            onChange={this.handleChange}
          />
          <p>Enter tags: </p>
          <input
            type='text'
            name='categoryTags'
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <input type='submit' />
          </form>
        );
        // Add more fields
      }   
}