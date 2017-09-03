import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { Grid } from 'semantic-ui-react';
import UserConnectionMap from './connection-sub-comp/ConnectionMap';
import ConnectionCard from './connection-sub-comp/ConnectionCard';
import ConnectionChat from './connection-sub-comp/ConnectionChat';

var markers;
var dmInfo;

class Connection extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedUser: {}
        }
    }
    markerClick = (target) => {
        markers.map(marker => {
            if(marker === target){
                this.setState({
                    selectedUser: {
                        username: marker.title,
                        profilePic: marker.profilePic,
                        skills: marker.skills
                    }
                })
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
        dmInfo = [];
        this.props.data.users.forEach( (user, index) => {
            markers.push({position: new window.google.maps.LatLng(user.lat, user.lon),
                          title: user.username,
                          skills: user.skills,
                          profilePic: user.profilePic
            })
            dmInfo.push({id: user.id, 
                         username: user.username, 
                         profilePic: user.profilePic
            })
        })
        
        return(
            <div className='user-profile-wrapper'>
                
                <Grid columns={2}>
                    
                    <Grid.Column width={10}>
                        <UserConnectionMap markers={markers} markerClick={this.markerClick}/>
                    </Grid.Column>
                    
                    <Grid.Column width={6}>
                        <ConnectionCard user={this.state.selectedUser}/>
                    </Grid.Column>
                
                </Grid>
                <ConnectionChat dmInfo={dmInfo} dms={this.props.user.me.dms} userAvatar={this.props.user.me.profilePic}/>
            </div>
            );
        }

    }
}

const getAllUsers = gql`
    query getAllUsers {
        users {
            id
            username
            lat
            lon
            profilePic
            skills {
                name
                value
            }
        }
    }
`

const getUser = gql`
    query getUser {
        me {
            profilePic
            dms {
                id
                partner
                comments {
                    id
                    author
                    text
                    postedOn
                }
            }
        }
    }
`

const ConnectionWithData = compose(
    graphql(getAllUsers, { name: 'data' }),
    graphql(getUser, { name: 'user' })
    )(Connection)
export default ConnectionWithData