import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const ConnectionMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={4}
    defaultCenter={props.center}>
    
    {props.markers.map( (marker, index) => (
        <Marker key={index}
                title={marker.title}
                icon='https://s3-us-west-1.amazonaws.com/learnreact/assets/my-marker.png'
                animation={window.google.maps.Animation.DROP}
                onClick={props.markerClick}
                position={marker.position}>
        </Marker>
    ))}
    
    </GoogleMap>
    ));
    
export default class UserConnectionMap extends Component {
    render(){
        const mapContainerStyle = { height: `75vh`, width: `55vw`, position: `relative`, margin: `5vh 2vw`, border: `1px solid #e5e5e5`, borderRadius: `5px`, boxShadow: `2px 5px 5px #e5e5e5` }
        const mapElementStyle = { height: `75vh`, width: `55vw`, borderRadius: `5px` }
        return(
            <ConnectionMap
                containerElement={<div style={mapContainerStyle} />}
                mapElement={<div style={mapElementStyle} />}
                center={{ lat: 36, lng: -97 }}
                markers={this.props.markers}
                markerClick={this.props.markerClick}
                />
            );
    }
}