import { User } from './connectors';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

let nextId = 1;

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
            return User.findOne({id: context.user.id}, (err, user) => {
                if(err) throw new Error(err);
                return user;
            })
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
         addUserProfile: (root, { input }, context) => {
                let update = { profilePic: input.profilePic, bio: input.bio, lat: input.lat, lon: input.lon, city: input.city };
                let query = { id: context.user.id };
                let options = { new: true, upsert: true};
                return User.findOneAndUpdate(query, update, options).exec()
                .then(user => {
                pubsub.publish('userAddedUserProfile', {userAddedUserProfile: user})
                return user 
                })

            }
             
    },
    Subscription: {
        userSignedUp: {
            subscribe: () => pubsub.asyncIterator('userSignedUp')
        },
        userAddedUserProfile: {
            subscribe: () => pubsub.asyncIterator('userAddedUserProfile')
        }
    }
}