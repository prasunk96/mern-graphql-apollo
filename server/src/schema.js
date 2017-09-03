import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
type Skill {
    name: String
    value: Int
}

input SkillInput {
    name: String
    value: Int
}

type DMComment {
    id: ID
    author: ID
    text: String
    postedOn: String
}

type DMConversation {
    id: ID
    partner: ID
    comments: [DMComment]
}

input DMInput {
    partner: ID
    text: String
}

type User {
    id: ID
    username: String
    email: String
    password: String
    profilePic: String
    lat: Float
    lon: Float
    city: String
    bio: String
    skills: [Skill]
    dms: [DMConversation]
    createdOn: String
    fbId: String
    jwt: String
}

input UserInput {
    username: String
    email: String
    password: String
}

input ProfileInput {
    profilePic: String
    bio: String
    lat: Float
    lon: Float
    city: String
    skills: [SkillInput]
}

type Query {
    users: [User]
    user(id: ID!): User
    me: User
    fbUser(fbId: String): User
}

type Mutation {
    addUser(user: UserInput!): User
    addUserProfile(input: ProfileInput!): User
    addDMComment(input: DMInput!): DMConversation 
}

type Subscription {
    userAddedUserProfile: User
    userAddDMComment(convId: ID): DMConversation
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };