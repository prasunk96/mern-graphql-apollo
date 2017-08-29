import express from 'express';
import { graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { schema } from './src/schema';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { handleLogin, verifyUser } from './src/controllers';
import passport from 'passport';
import { fbStratedy, fbScope, fbCallback, fbRedirect } from './src/controllers/fbAuth';

//BRINGS IN ENVIRONMENT VARIABLES THAT SHOULD STAY HIDDEN
require("dotenv").config();

//SHORTCUT CONSTANTS FOR DEVELOPMENT URLS
const PORT = 8081;
const HOST = `://${process.env.C9_HOSTNAME}`;

//INSTANTIATE EXPRESS AS SERVER
const server = express();

//PASSPORT CONFIG AND INIT
passport.use(fbStratedy);
server.use(passport.initialize());

//ROUTES FOR FACEBOOK OAUTH
server.get('/auth/facebook', fbScope);
server.get('/auth/facebook/callback', fbCallback, fbRedirect);

//CORS ENABLED SO I CAN USE SEPERATE PORTS FROM THE SAME HOST CLIENT & SERVER
server.use('*', cors({ origin: `https${HOST}` }));

//VERIFIES JWT
server.use(verifyUser);

//INIT FOR GRAPHQL SERVER
server.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: {
    user: req.user
  }
}))
);

//INIT FOR GRAPHIQL GUI TOOL
server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws${HOST}:${PORT}/subscriptions`
}));

//HANDLES LOCAL LOGIN STRATEGY OUTSIDE OF GRAPHQL SERVER
server.post("/login", bodyParser.urlencoded({ extended: true }), handleLogin);

//INIT WEBSOCKET SERVER BY WRAPPING SERVER 
const ws = createServer(server);

//WEBSOCKET SERVER NOW LISTENS TO PORT AND ADDS SUBSCRIPTION CAPABILITIES
ws.listen(PORT,() => {
    console.log(`graphql server up at: http${HOST}:${PORT}/graphql `);
    
 new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});