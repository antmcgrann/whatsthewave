import React, { useEffect } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';



import { useDispatch } from 'react-redux';
import { getEvents } from './actions/events';

import Events from './components/Events/Events';
import Form from './components/Form/Form';
import WHATSTHEWAVE from './images/WHATSTHEWAVE.png'



const App = () => {  
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents);
    }, [dispatch]);
    return (
        <Container maxWidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Whats the Wave</Typography>
                <img src={WHATSTHEWAVE} alt="WHATSTHEWAVE" height="240"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid cotainer justify="space-between" alignItems="stretch" spacing={3}> 
                        <Grid item xs={12} sm={7}>
                            <Events />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}
export default App;


/*
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};
*/

/*
export class MapContainer extends React.Component {
    render() {
        return (
            <Map
                google = {this.props.google}
                zoom = {14}
                style = {mapStyles}
                initialCenter = {
                    {
                        lat: 42.7298,
                        lng: 73.6789
                    }
                }
            >
            <Marker key="marker_1"
                icon={{
                    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Buoy.svg',
                    anchor: new this.props.google.maps.Point(32,32),
                    scaledSize: new this.props.google.maps.Size(32,32)
                }}

                position={{
                    lat: 42.7298,
                    lng: 73.6789
                }}
            />
            </Map>
        );
    }
}
*/
/*
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
            <div id = 'GoogleMap'>
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
            
                <Map
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
      )
    }
  }

//<script type="text/javascript" src="https://maps.google.com/maps/api/js?libraries=places"></script>

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDdIBVvzNbyOpiU1qvyJiWbAW6CFm1KoQs'
})(MapContainer);
*/