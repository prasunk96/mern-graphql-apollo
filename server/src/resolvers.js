import { User } from './connectors';

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
        }
    },
    Mutation: {
        addUser: (root, { user }) => {
            let newUser = new User({id: String(nextId++), username: user.username, email: user.email, password: user.password});
            return newUser.save((err) => {
                if(err) throw new Error(err);
                return newUser;
            })
        }
    }
}