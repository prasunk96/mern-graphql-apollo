import express from 'express';
import { graphqlExpress, graphiqlExpress,} from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { schema } from './src/schema';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { handleLogin, verifyUser } from './src/controllers';

const PORT = 8081;
const HOST = `://${process.env.C9_HOSTNAME}`;
const server = express();

server.use('*', cors({ origin: `https${HOST}` }));

server.use(verifyUser);

server.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: {
    user: req.user
  }
}))
);

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws${HOST}:${PORT}/subscriptions`
}));

server.post("/login",bodyParser.urlencoded({ extended: true }), handleLogin);

const ws = createServer(server);

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