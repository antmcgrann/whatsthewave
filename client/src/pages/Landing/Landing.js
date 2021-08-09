//TODO
/*
Create events by clicking on map first, then redirection



*/
import React from 'react';

import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { saveEventData } from '../../Actions';
import axios from 'axios';

import './Landing.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'



const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '100%'
}

const eventDivStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  }

export class MapContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            address: '', 
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            eventList: [{}],
            mapCenter: {
                lat: 42.7248,
                lng: -73.6918
            }
        };
    }

    componentDidMount() {
        this.props.updateTitle("Landing");
        this.refreshSavedEvents();
       }

    //Upon component remounting, recieve all events from backend
    refreshSavedEvents = async () => {
        await axios.get("/getEvents")
        .then(res => {
            console.log(res.data);
            localStorage.clear();
            //Save to local storage, res.data is array of event json objects
            //Stored in key-value pair
            //Need to have id_key made in backend
            let tempArr = [];
            res.data.forEach(element => {
                let tempObj = {
                    key: parseInt(element.key),
                    title: String(element.title),
                    latLng: element.latLng,
                    lat: Number(element.latLng.lat),
                    lng: Number(element.latLng.lng),
                    descField: String(element.descField),
                    creator: String(element.creator),
                    tags: [element.tags],
                    rsvp: [element.rsvp],
                    dateField: String(element.dateField),
                    addressField: String(element.addressField),
                    contactInfoField: String(element.contactInfoField),
                    capacity: String(element.capacityField)
                }
                console.log(tempObj);
                localStorage.setItem(element.key, JSON.stringify(tempObj));
                tempArr.push(tempObj);
                console.log(element.latLng);
                console.log(localStorage.length);
                //Successful read and writes to localstorage
                console.log(JSON.parse(localStorage.getItem(element.key))['title']);
            });
            console.log(tempArr);
            this.setState({eventList: tempArr});
            console.log(this.state.eventList);
        });
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
                            <input style={{fontFamily:`Catamaran`}}
                            {...getInputProps({
                                placeholder: 'Search for nearby events',
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
                    <div>
                        {this.state.eventList.length == 1 ? <p>We found 1 event for you</p> : 
                            <p>We found {this.state.eventList.length} events for you</p>}<br/>
                    </div>
                    <div class = "Event-cards">
                        {this.state.eventList.map((item, i) => {
                            console.log(item);
                            return (
                                <Card hover className = "Indv-card">
                                    <CardContent>
                                        <Typography class = "title" variant = "p" component = "body">
                                            <b>{item.title}</b><br/>
                                        </Typography>
                                        <Typography variant = "p">
                                            {typeof item.tags !== "undefined" ? item.tags.map((tag_name) => 
                                                {return (
                                                    <div class = "tags">{tag_name.join(", ")}</div>
                                                )}
                                            ): <p>No tags</p>}
                                            <br/>
                                        </Typography>
                                        <div class = "details">
                                            <Typography variant = "p">
                                                <b>Location: </b>{item.addressField}<br/>
                                            </Typography>
                                            <Typography variant = "p">
                                                <b>Date and time: </b>{item.dateField}, {item.timeField}<br/>
                                            </Typography>
                                            <Typography variant = "p">
                                                <b>Description: </b>{item.descField}<br/>
                                            </Typography>
                                            <Typography variant = "p">
                                                <b>Contact: </b> {item.contactInfoField}<br/>
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
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
                                {this.state.eventList.map( (eventDetail, index) => {
                                    return (
                                        /*
                                        <InfoWindow
                                            // This allows for pop up window instead of marker
                                            // But its not working
                                            position={{
                                                lat: eventDetail.lat,
                                                lng: eventDetail.lng
                                            }}
                                            >
                                            <div style={eventDivStyle}>
                                                <h1>eventDetail.title</h1>
                                            </div>
                                        </InfoWindow>
                                        */
                                        <Marker
                                            position = {{
                                                lat: eventDetail.lat,
                                                lng: eventDetail.lng
                                            }}
                                            key = {eventDetail.key}
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
    apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);