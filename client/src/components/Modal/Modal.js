import React from 'react';

import './Modal.scss'

import { Button, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

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
                        </div>
                        <div class="modal-container">
                            <Form onSubmit={this.handleSubmit}>
                                <div class="modal-header">
                                    <FontAwesomeIcon icon={faTags} class="modal-tags-icon"/>
                                    <h1 class="modal-title">Filter By Event Tags</h1>
                                </div>
                                <Form.Field>
                                    <div class="modal-guts">
                                        <label for="search" class="search-label">Enter event tags</label>
                                        <input id="search" name="search" type="text" class="search" id="modal-search" placeholder="Event tags (separated by space)" onChange={this.handleChange}></input>
                                    </div>
                                    <div class="modal-bottombar">
                                        <button class="cancel-button" onClick={this.props.handleModal}>Cancel</button>
                                        <button class="apply-button" name="submit" type="submit">Apply Filter</button>
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