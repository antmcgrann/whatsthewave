import React from 'react';
import './Dropdown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            open: false
        };
    }

    handleClick = (e) => {
        this.setState({open: !this.state.open});
        console.log("the open str is " + this.state.open);
    }
   
    render() {
        return (
            <div class="dropdown" onClick={this.handleClick}>
                <button class="dropdown-top">
                    <div class="dropdown-name">{this.props.name}</div>

                    {this.state.open && <FontAwesomeIcon class="dropdown-icon" icon={faCaretUp}/>}
                    {!this.state.open && <FontAwesomeIcon class="dropdown-icon" icon={faCaretDown}/>}
                </button>
                {this.state.open && 
                    (<div class="dropdown-menu">
                        <ul class="dropdown-list">
                            <li class="dropdown-item"><a>My Account</a></li>
                            <li class="dropdown-item"><a onClick={this.handleClick} href="/event-management">Event Management</a></li>
                            <li class="dropdown-item"><a style={{cursor:`pointer`}} onClick={this.props.handleLogout}>Log Out</a></li>
                        </ul>
                    </div>)}
            </div>
        )
    }
}