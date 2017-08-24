import React from 'react';
import { List } from 'semantic-ui-react';

const Glossary = () => (
    <List divided>
    
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>React DOM</List.Header>
                <List.Description>Renders React to web browsers</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>React Native</List.Header>
                <List.Description>Renders React to mobile devices</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>ES6</List.Header>
                <List.Description>A Javascript standard that is used to write React code.  Contains helpful features for React. Babel is used to transpile this code to browser friendly ES5.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>State & Props</List.Header>
                <List.Description>State determines how a component renders and behaves. State is dynamic, making components interactive.  Props are component properties.  Data is passed to and from components through props.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>JSX</List.Header>
                <List.Description>Commonly used to write React components.  It combines Javascript with XML, creating a syntax that closely resembles HTML.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>Create React App</List.Header>
                <List.Description>A popular tool for bootstrapping React projects.  CRA takes care of Webpack configuration and provides a basic file structure.  This greatly simplifies development.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>React Router 4</List.Header>
                <List.Description>Provides a client side router for single page application made with React.  Available for both ReactDOM and React Native.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>React Apollo</List.Header>
                <List.Description>Provides a GraphQL client for a React App.  Creates a client side data store and communicates with a GraphQL server.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>Helmet</List.Header>
                <List.Description>Provides tools to create a base HTML document for a React App.  Has tools to inject various tags into HTML document HEAD.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>Component Libraries</List.Header>
                <List.Description>Various 3rd party libraries provide pre-made React Components that are configurable via props.  These include Semantic UI React, React BootStrap, Material UI, and many more.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>Server Side Render</List.Header>
                <List.Description>Renders React App on the server prior to delivering it to the browser.  Need to look into this more.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>Webpack</List.Header>
                <List.Description>Bundler of choice for the React Community.  Creates one Javascript file from many build files.  Highly configurable through plugins, loaders, HMR, and Webpack's optional development server.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>Higher Order Components</List.Header>
                <List.Description>Function Wrappers for Components that return a new Component with added functionality.  An important concept to understand when using many 3rd party libraries.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>Redux</List.Header>
                <List.Description>A 3rd party library that provides a data store for a React App. Has emerged as an important part of the React Ecosystem.</List.Description>
            </List.Content>
        </List.Item>
        
        <List.Item>
            <List.Icon name='github'/>
            <List.Content>
                <List.Header>Lifecycle Methods</List.Header>
                <List.Description>When Component State changes, React re-renders the Component.  This process entails multiple steps, which can be accessed via Lifecycle Methods.  ComponentWillMount, Render and ShouldComponentUpdate are a few examples.</List.Description>
            </List.Content>
        </List.Item>
    </List>
    
    )
    
export default Glossary;