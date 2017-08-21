import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Input, Button } from 'semantic-ui-react';

class AddUserAvatar extends Component {
    constructor(){
        super()
    this.state = {
        profilePic: ''
        }
    }
    
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    
    addAvatar = () => {
        let profilePic = this.state.profilePic
        this.props.mutate({
            variables: {
                input: {
                 profilePic: profilePic   
                }
            }
        }).then(({data}) => {
            window.localStorage.setItem('profilePic',data.addProfilePic.profilePic);
        }).then( () => {
            this.setState({profilePic: ''});
        }).catch((err) => {
            console.log(err)
        })
    }
    
    render(){
        return(
   <div id='addUserAvatar'>
        <Input type='text'
               name='profilePic'
               onChange={this.handleChange}
               value={this.state.profilePic}/>
        <Button onClick={this.addAvatar}>Add Avatar</Button>
    </div>
            )
    }
}
const addProfilePic = gql`
mutation addProfilePic($input: ProfilePic!) {
  addProfilePic(input: $input) {
    id
    username
    password
    email
    createdOn
    profilePic
  }
}
`

const AddUserAvatarWithMutation = graphql(addProfilePic)(AddUserAvatar);
export default AddUserAvatarWithMutation;



