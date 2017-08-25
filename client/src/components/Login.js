import React, { Component } from 'react';
import { Form, Input, Header, Button, Icon, Message } from 'semantic-ui-react';
import jwt from 'jwt-decode';


export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      hidden: true,
      message: ''
    }
  }
  
  handleDismiss = () => this.setState({hidden: true})
  
  init = () => this.setState({username: '', password: ''})
  
  auth = () => {
      let token = window.localStorage.getItem('token');
      if(token==='undefined'){
          this.props.history.push('/login');
      }
      else{
          const decoded = jwt(token);
          if(!decoded.username){
            this.setState({hidden: false, message: 'Invalid User Token'})
          }
          else if(decoded.username){
          this.props.login();
          console.log(this.props);
          this.props.history.push(`/user/${decoded.username}`);
          }
          
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
        .then(json => {
          if(json.error){
            this.setState({hidden: false, message: json.error})
          }
          else if(json.newToken){
            window.localStorage.setItem("token",json.newToken)
          }
        })
        .then(() => this.init())
        .then(() => this.auth())
        .catch(err => console.log(err))
  }
  
    render(){
        return(
    <div className='signup-form-wrapper'>
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
      
      <Message id='login-error-message' error hidden={this.state.hidden} onDismiss={this.handleDismiss}>
        <Message.Header>Login Error</Message.Header>
        <Message.Content>{this.state.message}</Message.Content>
      </Message>
      
    </div>
        )
    }
}

