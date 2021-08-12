import React from 'react';

import './Hero2.scss'

export default class Hero2 extends React.Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        return (
            <div class="hero">
                <div class="hero-container">
                    <div class="hero-content">
                        <h1 class="hero-title">Create an Event</h1>
                        <h2 class="hero-subtitle">Start Your Wave</h2>
                    </div>
                </div>
            </div>
        )
    }
}