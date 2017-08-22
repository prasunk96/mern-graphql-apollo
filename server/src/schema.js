import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type User {
    id: ID!
    username: String
    email: String
    password: String
    profilePic: String
    lat: String
    lon: String
    city: String
    bio: String
    createdOn: String
}

input UserInput {
    username: String
    email: String
    password: String
}

input ProfileInput {
    profilePic: String
    bio: String
    lat: String
    lon: String
    city: String
}

type Query {
    users: [User]
    user(id: ID!): User
    me: User
}

type Mutation {
    addUser(user: UserInput!): User
    addUserProfile(input: ProfileInput!): User
}

type Subscription {
    userSignedUp(id: String!): User
    userAddedUserProfile: User
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };