import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    name: {
        type: String
    },
    value: {
        type: Number
    }
});

let User;

const DMCommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId
    },
    text: {
        type: String
    },
    postedOn: {
        type: Date,
        default: Date.now()
    }
})

const DMConversationSchema = new Schema({
    partner: {
        type: Schema.Types.ObjectId
    },
    comments: [DMCommentSchema]    
})

const UserSchema = new Schema({
   fbId: {
     type: String,
     default: ''
   },
   jwt: {
       type: String,
       default: ''
   },
   username: {
       type: String,
       unique: true,
       trim: true
   },
   email: {
       type: String,
       unique: true,
       trim: true,
       lowercase: true
   },
   password: {
       type: String
   },
   profilePic: {
       type: String,
       default: ''
   },
   bio: {
       type: String,
       default: ''
   },
    lat: {
        type: Number,
        default: 0
    },
    lon: {
       type: Number,
       default: 0
    },
    city: {
       type: String,
       default: ''
   },
   skills: [SkillSchema],
   dms: [DMConversationSchema],
   createdOn: {
       type: Date,
       default: Date.now()
   }
});

//PRE SAVE PASSWORD HASHING
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

//INSTANCE METHOD TO CHECK LOGIN PASSWORD AGAINST HASH
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//STATIC METHODS
UserSchema.static("findByUsername", function(username, cb){
    User.findOne({username: username}, cb)
});

UserSchema.static("findByFbId", function(fbId, cb){
    User.findOne({fbId: fbId}, cb)
});

UserSchema.static("attemptLogin", function(username, password, cb){
  User.findByUsername(username, function(err, user){
    if (err) { return cb(err); }

    if (!user){
      return cb();
    }

    user.comparePassword(password, function(err, isMatch){
      if (err) { return cb(err); }

      if (isMatch){ 
        return cb(null, user);
      } else {
        return cb();
      }

    });

  });
});

User = mongoose.model('User', UserSchema);

export default UserSchema;
