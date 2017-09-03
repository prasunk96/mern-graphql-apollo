import React, { Component } from 'react';
import { Segment, Grid, Header, Comment, Form, Button, Icon, Image, List } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class ConnectionChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      selectedUserName: '',
      selectedUserID: '',
      selectedUserAvatar: '',
      userAvatar: this.props.userAvatar
    }
  }
  
  handleChange = (e,d) => {
  this.setState({ comment: d.value })
  }
  
  selectDMUser = (user) => {
    this.setState({
      selectedUserName: user.username,
      selectedUserID: user.id,
      selectedUserAvatar: user.profilePic
    })
  }
  
  handleComment = () => {
    let { comment, selectedUserID } = this.state
    this.props.mutate({
      variables: {
        input: {
          partner: selectedUserID,
          text: comment
        }
      }
    }).then(({data}) => {
      console.log(data)
      this.setState({comment: ''})
    }).catch((err) => {
      console.log(err)
    })
  }
  
  render(){
    
    const dmInfo = this.props.dmInfo
    const currentDM = this.props.dms.find( (dm) => {
      return dm.partner == this.state.selectedUserID
    })
    
    return(
      <Segment id='connection-chat'>
        <Grid columns={2} divided>
                    
          <Grid.Column width={3}>
            <Header as='h3' attached='top' textAlign='center'>DM Username</Header>
              <List animated selection verticalAlign='middle'>
            {dmInfo.map( (info, index) => {
              return(
                <List.Item key={index} onClick={() => this.selectDMUser(info)}>
                  <Image avatar src={info.profilePic}/>
                  <List.Content>
                    <List.Header>{info.username}</List.Header>
                  </List.Content>
                </List.Item>
              )
            })}
              </List>
          </Grid.Column>
                    
          <Grid.Column width={13} id='chat-main'>
            <Header as='h3' attached='top' textAlign='center'>DM Conversation With {this.state.selectedUserName}</Header>
                        
            <Comment.Group>
              {currentDM.map( (dm, index) => {
                return(
                  
                )
              })}
            </Comment.Group>
            
            <Form id='comment-form'>
              <Grid columns={2} celled>
                <Grid.Column width={14}>
                  <Form.TextArea rows={2} value={this.state.comment} onChange={this.handleChange}/>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Button id='comment-button' onClick={this.handleComment}><Icon name='plus' size='big'/></Button>
                </Grid.Column>
              </Grid>
            </Form>
          
          </Grid.Column>
        
        </Grid>
      </Segment>
            )
    }
}

const addDMCommentMutation = gql`
mutation addDMComment($input: DMInput!) {
  addDMComment(input: $input) {
    id
    partner
    comments{
      id
      text
      author
      postedOn
    }
  }
}
`
const ConnectionChatWithMutation = graphql(addDMCommentMutation)(ConnectionChat)
export default ConnectionChatWithMutation