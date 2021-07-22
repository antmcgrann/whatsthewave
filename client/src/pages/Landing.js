import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import React from 'react';

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
                        lat: 42.7298,
                        lng: 73.6789
                    }
                }
            >
            <Marker key="marker_1"
                icon={{
                    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Buoy.svg',
                    anchor: new this.props.google.maps.Point(32,32),
                    scaledSize: new this.props.google.maps.Size(32,32)
                }}

                position={{
                    lat: 42.7298,
                    lng: 73.6789
                }}
            />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDdIBVvzNbyOpiU1qvyJiWbAW6CFm1KoQs'
})(MapContainer);
