import React, { Component } from 'react';

export default class Logout extends Component{
    componentDidMount(){
        this.props.logout();
        window.localStorage.removeItem('token');
    }
    render(){
        return(
            <h1 style={{marginTop: `15vh`}}>You are LoggedOut</h1>
            );
    }
}