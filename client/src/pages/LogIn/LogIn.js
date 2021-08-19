import React from 'react';

import './LogIn.scss';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react';
import axios from 'axios';

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            isDesktop: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updatePredicate = this.updatePredicate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 1450 });
    }

   
    handleUsernameChange(e){
        this.setState({ username: e.target.value});
        console.log("username changed to " + e.target.value)
    }

    handlePasswordChange(e){
        this.setState({ password: e.target.value});
    }

    componentDidMount() {
        this.props.updateTitle("Log In");
    }

    handleSubmit = async e =>{
        e.preventDefault();
        //In here should send a GET axios request and recieve a response
        //Query if username exists with password
        //If user does not exist, send back user is wrong
        //If finds matching user, check password
        //Return whether account login is correct + other error handling
        let userExists = true,
        responsePkg = {};
        await axios.post('/accounts/logInAccount',
        {user: this.state.username, pass: this.state.password})
            .then(response => responsePkg = response.data);
        if(responsePkg.userValid === false){
            //User does not exist
            //Add some front end changes to notify user
            console.log("bad user");
            return;
        }
        console.log(responsePkg);

        if(responsePkg.passValid === true){
            //log in success
            console.log("Log in success");
        }
        else{
            console.log("Bad pass");
        }
    }
   
    render() {
        const isDesktop = this.state.isDesktop;
        console.log("isDesktop" + isDesktop);

        return (
            <div class="login">
                <div class="login-card">
                    <div class="login-card-container">
                        <h1 class="login-title">Log In</h1>
                        <h3 class="login-slogan">Find Your Wave</h3>

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input icon="user" iconPosition="left" placeholder='Username' onChange={this.handleUsernameChange}/>
                            </Form.Field>
                            <Form.Field>
                                <Input icon="key" iconPosition="left" type='password' placeholder='Password' onChange={this.handlePasswordChange} />
                            </Form.Field>
                            <a class="login-no-acct" href="/signup">Don't have an account? Sign up</a>
                            <Button type='submit'><a href="/event-management" class="login-btn">Log In</a></Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}