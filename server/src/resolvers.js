import { User } from './connectors';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

let nextId = 4;

export const resolvers = {
    Query: {
        users: (root, args) => {
            return User.find({}, (err, users) => {
                if(err) throw new Error(err);
                return users;
            })
        },
        user: (root, { id }) => {
            return User.findOne({id: id}, (err, user) => {
                if(err) throw new Error(err);
                return user;
            })
        },
        me: (root, args, context) => {
            console.log('me query');
            return context.user
        }
    },
    Mutation: {
        addUser: (root, { user }) => {
            let newUser = new User({id: String(nextId++), username: user.username, email: user.email, password: user.password});
            return newUser.save((err) => {
                if(err) console.log(err.message);
                console.log(newUser)
                return newUser;
            })
        },
         addProfilePic: (root, { input }, context) => {
                let update = { profilePic: input.profilePic };
                let query = { id: context.user.id };
                let options = { new: true, upsert: true};
                return User.findOneAndUpdate(query, update, options).exec()
                .then(user => {
                pubsub.publish('userAddedAvatar', {userAddedAvatar: user})
                return user 
                })

            }
             
    },
    Subscription: {
        userSignedUp: {
            subscribe: () => pubsub.asyncIterator('userSignedUp')
        },
        userAddedAvatar: {
            subscribe: () => pubsub.asyncIterator('userAddedAvatar')
        }
    }
}