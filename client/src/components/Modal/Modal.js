import React from 'react';

import './Modal.scss'

import { Button, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        return (
            <div class="shell">
                <div class="modal-overlay"/>
                <div class="modal">
                    <div class="modal-topbar">
                        <button type="text" class="close-button">x
                        </button>
                    </div>
                    <div class="modal-container">
                        <Form>
                            <h1 class="modal-title">Filter By Event Tags</h1>
                            <Form.Field>
                                <div class="modal-guts">
                                    <label for="search" class="search-label">Enter event tags</label>
                                    <input id="search" name="search" type="text" class="search"></input>
                                    <button>Apply Filter</button>
                                </div>
                            </Form.Field>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}