import React from 'react';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';



export class EventForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            key: Number,
            title: '',
            tags: [],
            lat: Number,
            lng: Number,
            creator: '',
            locationField: '',
            capacityfield: '',
            dateField: '',
            timeField: '',
            descField: '',
            contactInfoField: ''
        }
    }

    eventUniqueness = async ({ eventObj }) => {
      //  use to query db for event uniqueness before confirming creation
      let msg = JSON(eventObj);
      await axios.get("/checkEventUnique", msg)
        .then(response => {
          // I want JSON obj, {unique: bool, if error: reason}
          let res = JSON(response);
          if(res.unique == false){
            return {unique: false, errorBody: res.errorBody};
          }
          else{
            return {unique: true};
          }
          
        })
    }

    handleChange = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }



    handleSubmit = async (newEvent) => {
      // Generate a key for the event and add
      newEvent.preventDefault();
      //let uniqueRes = eventUniqueness(newEvent);
      /*
      if(!(uniqueRes.unique)){
        return uniqueRes;
      }
      */
      let msg = this.state.json;
      await axios.post('/createEvent', msg)
        .then(response => console.log(response));
    }

    
    

    render() {
      // Need UI
        return (
          <div id = "eventform" align = "middle" >
          <form onSubmit={this.handleSubmit}>
          <h1>Event Creation</h1>
          <p>Enter event title: </p>
          <input
            type='text'
            name='title'
            onChange={this.handleChange}
          />
          <p>Description: </p>
          <input
            type='text'
            name='desc'
            onChange={this.handleChange}
          />
          <p>Enter tags: </p>
          <input
            type='text'
            name='categoryTags'
            onChange={this.handleChange}
          />
          <p>Enter Location: </p>
          <input
            type='text'
            name='locationField'
            onChange={this.handleChange}
          />
          <p>Enter capacity: </p>
          <input
            type='text'
            name='capacityField'
            onChange={this.handleChange}
          />
          <p>Enter date: </p>
          <input
            type='text'
            name='dateField'
            onChange={this.handleChange}
          />
          <p>Enter time: </p>
          <input
            type='text'
            name='timeField'
            onChange={this.handleChange}
          />
          <p>Creator name: </p>
          <input
            type='text'
            name='creator'
            onChange={this.handleChange}
          />
          <p>Enter contact info you want to provide: </p>
          <input
            type='text'
            name='contactInfoField'
            onChange={this.handleChange}
          />
          <br/>
          <br/>
          <input type='submit' />
          </form>
          </div>
          

        );
        // Add more fields
      }   
}

export default(EventForm);