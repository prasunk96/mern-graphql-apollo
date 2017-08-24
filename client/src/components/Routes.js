import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { PropsRoute, PrivateRoute, userAuth } from './helpers';
import { Button, Menu, Image } from 'semantic-ui-react';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import NoMatch from './NoMatch';
import UserProfileWithInfo from './UserProfile';
import jwt from 'jwt-decode';


const LoggedOutButtons = (props) => (
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button color='orange' onClick={props.signout}>AUTH DIF COMPONENT</Button>
            </Menu.Item>
            <Menu.Item>
              <Link to='/login'><Button color='orange'>Login</Button></Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/signup'><Button color='orange'>Signup</Button></Link>
            </Menu.Item>
          </Menu.Menu>
  );


const LoggedInButtons = () => {
  let token = window.localStorage.getItem('token');
  let decoded = token ? jwt(token) : null;
  let profileLink = decoded ? `/user/${decoded.username}` : '/';
  let checkUrl = window.localStorage.getItem('profilePic');
  let picUrl = checkUrl !== 'null'||'undefined' ? checkUrl :'http://via.placeholder.com/150x150';
  return(
          <Menu.Menu position='right'>
            <Menu.Item>
              <Image shape='rounded' 
                     width={50} 
                     height={50}
                     src={picUrl} />
            </Menu.Item>
            <Menu.Item>
            <Link to={profileLink}><Button color='orange'>Profile</Button></Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/logout'><Button color='orange'>Logout</Button></Link>
            </Menu.Item>
          </Menu.Menu>
  );
}


class Routes extends Component{
  constructor(props){
    super(props);
    this.state = {
      userLoggedIn: false
    }
  }
  
  signout = () => userAuth.authenticate( () => console.log(userAuth.isAuthenticated))
  
  toggleUserLogin = () => {
    this.setState({userLoggedIn: !this.state.userLoggedIn});
  }
  
  render(){
    return(
    <Router>
      <div id='App'>
        
        <Menu fixed='top' inverted>
          <Menu.Item>
            <Link to='/'>
              <Image width={50} 
                     height={50} 
                     src='https://s3-us-west-1.amazonaws.com/learnreact/assets/react-graphql-apollo.svg' />
            </Link>
          </Menu.Item>
          
          {this.state.userLoggedIn === false ? <LoggedOutButtons signout={this.signout}/> : <LoggedInButtons/>}
        
        </Menu>
        
        <Switch>
          <Route exact path='/' component={Home}/>
          <PropsRoute path='/login' component={Login} login={this.toggleUserLogin}/>
          <PropsRoute path='/logout' component={Logout} logout={this.toggleUserLogin}/>
          <Route path='/signup' component={Signup}/>
          <PrivateRoute path='/user/:username' component={UserProfileWithInfo} redirectTo='/login'/>
          <Route component={NoMatch}/>
        </Switch>
        
      </div>
    </Router>
      )
  }
}

export default Routes