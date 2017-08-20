import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Header } from 'semantic-ui-react';

class UserProfile extends Component{
    
    render(){
        const data = this.props.data;

        if(data.error)return(<h1>{data.error}</h1>);
        if(data.loading)return(<h1>Loading</h1>);
        if(data.me===null)return(<h1>User Not Authenticated</h1>);
        if(data.me){
            return(
            <div>
            <Header as='h1'>{data.me.username}</Header>
            {data.me.id ? <h1>hello</h1> : null}
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
        }
    }
`;

const UserProfileWithInfo = graphql(getUserInfo)(UserProfile);

export default UserProfileWithInfo;