import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { monthParse } from '../helpers';

const Info = ({data}) => {
  let date = new Date(data.createdOn)
  let displayDate = monthParse(date.getMonth()) + ', ' + date.getFullYear()
  
   return(
   <Card raised centered>
    <Image src={data.profilePic}/>
    <Card.Content>
      <Card.Header>{data.username}</Card.Header>
      <Card.Meta>Member Since: {displayDate}</Card.Meta>
      <Card.Meta>Email: {data.email}</Card.Meta>
      <Card.Description><Icon name='quote left'/>{data.bio}<Icon name='quote right'/></Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Icon name='user' />
      22 Friends/More Data
    </Card.Content>
   </Card>
    );
}
export default Info;