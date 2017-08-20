import React, { Component } from 'react';
import { Form, Input, Header, Button, Icon } from 'semantic-ui-react';

export default class Login extends Component{
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  
  init = () => this.setState({username: '', password: ''})
  
  auth = () => {
      let token = window.localStorage.getItem('token');
      console.log(token)
      if(token==='undefined'){
          this.props.history.push('/login');
      }
      else{
          this.props.history.push('/');
      }
  }
  
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
  handleForm = () => {
    let { username, password } = this.state;
    let data = { username, password };
    let headers = {
   'Accept': 'application/json',
   'Content-Type': 'application/x-www-form-urlencoded'
        }
    let options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }
    window.fetch("/login", options)
        .then(res => res.json())
        .then(json => window.localStorage.setItem("token",json.newToken))
        .then(() => this.init())
        .then(() => this.auth())
        .catch(err => console.log(err))
  }
  
    render(){
        return(
    <div id='login-wrapper'>
      <Header as='h1'>Login</Header>
      <Form className='flex-column'>
        <Input type='text' 
               name='username'
               label='Username'
               placeholder='Enter a Username'
               tabIndex='0'
               value={this.state.username}
               onChange={this.handleChange}/>
               
        <Input type='text' 
               name='password'
               label='Password'
               placeholder='Enter an Password'
               value={this.state.password}
               onChange={this.handleChange}/>
               
        <Button fluid onClick={this.handleForm}>
          <Icon name='sign in'/>
          Submit
        </Button>
        
      </Form>
    </div>
        )
    }
}

