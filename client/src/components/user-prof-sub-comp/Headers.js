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
    
const UserSkillsHeaderMessage = () => (
    <div id='user-skills-header'>
        <Header as='h1' attached='top' textAlign='center'>Skill Rating Self Evaluation</Header>
        <Message attached color='orange'>
            <Message.Content>
                <Icon name='info'/> &nbsp;
                Rate yourself in the following React sub-skills. Click the appropriate number of &nbsp; 
                <Icon name='star'/>
                , between zero and five.  Zero represents no experience with the skill, and Five represents 
                mastery of the skill.  Be as objective as possible when assigning stars.
            </Message.Content>
        </Message>
    </div>
    )


export { UserEditProfileHeader, UserViewProfileHeader, UserSkillsHeaderMessage };