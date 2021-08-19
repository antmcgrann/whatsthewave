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
import Typography from '@material-ui/core/Typography';
import { Button, Header, Icon, Input } from 'semantic-ui-react';
import Modal from '../../components/Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


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

function containsTag(evt){
    
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
            filteredEventList: [{}],
            mapCenter: {
                lat: 42.7248,
                lng: -73.6918
            },
            modalOpen: false,
            filterTags: []
        };

        this.handleModal = this.handleModal.bind(this);
    }

    componentDidMount() {
        this.props.updateTitle("Landing");
        this.refreshSavedEvents();
    }

    //Upon component remounting, recieve all events from backend
    refreshSavedEvents = async () => {
        await axios.get("/events/getEvents")
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
    
    handleModal = () => {
        this.setState({modalOpen: !this.state.modalOpen});
        console.log("the modal is now " + this.state.modalOpen);
        console.log("the split string is " + this.state.filterTags);
    }

    handleClear = () => {
        this.setState({filterTags: []});
    }

    handleFilterTags = (tagsStr) => {
        //console.log("tagsStr is " + tagsStr);
        const arr = tagsStr.split(' ');
        const arrStripped = arr.filter(item => item);
        //console.log("the length is " + filterArr.length);
        this.setState({filterTags: arrStripped});
        this.handleModal();

        if (arrStripped.length !== 0){ //filters are on, so update
            const filterArr = this.state.eventList.filter((evt) => {
                const evtTags = evt.tags[0].map(tag => tag.toLowerCase()); //convert tags all to lowercase
                const arrStrippedLowerCase = arrStripped.map(fTag => fTag.toLowerCase());
                console.log("the event tags are " + evtTags);
                console.log("the arrStripped is " + arrStrippedLowerCase);
                //console.log("len1: " + evtTags.length + " len2: " + arrStripped.length);
                //console.log("first el: " + evtTags[0]);
                //console.log("the result is " + evtTags.some(tag => arrStripped.indexOf(tag.toLowerCase()) >= 0));
                return evtTags.some(tag => arrStrippedLowerCase.indexOf(tag) >= 0);
            });

            console.log("the filterArr is now " + filterArr);
            this.setState({filteredEventList: filterArr});
        }
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
        if (this.state.filterTags.length === 0){
            return (
                <div class='wrapper'>
                    {this.state.modalOpen && <Modal modalOpen={this.state.modalOpen} handleModal={this.handleModal} handleFilterTags={this.handleFilterTags}/>}
                    <div class='map-left'>
                        <div class='map-left-top'>
                            <PlacesAutocomplete
                                value = {this.state.address}
                                onChange = {this.handleChange}
                                onSelect = {this.handleSelect}
                            >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div style={{display:`flex`, flexDirection: `column`}}>
                                    <div style={{display:`flex`, alignItems: `center`, justifyContent: `center`, padding: `0.5rem 1rem 0.5rem 1rem`}}>
                                        <button class="tags-button" onClick={this.handleModal}>
                                            <FontAwesomeIcon icon={faTags} class="tags-icon"/>
                                        </button>
                                        <input style={{fontFamily:`Catamaran`}}
                                        {...getInputProps({
                                            placeholder: 'Search by location',
                                            className: 'location-search-input',
                                        })}
                                        />
                                    </div>
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
    
                        <div class = "event-cards">
                            {this.state.eventList.length == 1 ? <p>We found 1 event for you</p> : 
                                <p>We found {this.state.eventList.length} events for you</p>}
                            {this.state.eventList.map((item, i) => {
                                console.log(item);
                                return (
                                    <div class = "indv-card">
                                        <Card>
                                            <CardContent>
                                                <Typography class = "title" variant = "h4">
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
                                    </div>
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
        else {
            return (
                <div class='wrapper'>
                    {this.state.modalOpen && <Modal modalOpen={this.state.modalOpen} handleModal={this.handleModal} handleFilterTags={this.handleFilterTags}/>}
                    <div class='map-left'>
                        <div class='map-left-top'>
                            <PlacesAutocomplete
                                value = {this.state.address}
                                onChange = {this.handleChange}
                                onSelect = {this.handleSelect}
                            >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div style={{display:`flex`, flexDirection: `column`}}>
                                    <div style={{display:`flex`, alignItems: `center`, justifyContent: `center`, padding: `0.5rem 1rem 0.5rem 1rem`}}>
                                        <button class="tags-button" onClick={this.handleModal}>
                                            <FontAwesomeIcon icon={faTags} class="tags-icon"/>
                                        </button>
                                        <input style={{fontFamily:`Catamaran`}}
                                        {...getInputProps({
                                            placeholder: 'Search by location',
                                            className: 'location-search-input',
                                        })}
                                        />
                                    </div>
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
    
                        <div class = "event-cards">
                            {this.state.filteredEventList.length == 1 ? <p>We found 1 event related to <b>{this.state.filterTags.join(", ")}</b> for you</p> : 
                                <p>We found {this.state.filteredEventList.length} events related to <b>{this.state.filterTags.join(", ")}</b> for you</p>}
                                <button class="cancel-button" onClick={this.handleClear}>
                                    <FontAwesomeIcon icon={faTimesCircle} class="cancel-icon"/>
                                    <p>Cancel Filter</p>
                                </button>
                            {this.state.filteredEventList.map((item, i) => {
                                console.log(item);
                                return (
                                    <div class = "indv-card">
                                        <Card>
                                            <CardContent>
                                                <Typography class = "title" variant = "h4">
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
                                    </div>
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
                                    {this.state.filteredEventList.map( (eventDetail, index) => {
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
}




export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);