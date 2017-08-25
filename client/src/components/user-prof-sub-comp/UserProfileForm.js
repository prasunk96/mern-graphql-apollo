import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Form, Button, Grid, Message, Label, Icon, Rating, Header } from 'semantic-ui-react';

class UserProfileForm extends Component {
    constructor(props){
        super(props)
    this.state = {
        loading: false,
        profilePic: '',
        bio: '',
        city: '',
        geo: {
          lat: '',
          lon: ''
        },
        rates: [
          {name: 'React DOM' ,value: 0},
          {name: 'React Native' ,value: 0},
          {name: 'ES6' ,value: 0},
          {name: 'State & Props' ,value: 0},
          {name: 'JSX' ,value: 0},
          {name: 'Create React App' ,value: 0},
          {name: 'React Router 4' ,value: 0},
          {name: 'React Apollo' ,value: 0},
          {name: 'Helmet' ,value: 0},
          {name: 'Component Libraries' ,value: 0},
          {name: 'Server Side Render' ,value: 0},
          {name: 'Webpack' ,value: 0},
          {name: 'Higher Order Component' ,value: 0},
          {name: 'Redux' ,value: 0},
          {name: 'Lifecycle Methods' ,value: 0}
        ]
     }
        this.geoInit = this.geoInit.bind(this)
    }
    
  geoInit(){
    let lat;
    let lon;
    let reverse;
    this.setState({loading: true});
          
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
     
    handleRate(prop,e,d){
      let rates = this.state.rates
      let key = Object.keys(rates[prop])[1]
      rates[prop][key] = d.rating 
      this.setState({rates:rates})
  }
  
    addUserProfile = () => {
        let profilePic = this.state.profilePic
        let bio = this.state.bio
        let lat = this.state.geo.lat
        let lon = this.state.geo.lon
        let city = this.state.city
        let rates = this.state.rates
        this.props.mutate({
            variables: {
                input: {
                 profilePic: profilePic,
                 bio: bio,
                 lat: lat,
                 lon: lon,
                 city: city,
                 skills: rates
                }
            }
        }).then(({data}) => {
            window.localStorage.setItem('profilePic',data.addUserProfile.profilePic);
        }).then( () => {
            this.setState({profilePic: '', bio: ''});
        }).catch((err) => {
            console.log(err)
        })
    }
    
    render(){
        return(
   <Grid columns={1} centered>
      <Grid.Column width={14}>
        <div>
          <Message
            color='orange'
            attached
            header={`Hey ${this.props.data.username}!`}
            content='Fill out this Form to complete your User Profile' />
          <Form className='attached fluid segment'>
            
            <Form.Input type='text'
               name='profilePic'
               label='Profile Pic'
               placeholder='URL - Square Image will look the best'
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
          
            <Button fluid onClick={this.geoInit} color='orange'>
              Allow Geolocation
            </Button><br/>
        
          
          </Form>
          <Message attached='bottom' color='orange'>
            <Icon name='info' />
              By Clicking  <Label color='orange'>Allow Geolocation</Label>  you allow this App
              to compute your location.  Google Chrome best practices suggest letting, you, the user,
              activate geolocation through an action.  We use this information to connect you with 
              other people near you who are interested in React
          </Message>
          
          <Grid id='ratings-wrapper' columns ='equal' relaxed padded stackable container>
             
             <Grid.Column textAlign='center'>
              <Header as='h2' textAlign='center'>Fundamentals</Header>
              <span>React DOM:
                <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[0].value} onRate={this.handleRate.bind(this,0)}/>
              </span>
              <br/>
              <span>React Native:
                <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[1].value} onRate={this.handleRate.bind(this,1)}/>
              </span>
              <br/>
              <span>ES6 & Beyond:
                <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[2].value} onRate={this.handleRate.bind(this,2)}/>
              </span>
              <br/>
              <span>State & Props:
                <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[3].value} onRate={this.handleRate.bind(this,3)}/>
              </span>
              <br/>
              <span>JSX:
                <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[4].value} onRate={this.handleRate.bind(this,4)}/>
              </span>
             </Grid.Column>
             
             <Grid.Column textAlign='center'>
              <Header as='h2' textAlign='center'>Popular Tools</Header>
             <span>Create React App:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[5].value} onRate={this.handleRate.bind(this,5)}/>
             </span>
             <br/>
             <span>React Router 4:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[6].value} onRate={this.handleRate.bind(this,6)}/>
             </span>
             <br/>
             <span>React Apollo:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[7].value} onRate={this.handleRate.bind(this,7)}/>
             </span>
             <br/>
             <span>Helmet:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[8].value} onRate={this.handleRate.bind(this,8)}/>
             </span>
             <br/>
             <span>Component Libraries:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[9].value} onRate={this.handleRate.bind(this,9)}/>
             </span>
             <br/>
             </Grid.Column>
             
             <Grid.Column textAlign='center'>
              <Header as='h2' textAlign='center'>Advanced</Header>
              <span>Server Side Render:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[10].value} onRate={this.handleRate.bind(this,10)}/>
             </span>
             <br/>
             <span>Webpack:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[11].value} onRate={this.handleRate.bind(this,11)}/>
             </span>
             <br/>
             <span>Higher Order Comp:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[12].value} onRate={this.handleRate.bind(this,12)}/>
             </span>
             <br/>
             <span>Redux:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[13].value} onRate={this.handleRate.bind(this,13)}/>
             </span>
             <br/>
             <span>Lifecycle Methods:
             <Rating size='massive' clearable icon='star' maxRating={5} rating={this.state.rates[14].value} onRate={this.handleRate.bind(this,14)}/>
             </span>
             <br/>
             
          </Grid.Column>
         </Grid>
          <Button onClick={this.addUserProfile}>Submit</Button>
        </div>
      </Grid.Column>
    </Grid>
            )
    }
}
const addUserProfile = gql`
mutation addUserProfile($input: ProfileInput!) {
  addUserProfile(input: $input) {
    profilePic
  }
}
`

const UserProfileFormWithMutation = graphql(addUserProfile)(UserProfileForm);
export default UserProfileFormWithMutation;



