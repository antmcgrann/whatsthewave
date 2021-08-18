import React from 'react';
import './Header.scss';
import circleLogo from '../../images/logo-circle.png';

const Header = () => {
    return (
        <header id="header">
            <nav class="nav">
                <div class="nav-logo">
                    <a href="/">
                        <img class="nav-logo-img" src={circleLogo}/>
                    </a>
                    <a href="/" class="nav-logo-text">What's The Wave</a>
                </div>

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