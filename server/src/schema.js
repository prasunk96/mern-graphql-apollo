import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type User {
    id: ID!
    username: String
    email: String
    password: String
    createdOn: String
}

input UserInput {
    username: String
    email: String
    password: String
}

type Query {
    users: [User]
    user(id: ID!): User
}

type Mutation {
    addUser(user: UserInput!): User
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };