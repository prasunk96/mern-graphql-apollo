import React from 'react';
import { Card, Progress, Tab, Header, Segment, Icon } from 'semantic-ui-react';
import Glossary from './Glossary';

const UserSkills = ({ data }) => {
    
    const Fundamentals = () => (
    <div>
        { data.skills.slice(0,5).map((skill, index) => {
            return(
            <Progress key={index} total={5} value={skill.value} label={skill.name} color='teal' />
            )
        })}
    </div>
    )
    
    const PopularTools = () => (
        <div>
            { data.skills.slice(5,10).map((skill, index) => {
                return(
                <Progress key={index} total={5} value={skill.value} label={skill.name} color='teal' />
                )
            })}
        </div>
    )
    
    const AdvancedTopics = () => (
        <div>
            { data.skills.slice(10).map((skill, index) => {
                return(
                <Progress key={index} total={5} value={skill.value} label={skill.name} color='teal' />
                )
            })}
        </div>
    )
    
    const panes = [
    { menuItem: { key: 'Fundamentals', icon: 'cubes', content: 'Fundamentals' }, render: () => <Tab.Pane><Fundamentals/></Tab.Pane>},
    { menuItem: { key: 'Popular Tools', icon: 'thermometer full', content: 'Popular Tools' }, render: () => <Tab.Pane><PopularTools/></Tab.Pane>},
    { menuItem: { key: 'Advanced Topics', icon: 'stack overflow', content:'Advanced Topics' }, render: () => <Tab.Pane><AdvancedTopics/></Tab.Pane>},
    { menuItem: { key: 'Glossary', icon:'help', content: 'Glossary'}, render: () => <Tab.Pane><Glossary/></Tab.Pane>}
    ]

    return(
        <Card id='user-skills-card' raised>
            <Card.Content>
                <Segment textAlign='center' color='orange' inverted>
                    <Header as='h3' icon>
                        <Icon name='github'/>
                        React Skills Breakdown
                    </Header>
                </Segment>
            </Card.Content>
            <Card.Content>
                <Tab menu={{ pointing: true }} panes={panes} defaultActiveIndex={3} />
            </Card.Content>
        </Card>
        )
}

export default UserSkills