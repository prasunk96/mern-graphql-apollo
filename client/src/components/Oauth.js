import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { withRouter } from 'react-router';

class Oauth extends Component {
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        
        const data = this.props.data;
        
        if(data.error)return(<div className='user-profile-wrapper'><h1>{data.error.message}</h1></div>);
        if(data.loading)return(<div className='user-profile-wrapper'><h1>Loading</h1></div>);
        if(data.fbUser===null)return(<div className='user-profile-wrapper'><h1>NOT AUTHENTICATED</h1></div>);
        if(data.fbUser){
            this.props.login();
            window.localStorage.setItem('token', data.fbUser.jwt);
            window.localStorage.setItem('profilePic', data.fbUser.profilePic);
            return(
            <div className='user-profile-wrapper'>
                <h1>Hey, {data.fbUser.username}, you have successfully logged in with Facebook</h1>
            </div>
            );
        }
    }
}

const getFbUser = gql`
    query getFbUser($fbId: String){
        fbUser(fbId: $fbId){
            username
            profilePic
            jwt
        }
    }
`
const OauthWithUser = graphql(getFbUser, {options: (props) => ({ variables: { fbId: props.match.params.fbid }}) })(withRouter(Oauth))
export default OauthWithUser