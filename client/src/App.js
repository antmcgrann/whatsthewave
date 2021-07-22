import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from './components/Header/Header';
import Landing from './pages/Landing';

import './styles/main.scss';

const App = () => {
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
export default App;