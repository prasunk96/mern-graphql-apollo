import mongoose from 'mongoose';
import UserSchema from './models/user';
require("dotenv").config();

const URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds153123.mlab.com:53123/apollo-app-02`;
const options = {useMongoClient: true};
const callback = (err) => {
    if(err){return new Error(err)}
    console.log("Connected to mLab....");
}
mongoose.connect(URI, options, callback);
mongoose.Promise = global.Promise;

const User = mongoose.model("Users", UserSchema);

export { User };