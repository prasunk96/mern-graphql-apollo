import React, { Component } from 'react';
import { Search, Grid, Header, Rating } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';
import _ from 'lodash';
//import PropTypes from 'prop-types'

const resultRenderer = results => results.skills.map((skill,index) => (
    <div key={index}>
    <p>{skill.name}</p>
    <Rating icon='star' rating={skill.value} maxRating={5}/>
    </div>
    )) 



class UserSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
            placeholder: 'Search By Skill Name',
            loading: false,
            results: [],
            value: ''
        }
    }
    
    componentWillMount(){
        this.resetComponent()
    }
    
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
    
    handleResultSelect = (e, { result }) => this.setState({ value: result.username })
    
    handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.username)
      const source = this.props.data.users
      
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }
    
    render(){

        return(
            <div id='user-search-wrapper'>
              <Grid>
                <Grid.Column width={8}>
                    <Search placeholder={this.state.placeholder}
                        size='large'
                        fluid
                        minCharacters={3}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        results={this.state.results}
                        value={this.state.value}
                        loading={this.state.loading}
                        resultRenderer={resultRenderer}/>
                </Grid.Column>
                
                <Grid.Column width={8}>
                    <Header>State</Header>
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                    <Header>Options</Header>
                    <pre>{JSON.stringify(this.props.data.users, null, 2)}</pre>
                </Grid.Column>
            </Grid>
            </div>
            )
    }
}

const getAllUsers = gql`
    query getAllUsers {
        users{
            username
            skills{
                name
                value
            }
        }
    }
`

const UserSearchWithData = graphql(getAllUsers)(UserSearch)

export default UserSearchWithData