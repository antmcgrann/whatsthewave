import React from 'react';

/*
const App = () => {
    return (
        <div>
            <h1>App</h1>
        </div>
    );
}

export default App;
*/

import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends React.Component {
    render() {
        return (
            <Map
            google = {this.props.google}
            zoom = {14}
            style = {mapStyles}
            initialCenter = {
                {
                lat: 73.6789,
                lng: 42.7298
                }
            }
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDdIBVvzNbyOpiU1qvyJiWbAW6CFm1KoQs'
})(MapContainer);