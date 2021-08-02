import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import eventdata from '../events.json';

import './Landing.scss';


const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '100%'
}

export class MapContainer extends React.Component {
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
                    <Map containerStyle = {containerStyle}
                        google = {this.props.google}
                        initialCenter = {{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}
                        center = {{
                            lat: this.state.mapCenter.lat,
                            lng: this.state.mapCenter.lng
                        }}>
                            {eventdata.map( (eventDetail, index) => {
                                return (
                                    <Marker
                                        position = {{
                                            lat: eventDetail.lat,
                                            lng: eventDetail.lng
                                        }}
                                        key = {eventDetail.lat}
                                    />
                                )
                            })}
                    </Map>
                </div>
            </div>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyDdIBVvzNbyOpiU1qvyJiWbAW6CFm1KoQs'
})(MapContainer);