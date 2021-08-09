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
            coords: {},
            key: Number
            
        };
        //this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.handleSelect =
    }
/*
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
    }

    handlePlaceChange = address => {
      this.setState({address});
    };


    handleSubmit = async data => {
      // Generate a key for the event and add
      data.preventDefault();
      //Prob want to check each field for validity
      let eventDataPkg = {
        title: data.target.title.value,
        creator: data.target.creator.value,
        tags: data.target.categoryTags.value.split(" "),
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
          <div id = "eventform" align = "middle" >
          <form onSubmit={this.handleSubmit}>
          <div class="column">
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
          </div>
          <div class="column">
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
        
      }   
}

export default withRouter(EventForm);