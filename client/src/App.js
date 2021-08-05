import React, { useEffect } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useDispatch} from 'react-redux';

import {getEvents} from './Actions/events';

import Header from './components/Header/Header';
import Landing from './pages/Landing/Landing';
import EventCard from './components/EventCard';

import './styles/main.scss';

export default class App extends React.Component {

    state = {
        title: ""
    }
    render(){

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Landing />

                </Route>
            </Switch>
        </BrowserRouter>
    );

    }
}