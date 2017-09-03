import { User } from './connectors';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
    Query: {
        users: (root, args) => {
            return User.find({}, (err, users) => {
                if(err) throw new Error(err);
                return users;
            })
        },
        user: (root, { id }) => {
            return User.findOne({_id: id}, (err, user) => {
                if(err) throw new Error(err);
                return user;
            })
        },
        me: (root, args, context) => {
            console.log('me query');
            if(context.user.id){
              return User.findById(context.user.id, (err, user) => {
                if(err) throw new Error(err);
                return user;
            });  
            }
            else if(context.user.fbId){
               return User.findOne({fbId: context.user.fbId}, (err, user) => {
                   if(err) throw new Error(err);
                   return user
               }); 
            }
            
        },
        fbUser: (root, { fbId }) => {
            return User.findOne({fbId: fbId}, (err, user) => {
                if(err) throw new Error(err);
                return user
            });
        }
    },
    Mutation: {
        addUser: (root, { user }) => {
            let newUser = new User({ username: user.username, email: user.email, password: user.password });
            return newUser.save((err) => {
                if(err) return console.log(err.message);
                
                return newUser;
            })
        },
        addUserProfile: (root, { input }, context) => {
        
                let update = { profilePic: input.profilePic, bio: input.bio, lat: input.lat, lon: input.lon, city: input.city, skills: input.skills };
                let query = { _id: context.user.id };
                let options = { new: true, upsert: true };
                return User.findOneAndUpdate(query, update, options).exec()
                .then( user => {
                pubsub.publish('userAddedUserProfile', {userAddedUserProfile: user})
                return user 
                })

            },
        addDMComment: (root, { input }, context) => {
            
                let comment = { author: context.user.id, text: input.text };
                let partner = input.partner;
                let query = User.findById(context.user.id);
                query.select('dms');
                return query.exec()
                
                .then( user => {
                    
                    let currentDM = user.dms.find( (dm) => {
                        return dm.partner == partner
                    })
                    console.log(`CURRENT: ${currentDM}`)
                    if(currentDM === undefined){
                        console.log('if block')
                        let newDM = { partner: partner, comments: [] };
                        newDM.comments.push(comment);
                        user.dms.push(newDM);
                        return user.save((err) => {
                            if(err) console.log(err.message)
                        })
                    }
                    else {
                        console.log('else if block')
                        currentDM.comments.push(comment);
                        return user.save((err) => {
                            if(err) console.log(err.message)
                        })
                    }
                }).then(user => {
                   return user.dms.find((dm) => {
                       return dm.partner == partner
                   })
                })
                
        }
             
    },
    Subscription: {

        userAddedUserProfile: {
            subscribe: () => pubsub.asyncIterator('userAddedUserProfile')
        }
    }
}