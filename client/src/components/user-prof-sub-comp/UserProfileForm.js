import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Form, Button, Grid, Message, Label, Icon } from 'semantic-ui-react';

class UserProfileForm extends Component {
    constructor(props){
        super(props)
    this.state = {
        loading: true,
        profilePic: '',
        bio: '',
        city: '',
        geo: {
          lat: '',
          lon: ''
        }
     }
        this.geoInit = this.geoInit.bind(this)
    }
    
  geoInit(){
    let lat;
    let lon;
    let reverse;
          
    function reverseGeo(){
      window.fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then( res => res.json() )
        .then( data => reverse=data)
        .then( data => console.log(data))
        .then( data => this.setState({ city: reverse.results[1].formatted_address }))
        .catch( err => console.log(err.message))
      }
        
    if ("geolocation" in window.navigator) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
          lat = position.coords.latitude
          lon = position.coords.longitude
          let geo = {lat: lat, lon:lon}
           this.setState({ geo })
           this.setState({loading: false})
           setTimeout(reverseGeo.bind(this),1000)
      });
} else {
    alert("Your browser doesn't support Geolocation or Geolocation is turned OFF")
  }
}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    
    addUserProfile = () => {
        let profilePic = this.state.profilePic
        let bio = this.state.bio
        let lat = this.state.geo.lat
        let lon = this.state.geo.lon
        let city = this.state.city
        this.props.mutate({
            variables: {
                input: {
                 profilePic: profilePic,
                 bio: bio,
                 lat: lat,
                 lon: lon,
                 city: city
                }
            }
        }).then(({data}) => {
            window.localStorage.setItem('profilePic',data.addUserProfile.profilePic);
        }).then( () => {
            this.setState({profilePic: '', bio: '', lat: '', lon: '', city: ''});
        }).catch((err) => {
            console.log(err)
        })
    }
    
    render(){
        return(
   <Grid columns={1} centered>
      <Grid.Column width={12}>
        <div>
          <Message
            attached
            header={`Hey ${this.props.data.username}!`}
            content='Fill out this Form to complete your User Profile' />
            
          <Form className='attached fluid segment'>
            
            <Form.Input type='text'
               name='profilePic'
               label='Profile Pic'
               placeholder='URL'
               onChange={this.handleChange}
               value={this.state.profilePic}/>
        
            <Form.TextArea name='bio'
                    label='Bio'
                    onChange={this.handleChange}
                    value={this.state.bio}
                    placeholder='Tell Us About Yourself' />
        
            <Form.Group>
                <Form.Input label='City' 
                            width={8} 
                            value={this.state.city} 
                            loading={this.state.loading}
                            readOnly={this.state.city.length>0}/>
                <Form.Input label='Latitude' 
                            width={4} 
                            value={this.state.geo.lat} 
                            loading={this.state.loading}
                            readOnly={this.state.geo.lat.length>0}/>
                <Form.Input label='Longitude' 
                            width={4} 
                            value={this.state.geo.lon}
                            loading={this.state.loading}
                            readOnly={this.state.geo.lon.length>0}/>
            </Form.Group>
          
            <Button onClick={this.geoInit}>Allow Geolocation</Button>
        
            <Button onClick={this.addUserProfile}>Submit</Button>
          
          </Form>
          <Message attached='bottom' warning>
            <Icon name='info' />
              Click <Label color='brown'>Allow Geolocation</Label> to let us pin point your location for you.
              This is a Google Suggested Best Practice for retrieving location information.
          </Message>
        </div>
      </Grid.Column>
    </Grid>
            )
    }
}
const addUserProfile = gql`
mutation addUserProfile($input: ProfileInput!) {
  addUserProfile(input: $input) {
    id
    username
    password
    email
    createdOn
    profilePic
  }
}
`

const UserProfileFormWithMutation = graphql(addUserProfile)(UserProfileForm);
export default UserProfileFormWithMutation;



