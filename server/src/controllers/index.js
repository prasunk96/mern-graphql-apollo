import jwt from 'jsonwebtoken';
import { User } from '../connectors';
const jwtSecret = process.env.JWT_SECRET;


export const handleLogin = (req, res, next) => {
  let data = JSON.parse(Object.keys(req.body)[0]);
  let password = data.password;
  let username = data.username;
  console.log(jwtSecret);
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

