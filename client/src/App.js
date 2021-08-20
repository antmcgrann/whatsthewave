import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from './components/Header/Header';
import Landing from './pages/Landing/Landing';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import EventManagement from './pages/EventManagement/EventManagement';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import EditEvent from './pages/EditEvent/EditEvent';
import AccountInfo from './pages/AccountInfo';


import './styles/main.scss';

export default class App extends React.Component {
    state = {
        title: ""
    }

    updateTitle(t) {
        this.setState({title: t});
        document.title = t + " - What's the Wave";
    }

    render(){
        this.updateTitle = this.updateTitle.bind(this);
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/">
                        <Landing updateTitle={this.updateTitle}/>
                    </Route>
                    <Route exact path="/event-management">
                        <EventManagement updateTitle={this.updateTitle}/>
                    </Route>
                    <Route exact path="/login">
                        <LogIn updateTitle={this.updateTitle}/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp updateTitle={this.updateTitle}/>
                    </Route>
                    <Route exact path="/event-management/create">
                        <CreateEvent updateTitle={this.updateTitle}/>
                    </Route>
                    <Route exact path="/event-management/edit">
                        <EditEvent updateTitle={this.updateTitle}/>
                    </Route>
                    <Route exact path="/account-info">
                        <AccountInfo updateTitle={this.updateTitle}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}