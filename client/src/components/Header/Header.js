import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header id="header">
            <nav class="nav">
                <a href="/" class="nav-logo">What's The Wave</a>

                <div class="nav-menu">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Log In</a>
                            <a class="nav-link" href="/signup">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;