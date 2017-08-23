import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.center}>
    
    <Marker position={props.marker[0].position}
            onClick={props.toggleInfo}>
        
        {props.showInfo ? <InfoWindow>
                                    <Icon name='home'/>
                                 </InfoWindow>
                               : null}
        
    </Marker>
    
    
    
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class UserProfileMap extends Component {
    constructor(){
        super()
    this.state = {
        showInfo: false
            }
    }
    
    toggleInfo = () => {
        this.setState({showInfo: !this.state.showInfo})
    }
    
  render() {
      const mapContainerStyle = {height: `50vh`, width: `50vh`, position: `relative`}
      const mapElementStyle = {height: `50vh`, width: `50vh`}
      let lat = this.props.data.lat
      let lng = this.props.data.lon
      let marker = [{position: new window.google.maps.LatLng(lat,lng)}]
    return (
      <SimpleMapExampleGoogleMap
        containerElement={<div style={mapContainerStyle} />}
        mapElement={<div style={mapElementStyle} />}
        center={{lat: lat, lng: lng }}
        marker={marker}
        showInfo={this.state.showInfo}
        toggleInfo={this.toggleInfo}
      />
    );
  }
}