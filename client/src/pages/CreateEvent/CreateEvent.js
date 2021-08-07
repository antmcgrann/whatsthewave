import React from 'react';
import axios from 'axios';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { withRouter } from 'react-router-dom'



export class EventForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            tags: [],
            creator: '',
            locationField: '',
            capacityfield: '',
            dateField: '',
            timeField: '',
            descField: '',
            contactInfoField: '',
            lat: Number,
            lng: Number,
            key: Number
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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



    handleSubmit = async data => {
      // Generate a key for the event and add
      data.preventDefault();
      //Prob want to check each field for validity
      let eventDataPkg = {
        title: data.target.title.value,
        creator: data.target.creator.value,
        tags: data.target.categoryTags.value.split(" "),
        locationField: data.target.locationField.value,
        capacityfield: data.target.capacityField.value,
        dateField: data.target.dateField.value,
        timeField: data.target.timeField.value,
        descField: data.target.descField.value,
        contactInfoField: data.target.contactInfoField.value
      }
      //Need validity check
      //Need uniqueness check
      await axios.post('/createEvent', eventDataPkg)
        .then(response => console.log(response));
      this.props.history.push('/landing');
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
            id='title'
            onChange={this.handleChange}
          />
          <p>Description: </p>
          <input
            type='text'
            id='descField'
            onChange={this.handleChange}
          />
          <p>Enter tags: </p>
          <input
            type='text'
            id='categoryTags'
            onChange={this.handleChange}
          />
          <p>Enter Location: </p>
          <input
            type='text'
            id='locationField'
            onChange={this.handleChange}
          />
          <p>Enter capacity: </p>
          <input
            type='text'
            id='capacityField'
            onChange={this.handleChange}
          />
          <p>Enter date: </p>
          <input
            type='text'
            id='dateField'
            onChange={this.handleChange}
          />
          <p>Enter time: </p>
          <input
            type='text'
            id='timeField'
            onChange={this.handleChange}
          />
          <p>Creator name: </p>
          <input
            type='text'
            id='creator'
            onChange={this.handleChange}
          />
          <p>Enter contact info you want to provide: </p>
          <input
            type='text'
            id='contactInfoField'
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

export default withRouter(EventForm);