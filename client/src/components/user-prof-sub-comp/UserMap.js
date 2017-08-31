import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const UserProfileGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.center}>
    
    <Marker position={props.marker[0].position}
            onClick={props.toggleInfo}>
        
        {props.showInfo ? <InfoWindow>
                            <div>                    
                                <Icon name='home'/>
                                <span>{props.username}</span>
                            </div>
                                 </InfoWindow>
                               : null}
        
    </Marker>
    
    
    
  </GoogleMap>
));


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
      const mapContainerStyle = { height: `50vh`, width: `100vh`, position: `relative`, margin: `5vh auto`, border: `1px solid #e5e5e5`, borderRadius: `5px`, boxShadow: `2px 5px 5px #e5e5e5` }
      const mapElementStyle = { height: `50vh`, width: `100vh`, borderRadius: `5px` }
      let lat = this.props.data.lat
      let lng = this.props.data.lon
      let marker = [{position: new window.google.maps.LatLng(lat,lng)}]
    return (
      <UserProfileGoogleMap
        containerElement={<div style={mapContainerStyle} />}
        mapElement={<div style={mapElementStyle} />}
        center={{lat: lat, lng: lng }}
        marker={marker}
        showInfo={this.state.showInfo}
        toggleInfo={this.toggleInfo}
        username={this.props.data.username}
      />
    );
  }
}