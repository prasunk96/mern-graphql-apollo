import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import UserProfileFormWithMutation from './user-prof-sub-comp/UserProfileForm';
import Info from './user-prof-sub-comp/Info';
import UserProfileHeader from './user-prof-sub-comp/Header';

class UserProfile extends Component{
    constructor(props){
        super(props)
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
    
    stuff = () => {
        console.log(this.props)
        console.log(this.state)
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
              <Info data={data.me}/>
              <UserProfileFormWithMutation data={data.me}/>
          
            <button onClick={this.stuff}>STUFF</button>
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
        }
    }
`;

const UserProfileWithInfo = graphql(getUserInfo)(UserProfile);

export default UserProfileWithInfo;

