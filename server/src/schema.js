import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type User {
    id: ID!
    username: String
    email: String
    password: String
    profilePic: String
    createdOn: String
}

input UserInput {
    username: String
    email: String
    password: String
}

input ProfilePic {
    profilePic: String!
}

type Query {
    users: [User]
    user(id: ID!): User
    me: User
}

type Mutation {
    addUser(user: UserInput!): User
    addProfilePic(input: ProfilePic!): User
}

type Subscription {
    userSignedUp(id: String!): User
    userAddedAvatar: User
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };