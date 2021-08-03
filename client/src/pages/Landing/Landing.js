import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { saveEventData } from '../../actions';
import axios from 'axios';

import './Landing.scss';

const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '100%'
}

export class MapContainer extends React.Component {
    
    componentDidMount() {
        this.refreshSavedEvents();
       }

    //Upon component remounting, recieve all events from backend
    refreshSavedEvents = () => {
        axios.get("/getEvents")
        .then(res => {
            console.log(res.data);
            localStorage.clear();
            //Save to local storage, res.data is array of event json objects
            //Stored in key-value pair
            //Need to have id_key made in backend
            let locAmt = res.data.length;
            let countAmt = 0;
            let idArray = [];
            res.data.forEach(element => {
                console.log(element.key);
                idArray.push(element._id);
                console.log(idArray);
                let tempObj = {
                    key: element.key,
                    title: element.title,
                    lat: element.lat,
                    long: element.long,
                    desc: element.desc,
                    creator: element.creator,
                    tags: element.tags,
                    rsvp: element.rsvp,
                    date: element.date
                }
                localStorage.setItem(element.key, tempObj);
                console.log(tempObj);
                console.log(localStorage);
                
            });
        });
    }
    

    constructor(props) {
        super(props);
        this.state = { 
            address: '', 
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            mapCenter: {
                lat: 42.7248,
                lng: -73.6918
            }
        };
    }

   
    handleChange = address => {
        this.setState({ address });
    };
     
    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.setState({ address })
                this.setState({ mapCenter: latLng })
            })
            .catch(error => console.error('Error', error));
    };
   
    render() {
        return (
            <div class='wrapper'>
                <div class='map-left'>
                    <PlacesAutocomplete
                        value = {this.state.address}
                        onChange = {this.handleChange}
                        onSelect = {this.handleSelect}
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

                <div class='map-right'>
                    <Map containerStyle={containerStyle}
                        google = {this.props.google}
                        initialCenter = {{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}

                        center = {{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
            >
                        <Marker
                            position = {{
                                lat: this.state.mapCenter.lat,
                                lng: this.state.mapCenter.lng
                            }}
                        />
                    </Map>
                </div>
            </div>
      )
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDdIBVvzNbyOpiU1qvyJiWbAW6CFm1KoQs'
})(MapContainer);