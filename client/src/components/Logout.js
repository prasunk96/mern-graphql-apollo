import React, { Component } from 'react';

export default class Logout extends Component{
    componentDidMount(){
        this.props.logout();
        window.localStorage.removeItem('token');
    }
    render(){
        return(
            <h1>You are LoggedOut</h1>
            );
    }
}