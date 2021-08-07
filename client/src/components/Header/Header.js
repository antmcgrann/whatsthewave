import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header class="header">
            <nav class="nav">
                <a href="/landing" class="nav-logo">What's The Wave</a>

                <div class="nav-menu">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a class="nav-link" href="/createvent">Create Event</a>
                            <a class="nav-link" href="/landing">Map</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;