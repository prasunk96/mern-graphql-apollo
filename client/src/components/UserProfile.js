import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Header } from 'semantic-ui-react';
import AddUserAvatarWithMutation from './mutations/AddUserAvatar';

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

        if(data.error)return(<h1>{data.error}</h1>);
        if(data.loading)return(<h1>Loading</h1>);
        if(data.me===null)return(<h1>NOT AUTHENTICATED</h1>);
        if(data.me){
            return(
            <div>
            <Header as='h1'>{data.me.username}</Header>
            {data.me.id ? <h1>hello</h1> : null}
            <AddUserAvatarWithMutation/>
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
        }
    }
`;

const profilePicSubscription = gql`
    subscription userAddedAvatar {
        userAddedAvatar{
            id
            username
            email
            profilePic
            createdOn
        }
    }
`;

const UserProfileWithInfo = graphql(getUserInfo)(UserProfile);

export default UserProfileWithInfo;

