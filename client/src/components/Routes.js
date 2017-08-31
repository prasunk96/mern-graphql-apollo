import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { PropsRoute, PrivateRoute, userAuth } from './helpers';
import { Button, Menu, Image, Icon } from 'semantic-ui-react';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import OauthWithUser from './Oauth';
import NoMatch from './NoMatch';
import UserProfileWithInfo from './UserProfile';
import UserSearch from './Search';
import ConnectionWithData from './Connection';
import jwt from 'jwt-decode';


const LoggedOutButtons = (props) => (
          <Menu.Menu position='right'>
            
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
              <Link to='/search'><Button color='orange'><Icon name='search'/>Search</Button></Link>
            </Menu.Item>
            
            <Menu.Item>
              <Link to='/connection'><Button color='orange'>Connect</Button></Link>
            </Menu.Item>
            
            <Menu.Item>
              <Link to={profileLink}><Button color='orange'>Profile</Button></Link>
            </Menu.Item>
            
            <Menu.Item>
              <Image shape='rounded' 
                     width={50} 
                     height={50}
                     src={picUrl} />
            </Menu.Item>
            
            <Menu.Item>
              <Link to='/logout'><Button color='orange'>Logout</Button></Link>
            </Menu.Item>
          
          </Menu.Menu>
  );
}

const PrivateUserProfile = () => {
  let token = window.localStorage.getItem('token');
  let decoded = token ? jwt(token) : null;
  let profileLink = decoded ? `/user/${decoded.username}` : '/';
  return(
  <Switch>
    <PrivateRoute path={profileLink} component={UserProfileWithInfo} redirectTo='/login'/>
    <PrivateRoute path='/search' component={UserSearch} redirectTo='/login'/>
    <PrivateRoute path='/connection' component={ConnectionWithData} redirectTo='/login'/>
  </Switch>
  );
}


class Routes extends Component{
  constructor(props){
    super(props);
    this.state = {
      userLoggedIn: false
    }
  }

  userLogin = () => {
    userAuth.authenticate( () => {
      this.setState({userLoggedIn: true});
    })
  }
  
  userLogout = () => {
    userAuth.signout(() => {
      this.setState({userLoggedIn: false})
      this.props.resetStore()
    })
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
          
          {userAuth.isAuthenticated === false ? <LoggedOutButtons/> : <LoggedInButtons/>}
        
        </Menu>
        
        <Switch>
          <Route exact path='/' component={Home}/>
          <PropsRoute path='/login' component={Login} login={this.userLogin}/>
          <PropsRoute path='/logout' component={Logout} logout={this.userLogout}/>
          <Route path='/signup' component={Signup}/>
          <PropsRoute path='/oauth/:fbid' component={OauthWithUser} login={this.userLogin}/>
          { userAuth.isAuthenticated ? <PrivateUserProfile/> : null }
          <Route component={NoMatch}/>
        </Switch>
        
      </div>
    </Router>
      )
  }
}

export default Routes