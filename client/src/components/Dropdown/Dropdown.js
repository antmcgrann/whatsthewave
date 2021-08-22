import React from 'react';
import './Dropdown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faUserCircle, faCalendar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

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
                            <a class="dropdown-item">
                                <FontAwesomeIcon icon={faUserCircle} class="dropdown-icon"/>
                                <div>My Account</div>
                            </a>
                            <a class="dropdown-item" href="/event-management" onClick={this.handleClick}>
                                <FontAwesomeIcon icon={faCalendar} class="dropdown-icon"/>
                                <div>Event Management</div>
                            </a>
                            <a class="dropdown-item">
                                <FontAwesomeIcon icon={faSignOutAlt} class="dropdown-icon"/>
                                <div style={{cursor:`pointer`}} onClick={this.props.handleLogout}>Log Out</div>
                            </a>
                        </ul>
                    </div>)}
            </div>
        )
    }
}