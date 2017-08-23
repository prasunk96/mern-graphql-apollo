import React from 'react';
import { Card, Progress, Tab } from 'semantic-ui-react';


const UserSkills = ({ data }) => {
    
    const Fundamentals = () => (
    <div>
        { data.skills.slice(0,5).map((skill, index) => {
            return(
            <Progress key={index} total={5} value={skill.value} label={skill.name} />
            )
        })}
    </div>
    )
    
    const PopularTools = () => (
        <div>
            { data.skills.slice(5,10).map((skill, index) => {
                return(
                <Progress key={index} total={5} value={skill.value} label={skill.name} />
                )
            })}
        </div>
    )
    
    const AdvancedTopics = () => (
        <div>
            { data.skills.slice(10).map((skill, index) => {
                return(
                <Progress key={index} total={5} value={skill.value} label={skill.name} />
                )
            })}
        </div>
    )
    
    const panes = [
    { menuItem: { key: 'Fundamentals', icon: 'cubes', content: 'Fundamentals' }, render: () => <Tab.Pane><Fundamentals/></Tab.Pane>},
    { menuItem: { key: 'Popular Tools', icon: 'thermometer full', content: 'Popular Tools'}, render: () => <Tab.Pane><PopularTools/></Tab.Pane>},
    { menuItem: { key: 'Advanced Topics', icon: 'stack overflow', content:'Advanced Topics'}, render: () => <Tab.Pane><AdvancedTopics/></Tab.Pane>},
    { menuItem: { key: 'Glossary', icon:'help', content: 'Glossary'}, render: () => <Tab.Pane>Skill Glossary</Tab.Pane>}
    ]

    return(
        <Card id='user-skills-card' raised>
            <Card.Header as='h2'>React Skills Breakdown</Card.Header>
            <Card.Content>
                <Tab menu={{ pointing: true }} panes={panes}/>
            </Card.Content>
        </Card>
        )
}

export default UserSkills