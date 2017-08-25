import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Form, Input, Header, Button, Icon } from 'semantic-ui-react';

class Signup extends Component{
  constructor(){
    super()
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
  
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
  handleForm = () => {
    let { username, email, password } = this.state;
    this.props.mutate({
      variables: {
        user: {
          username: username,
          email: email,
          password: password
        }
      }
    }).then(({data}) => {
      console.log(data)
      this.props.history.push('/login')
    }).catch((err) => {
      console.log(`there was an error: ${err.message}`)
    })
    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }
  
    render(){
        return(
    <div className='signup-form-wrapper'>
      <Header as='h1'>Signup</Header>
      <Form className='flex-column'>
        <Input type='text' 
               name='username'
               label='Username'
               placeholder='Enter a Username'
               tabIndex='0'
               value={this.state.username}
               onChange={this.handleChange}/>

        <Input type='email' 
               name='email'
               label='Email'
               placeholder='Enter an Email'
               value={this.state.email}
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

const addUserMutation = gql`
  mutation addUser($user: UserInput!) {
    addUser(user: $user) {
      username
    }
  }
`

const SignupWithMutation = graphql(addUserMutation)(Signup);
export default SignupWithMutation;

