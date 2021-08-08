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
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';

//import "./places.html";


//loadScript('https://maps.googleapis.com/maps/api/js?key=process.env.REACT_APP_API_KEY&libraries=places&callback=initMap');


export class EventForm extends React.Component {

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
            latLng: {},
            key: Number,
            // Location
            
        }
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () =>{
      //this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
      //this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    };

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
      let eventDataPkg = {
        title: data.target.title.value,
        creator: data.target.creator.value,
        tags: data.target.categoryTags.value.split(" "),
        locationField: data.target.locationField.value,
        capacityfield: data.target.capacityField.value,
        dateField: data.target.dateField.value,
        timeField: data.target.timeField.value,
        descField: data.target.descField.value,
        contactInfoField: data.target.contactInfoField.value,
        latLng: this.state.latLng
      }
      //Need validity check
      //Need uniqueness check
      await axios.post('/createEvent', eventDataPkg)
        .then(response => console.log(response));
      this.props.history.push('/landing');
    };

    handlePlaceSelect = address => {
      geocodeByAddress(address)
      .then(results =>{
        let geoAddress = results[0];
        this.setState={
          latLng: getLatLng(geoAddress)
        }})
      .catch(error => console.error('Error', error));
        
        
      
      /*
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {console.log('Success', latLng);
            this.state.lat.setState({latLng.lat})
            this.state.lng.setState({latLng.lng})})
          .catch(error => console.error('Error', error));
      */
    }; 
    

    render() {
      // Need UI
        return (
          
          <div id = "eventform" align = "middle" class = "row">
          <form onSubmit={this.handleSubmit}>
          <h1>Event Creation</h1>
          <div class="column">
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
          </div>
          <div class="column">
            <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handlePlaceChange}
          onSelect={this.handlePlaceSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
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
          </div>
          <div class="column">
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
          </div>
          <br/>
          <br/>
          <input type='submit' />
          </form>
          </div>
          

        );
        // Add more fields
      }   
}

export default withRouter(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
}) (EventForm));