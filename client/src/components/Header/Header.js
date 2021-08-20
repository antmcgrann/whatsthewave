import React from 'react';
import './Header.scss';
import circleLogo from '../../images/logo-circle.png';
import Dropdown from '../../components/Dropdown/Dropdown.js';
import axios from 'axios';
const loggedIn = true;

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: true, //change this to FALSE for logged out version
            accountData: {}
        };
    }

    componentDidMount(){
        this.checkLogIn();
    }

    checkLogIn = async () => {
        if (localStorage.getItem("userToken") !== null) {
            console.log("yes")
            this.setState({loggedIn : true});
            let acc = await axios.post('/accounts/getOneAccount',
            {id: localStorage.getItem("userToken")})
                .then(response => this.setState({accountData: response.data}));
            console.log(this.state.accountData);
        } else {
            this.setState({loggedIn : false});
        }
    }

    handleLogout = (val) => {
        this.setState({loggedIn: !this.state.loggedIn});
        localStorage.removeItem("userToken");
    }

    returnUser = () => {
        return this.state.accountData.user;
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
                                    <Dropdown name={this.state.accountData.username} handleLogout={this.handleLogout}/>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            );
        }
    }
}