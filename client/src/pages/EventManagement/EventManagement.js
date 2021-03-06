import React from 'react';
import Hero from '../../components/Hero/Hero'

import 'semantic-ui-css/semantic.min.css'
import './EventManagement.scss'
import { Button, Card, Image } from 'semantic-ui-react'

import axios from 'axios';
const data = [
    {name: "Farmer's Market", type: "Food & Recreation", location: "Troy, NY", date: "September 14, 2021"},
    {name: "Farmer's Market", type: "Food & Recreation", location: "Troy, NY", date: "September 14, 2021"},
    {name: "Farmer's Market", type: "Food & Recreation", location: "Troy, NY", date: "September 14, 2021"},
    {name: "Farmer's Market", type: "Food & Recreation", location: "Troy, NY", date: "September 14, 2021"}
]

const eventData = [
    data.map((item, i) => {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Meta>{item.type}</Card.Meta>
                    <Card.Description>{item.location}</Card.Description>
                    <Card.Description>{item.date}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <a href="/event-management/edit"><Button basic color='blue'>Manage</Button></a>
                    </div>
                </Card.Content>
            </Card>
        );
    })
]

export default class EventManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // This stores all account data
            account : {},
            // @justin so these are storing the events
            //I'm not sure how to render it into cards
            createEvents : [{}],
            upcomingEvents : [{}],
            // Store the rendered cards here
            createCards : [],
            upcomingCards : []
        }
    }

    componentDidMount() {
        this.props.updateTitle("Event Management");
        this.getUsersEvents();
        this.createEventCards();
    }
    //On component mount update user events
    //Send request of account id and recieve back rsvp events + created events
    getUsersEvents = async () => {
        let acc = await axios.post('/accounts/getOneAccount',
        {id:localStorage.getItem("userToken")})
            .then(response => {
                this.setState({account: response.data});
                return response;
            });
        //Now read response.data.eventsHosted & eventsRSVP and retrieve the data
        //getOneEvent
        let eventsHosted = acc.data.eventsHosted,
        eventsRSVP = acc.data.eventsRSVP;
        eventsHosted.forEach(e => {
            axios.post('/events/getOneEvent',{id:e})
                .then(response => this.state.createEvents.push(response.data));
        });
        eventsRSVP.forEach(e => {
            axios.post('/events/getOneEvent',{id:e})
                .then(response => this.state.upcomingEvents.push(response.data));
        });
        console.log(this.state.createEvents);
        console.log(this.state.upcomingEvents);
        this.createEventCards();
        console.log(this.state.createCards);
        console.log(this.state.upcomingCards);
    }

    handleEventEdit = async () => {
        // On edit button click get event data and store on localstorage
        // Then the data can populate the fields in the edit page

    }

    //This is my attempt but it doesn't work
    createEventCards = () => {
            this.setState({createCards : [
                this.state.createEvents.map((item, i) => {
                    return (
                        <Card>
                            <Card.Content>
                                <Card.Header>{item.title}</Card.Header>
                                <Card.Meta>{item.descField}</Card.Meta>
                                <Card.Description>{item.address}</Card.Description>
                                <Card.Description>{item.dateField}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <a href="/event-management/edit"><Button basic color='blue'>Manage</Button></a>
                                </div>
                            </Card.Content>
                        </Card>
                    );
                })
            ]});
        this.setState({upcomingCards : [
            this.state.upcomingEvents.map((item, i) => {
                return (
                    <Card>
                        <Card.Content>
                            <Card.Header>{item.title}</Card.Header>
                            <Card.Meta>{item.descField}</Card.Meta>
                            <Card.Description>{item.address}</Card.Description>
                            <Card.Description>{item.dateField}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <a href="/event-management/edit"><Button basic color='blue'>Manage</Button></a>
                            </div>
                        </Card.Content>
                    </Card>
                );
            })
        ]});
    }

    
   
    render() {
        
        return (
            // I put in createCards & upcomingCards into where the mock objects used to be
            <div>
                <Hero/>
                <div class="usr-info">
                <div class="usr-evts" style={{ height: this.state.createCards === [{}] ? `300px` : ``}}>
                    <h2>My Created Events</h2>
                    <Card.Group>
                        {this.state.createCards != [{}] ? this.state.createCards : (<span style={{fontWeight:`100`}}>No events to display ;(</span>)}
                    </Card.Group>
                </div>
                <div class="usr-evts" style={{ height: this.state.upcomingCards === [{}] ? `300px` : ``}}>
                    <h2>Upcoming Events</h2>
                    <Card.Group>
                        {this.state.upcomingCards != [{}] ? this.state.upcomingCards : (<span style={{fontWeight:`100`}}>No events to display ;(</span>)}
                    </Card.Group>
                </div>
                </div>
            </div>
        )
    }
}