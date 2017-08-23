import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Button } from 'semantic-ui-react';
import UserProfileFormWithMutation from './user-prof-sub-comp/UserProfileForm';
import UserCard from './user-prof-sub-comp/UserCard';
import UserSkills from './user-prof-sub-comp/UserSkills';
import UserProfileHeader from './user-prof-sub-comp/Header';
import UserProfileMap from './user-prof-sub-comp/UserMap';

class UserProfile extends Component{
   
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
    
    stuff = () => {
        console.log(this.props)
    }
    
    render(){
        const data = this.props.data;

        if(data.error)return(<h1>{data.error.message}</h1>);
        if(data.loading)return(<h1>Loading</h1>);
        if(data.me===null)return(<h1>NOT AUTHENTICATED</h1>);
        if(data.me){
            return(
            <div className='user-profile-wrapper'>
              
              <UserProfileHeader/>
              
              <div className='flex-row'>
                <UserCard data={data.me}/>
                <UserSkills data={data.me}/>
              </div>
              {/*<UserProfileMap data={data.me}/>*/}
              <UserProfileFormWithMutation data={data.me}/>
          
            <Button onClick={this.stuff}>CONSOLE LOG PROPS</Button>
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

