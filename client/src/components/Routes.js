import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';



class Routes extends Component{
  render(){
    return(
    <Router>
      <div id='App'>
        
        <Menu>
          <Menu.Item>
            <Link to='/'>
              <Icon name='chrome' size='large'/>
            </Link>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Link to='/login'><Button>Login</Button></Link>
              <Link to='/signup'><Button>Signup</Button></Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={Signup}/>
        </Switch>
        
      </div>
    </Router>
      )
  }
}

export default Routes