import React from 'react';

import './LogIn.scss';
import { Button, Checkbox, Form } from 'semantic-ui-react';

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
        this.setState({ username: e.target.value});
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
    }
   
    render() {
        const isDesktop = this.state.isDesktop;
        console.log("isDesktop" + isDesktop);

        return (
            <div class="login-container">
                <div class="login-left"></div>
                <div class="login-right">
                    <div class="login-right-container">
                        <h1 class="login-title">Log In</h1>
                        <h3 class="login-slogan">Find Your Wave</h3>

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder='Username' onChange={this.handleUsernameChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input type='password' placeholder='Password' onChange={this.handlePasswordChange} />
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