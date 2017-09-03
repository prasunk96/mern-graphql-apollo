import React, { Component } from 'react';
import { Card, Image, Segment, Progress, Button } from 'semantic-ui-react';

class ConnectionCard extends Component {
    render(){
        const user = this.props.user
        return(
            <Card id='connection-card' raised>
                
                <Card.Content>
                    
                    <Segment color='orange' inverted raised>
                        <Card.Header id='connection-header'>
                            {user.username}
                            <Image src={user.profilePic}/>
                        </Card.Header>
                    </Segment>
                    
                    <Segment id='connection-skills' raised>
                        { user.skills === undefined || user.skills.length === 0 ? null : 
                            user.skills.map( (skill, index) => {
                                return(
                                <Progress key={index}
                                          size='tiny'
                                          color='teal'
                                          total={5}
                                          value={skill.value}
                                          label={skill.name}
                                          />
                                )
                            })
                         }
                    </Segment>
                    
                    <Segment id='connection-button' raised>
                        <Button color='orange' fluid>Send Message To {user.username}</Button>
                    </Segment>
                
                </Card.Content>
            
            </Card>
            );
    }
}

export default ConnectionCard;