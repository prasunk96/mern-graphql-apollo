import jwt from 'jsonwebtoken';
import { User } from '../connectors';
const jwtSecret = process.env.JWT_SECRET;


export const handleLogin = (req, res, next) => {
  let data = JSON.parse(Object.keys(req.body)[0]);
  let password = data.password;
  let username = data.username;
  User.attemptLogin(username, password, (err, user) => {
      if(err){return next(err)}
      
      let isAuthenticated = (!!user);
      if(isAuthenticated){
          return res.json({newToken: jwt.sign({ email: user.email, username: user.username, id: user.id}, jwtSecret, { expiresIn: '24h' })});
      }
      else{
          res.json({"error": "Invalid Username or Password"});
      }
  });
}

export const verifyUser = (req, res, next) => {
  const token = req.headers['authorization'];
    jwt.verify(token, jwtSecret, (err, user) => {
      if(err)console.error(err.message);
      req.user = user;
    if(!user){
      console.log("User Not Authorized");
    }
      next();
    });
};

