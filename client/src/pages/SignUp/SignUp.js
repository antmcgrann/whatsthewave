import React from 'react';

import './SignUp.scss';
import { Button, Checkbox, Form } from 'semantic-ui-react'

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
   
    render() {
        const isDesktop = this.state.isDesktop;
        console.log("isDesktop" + isDesktop);

        return (
            <div class="signup-container">
                <div class="signup-left"></div>
                <div class="signup-right">
                    <div class="signup-right-container">
                        <h1 class="signup-title">Sign Up</h1>
                        <h3 class="signup-slogan">Find Your Wave</h3>

                        <Form>
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder='Username' onChange={this.handleUsernameChange}/>
                            </Form.Field>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First Name' placeholder='First Name'/>
                                <Form.Input fluid label='Last Name' placeholder='Last Name' />
                            </Form.Group>
                            <Form.Field>
                                <label>Password</label>
                                <input type='password' placeholder='Password' onChange={this.handlePasswordChange} />
                            </Form.Field>
                            <Button type='submit'><a href="/event-management" class="signup-btn">Sign Up</a></Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}