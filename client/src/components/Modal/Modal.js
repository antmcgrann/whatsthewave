import React from 'react';

import './Modal.scss'

import { Button, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            tagsStr: ""
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("tagsStr: " + this.state.tagsStr);
        console.log("props: " + this.props);
        this.props.handleFilterTags(this.state.tagsStr);
    }

    handleChange = (e) => {
        this.setState({tagsStr: e.target.value});
        console.log("the filtertag str is " + this.state.tagsStr);
    }
   
    render() {
        if (this.props.modalOpen){
            return (
                <div class="shell">
                    <div class="modal-overlay"/>
                    <div class="modal">
                        <div class="modal-topbar">
                            <button type="text" class="close-button" onClick={this.props.handleModal}>x
                            </button>
                        </div>
                        <div class="modal-container">
                            <Form onSubmit={this.handleSubmit}>
                                <h1 class="modal-title">Filter By Event Tags</h1>
                                <Form.Field>
                                    <div class="modal-guts">
                                        <label for="search" class="search-label">Enter event tags</label>
                                        <input id="search" name="search" type="text" class="search" id="modal-search" placeholder="Event tags (separated by space)" onChange={this.handleChange}></input>
                                        <button class="apply-button">Apply Filter</button>
                                    </div>
                                </Form.Field>
                            </Form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}