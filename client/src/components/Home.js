import React from 'react';
import { Image, Header, Icon } from 'semantic-ui-react';


const Home = () => (
    <div id='home-wrapper'>
        
        <Image src='https://s3-us-west-1.amazonaws.com/learnreact/assets/react-graphql-apollo.svg'
               width={300} centered/>
        
        <Header as='h1' textAlign='center'>
            <Header.Content>React Connect</Header.Content>
            <Header.Subheader>A Peer to Peer Learning Platform for React</Header.Subheader>
            <Header.Content>
                <a href='#test'>
                    <Icon name='arrow down' color='orange' size='small'/>
                </a>
            </Header.Content>
        </Header>
        <p id='test'>TEST</p>
               
    </div>
    );

export default Home;