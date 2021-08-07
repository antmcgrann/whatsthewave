import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from './components/Header/Header';
import Landing from './pages/Landing/Landing';
import CreateEvent from './pages/CreateEvent/CreateEvent'

import './styles/main.scss';

export default class App extends React.Component {
    state = {
        title: ""
    }

    render(){
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/landing">
                    <Landing />
                </Route>
                <Route exact path="/createvent">
                    <CreateEvent />
                </Route>
            </Switch>
        </BrowserRouter>
    );
    }
}