import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import Routes from './components/Routes';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { authHeaderMiddleware } from './middleware';

const wsClient = new SubscriptionClient(`wss://apollo-react-project-benjaminadk.c9users.io:8081/subscriptions`, {
  reconnect: true
});

const networkInterface = createNetworkInterface({
  uri: 'https://apollo-react-project-benjaminadk.c9users.io:8081/graphql'
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

networkInterface.use([authHeaderMiddleware]);

class App extends Component {

  render() {
    return (
        <ApolloProvider client={client}>
          <Routes resetStore={client.resetStore}/>
        </ApolloProvider>
    );
  }
}

export default App;
