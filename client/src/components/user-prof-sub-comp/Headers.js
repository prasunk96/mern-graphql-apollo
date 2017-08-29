import React from 'react';
import { Header, Icon, Message } from 'semantic-ui-react';

const UserViewProfileHeader = () => (
    <Header as='h1' icon>
        <Icon name='user' />
            User Profile
        <Header.Subheader>
            View Your User Profile Card & React Skills Chart
        </Header.Subheader>
    </Header>
    )

const UserEditProfileHeader = () => (
    <Header as='h1' icon textAlign='center'>
        <Icon name='settings' />
            Profile Settings
        <Header.Subheader>
             View and Manage Your User Profile Settings
        </Header.Subheader>
    </Header>
    )
    
const UserEditMessage = () => (
    <Message>
        <Message.Header></Message.Header>
    </Message>
    )


export { UserEditProfileHeader, UserViewProfileHeader };