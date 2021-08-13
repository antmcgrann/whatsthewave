import React from 'react';
import axios from 'axios';
import PlacesAutocomplete ,{
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
//import Autocomplete from "react-google-autocomplete";
import { withRouter } from 'react-router-dom';
import "./CreateEvent.scss";
import Hero from '../../components/Hero2/Hero2';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import { Button, Checkbox, Form, TextArea } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

//import "./places.html";


//loadScript('https://maps.googleapis.com/maps/api/js?key=process.env.REACT_APP_API_KEY&libraries=places&callback=initMap');


export class CreateEvent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            address: '',
            title: '',
            tags: [],
            creator: '',
            capacityfield: '',
            dateField: '',
            timeField: '',
            descField: '',
            contactInfoField: '',
            //Following need to be calculated
            //WIP
            coords: {},
            key: Number
            
        }
        //this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () =>{
      //this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
      //this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
      this.props.updateTitle("Create Event");
    };
/*
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
    };
*/


    handleSelect = address => {
      geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              console.log('Success', latLng);
              this.setState({ address })
              this.setState({ coords: latLng })
          })
          .catch(error => console.error('Error', error));
    };

    handleChange = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    };

    handlePlaceChange = address => {
      this.setState({ address });
    };


    handleSubmit = async data => {
      // Generate a key for the event and add
      data.preventDefault();
      //Prob want to check each field for validity
      if(this.state.address === ''){
        return;
      }
      console.log("check " + data.target.tags.value);
      let eventDataPkg = {
        title: data.target.title.value,
        creator: data.target.creator.value,
        tags: data.target.tags.value.split(" "),
        capacityfield: data.target.capacityField.value,
        dateField: data.target.dateField.value,
        timeField: data.target.timeField.value,
        descField: data.target.descField.value,
        contactInfoField: data.target.contactInfoField.value,
        latLng: this.state.coords,
        addressField: this.state.address
      }
      //Need validity check
      //Need uniqueness check
      await axios.post('/createEvent', eventDataPkg)
        .then(response => console.log(response));
      this.props.history.push('/');
    };

    render() {
      // Need UI
        return (
          <div>
            <Hero/>
            <div class="eventform">
            <Form onSubmit={this.handleSubmit}>
                <h1 class="eventform-title">Event Information</h1>
                <Form.Field>
                    <label>Event Name</label>
                    <input name="title" placeholder='Enter event name' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <TextArea name="descField" placeholder='Enter event description (max 250 chars.)' onChange={this.handleChange} style={{minHeight: 100, fontFamily: `Catamaran`}} maxLength="250"/>
                </Form.Field>
                <Form.Field>
                    <label>Tags</label>
                    <input name="tags" placeholder='Enter tags here' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Maximum Capacity</label>
                    <input name="capacityField" placeholder='Enter event maximum capacity' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Date</label>
                    <input name="dateField" placeholder='Enter event date' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Time</label>
                    <input name="timeField" placeholder='Enter event time' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Event Creator</label>
                    <input name="creator" placeholder='Enter event creator' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Contact Info</label>
                    <input name="contactInfoField" placeholder='Enter contact info' onChange={this.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Location</label>
                  <PlacesAutocomplete
                        value = {this.state.address}
                        onChange = {this.handlePlaceChange}
                        onSelect = {this.handleSelect}
                    >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input style={{fontFamily:`Catamaran`}}
                            {...getInputProps({
                                placeholder: 'Enter location',
                                className: 'location-search-input',
                            })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                            </div>
                        </div>
                        )}
                    </PlacesAutocomplete>
                  </Form.Field>
                
                <Button type='submit'>Create Event</Button>
            </Form>
          </div>
        </div>

        );
        
      }   
}

export default withRouter(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
}) (CreateEvent));