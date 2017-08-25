import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Portal, Button } from 'semantic-ui-react';
import UserProfileFormWithMutation from './user-prof-sub-comp/UserProfileForm';
import UserCard from './user-prof-sub-comp/UserCard';
import UserSkills from './user-prof-sub-comp/UserSkills';
import { UserEditProfileHeader, UserViewProfileHeader } from './user-prof-sub-comp/Headers';
import UserProfileMap from './user-prof-sub-comp/UserMap';

class UserProfile extends Component{
   constructor(props){
     super(props);
     this.state = {
       open: false
     }
   }
   
    componentWillMount(){
        this.props.data.subscribeToMore({
            document: profilePicSubscription,
            variables: {},
            updateQuery: (prev, {subscriptionData}) => {
        if(!subscriptionData.data){
          return prev;
        }
        const newUser = subscriptionData.data.user;
        console.log('subscription fired');
        return newUser;
            }
        })
    }
    
    handleOpen = () => this.setState({open: true})
    
    handleClose = () => this.setState({open: false})
    
    render(){
        const data = this.props.data;

        if(data.error)return(<div className='user-profile-wrapper'><h1>{data.error.message}</h1></div>);
        if(data.loading)return(<div className='user-profile-wrapper'><h1>Loading</h1></div>);
        if(data.me===null)return(<div className='user-profile-wrapper'><h1>NOT AUTHENTICATED</h1></div>);
        if(data.me){
            return(
            <div className='user-profile-wrapper'>
          
              <UserViewProfileHeader/>

            {data.me.bio === '' ? null :
              <div className='flex-row'>
                <UserCard data={data.me}/>
                <UserSkills data={data.me}/>
              </div>}
              
              {/* <UserProfileMap data={data.me}/>*/}
              
              <Portal 
                openOnTriggerClick
                closeOnTriggerClick
                onOpen={this.handleOpen}
                onClose={this.handleClose}
                trigger={(
                  <Button id='portal-button'
                          content={this.state.open ? 'Close Profile Options' : 'Create or Edit Your Profile' }
                          color={this.state.open ? 'black' : 'orange'}/>
                  
                  )}>
                
              <div>
                <UserEditProfileHeader/>
                <UserProfileFormWithMutation data={data.me}/>
              </div>
              
              </Portal>
            
            </div>
            );
        }
        
    }
}

const getUserInfo = gql`
    query getUserInfo {
        me {
            id
            username
            email
            profilePic
            createdOn
            bio
            lat
            lon
            city
            skills{
              name
              value
            }
        }
    }
`;

const profilePicSubscription = gql`
    subscription userAddedUserProfile {
        userAddedUserProfile{
            id
            username
            email
            profilePic
            createdOn
            bio
            lat
            lon
            city
            skills{
              name
              value
            }
        }
    }
`;

const UserProfileWithInfo = graphql(getUserInfo)(UserProfile);

export default UserProfileWithInfo;

