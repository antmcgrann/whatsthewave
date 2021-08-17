import React from 'react';
import axios from 'axios';
import './SignUp.scss';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            isDesktop: false,
            firstName: '',
            lastName: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
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
      this.setState({ password: e.target.value});
    }

    handleFirstNameChange(e){
      this.setState({ firstName: e.target.value });
      console.log("firstname changed to " + e.target.value)

    }

    handleLastNameChange(e){
      this.setState({ lastName: e.target.value });
    }

    componentDidMount() {
      this.props.updateTitle("Sign Up");
    }

    handleSubmit = async e => {
      //ToDo
      //Check if username already exists and respond accordingly
      e.preventDefault();
      let uniqueUser = true;
      await axios.get('/accounts/getOneAccount',{username: this.state.username})
        .then(response => uniqueUser = response);
      if(!uniqueUser){
        //Account name is not unique
      }
      let accountDataPkg = {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }
      console.log("acct pkg " + JSON.stringify(accountDataPkg));
      await axios.post('/accounts/createAccount',accountDataPkg)
        .then(response => console.log(response));
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

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder='Username' onChange={this.handleUsernameChange}/>
                            </Form.Field>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First Name' placeholder='First Name' onChange={this.handleFirstNameChange}/>
                                <Form.Input fluid label='Last Name' placeholder='Last Name' onChange={this.handleLastNameChange} />
                            </Form.Group>
                            <Form.Field>
                                <label>Password</label>
                                <input type='password' placeholder='Password' onChange={this.handlePasswordChange} />
                            </Form.Field>
                            <Button type='submit'><a href="/event-management"  class="signup-btn">Sign Up</a></Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp);