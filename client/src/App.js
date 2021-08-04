import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useDispatch} from 'react-redux';

import {getEvents} from './actions/events';

import Header from './components/Header/Header';
import Landing from './pages/Landing/Landing';
import EventCard from './components/EventCard';

import './styles/main.scss';

export default class App extends React.Component {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);


    state = {
        title: ""
    }

    render(){
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Landing />
                    <EventCard />

                </Route>
            </Switch>
        </BrowserRouter>
    );
    }
}