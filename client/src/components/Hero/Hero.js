import React from 'react';

import './Hero.scss'

export default class Hero extends React.Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        return (
            <div class="hero">
                <div class="hero-container">
                    <div class="hero-content">
                        <h1 class="hero-title">Event Management</h1>
                        <h2 class="hero-subtitle">Start Your Wave</h2>
                        <a class="hero-btn" href="/event-management/create">Create an Event</a>
                    </div>
                </div>
            </div>
        )
    }
}