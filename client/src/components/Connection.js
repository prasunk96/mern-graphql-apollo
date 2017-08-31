import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Grid } from 'semantic-ui-react';
import UserConnectionMap from './connection-sub-comp/ConnectionMap';

var markers;

class Connection extends Component {

    markerClick = (target) => {
        console.log(target);
        markers.map(marker => {
            if(marker===target){
                console.log(marker);
                return {...marker};
            }
            
            return marker;
            });
    }
    
    render(){
        const data = this.props.data;
        
    if(data.error)return(<div className='user-profile-wrapper'><h1>{data.error.message}</h1></div>);
    if(data.loading)return(<div className='user-profile-wrapper'><h1>Loading</h1></div>);
    if(data.users){
        markers = [];
        this.props.data.users.forEach( (user, index) => {
            markers.push({position: new window.google.maps.LatLng(user.lat, user.lon),
                          title: user.username
            })
        })
        
        return(
            <div className='user-profile-wrapper'>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                        <UserConnectionMap markers={markers} markerClick={this.markerClick}/>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <h1>hello</h1>
                    </Grid.Column>
                </Grid>
            </div>
            );
        }

    }
}

const getAllUsers = gql`
    query getAllUsers {
        users {
            username
            lat
            lon
        }
    }
`
const ConnectionWithData = graphql(getAllUsers)(Connection)
export default ConnectionWithData