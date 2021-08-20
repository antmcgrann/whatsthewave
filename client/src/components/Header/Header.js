import React from 'react';
import './Header.scss';
import circleLogo from '../../images/logo-circle.png';
import Dropdown from '../../components/Dropdown/Dropdown.js';

const loggedIn = true;

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: true //change this to FALSE for logged out version
        };
    }

    handleLogout = (val) => {
        this.setState({loggedIn: !this.state.loggedIn});
    }

    render(){
        console.log("logged in isssssss " + this.state.loggedIn);
        if (!this.state.loggedIn){
            return (
                <header id="header">
                    <nav class="nav">
                        <div class="nav-logo">
                            <a href="/">
                                <img class="nav-logo-img" src={circleLogo}/>
                            </a>
                            <a href="/" class="nav-logo-text">What's The Wave</a>
                        </div>
        
                        <div class="nav-menu">
                            <ul class="nav-list">
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">Log In</a>
                                    <a class="nav-link" href="/signup">Sign Up</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            );
        }
        else {
            return (
                <header id="header">
                    <nav class="nav">
                        <div class="nav-logo">
                            <a href="/">
                                <img class="nav-logo-img" src={circleLogo}/>
                            </a>
                            <a href="/" class="nav-logo-text">What's The Wave</a>
                        </div>
        
                        <div class="nav-menu">
                            <ul class="nav-list">
                                <li class="nav-item">
                                    <Dropdown name="Surfer John" handleLogout={this.handleLogout}/>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            );
        }
    }
}