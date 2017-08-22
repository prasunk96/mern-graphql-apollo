import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const UserProfileHeader = () => (
    <Header as='h2' icon>
        <Icon name='settings' />
            Profile Settings
        <Header.Subheader>
             View and Manage Your Profile Settings
        </Header.Subheader>
    </Header>
    )
    
export default UserProfileHeader;