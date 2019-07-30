import React from 'react'
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export const PoojaListItem = (props) =>{
  if(!props.item.empty){
    return(
          <ListItem thumbnail onPress={()=>props.showDetail(props.item)}>
            <Left>
              <Thumbnail square source={props.item.image} />
            </Left>
            <Body>
              <Text>{props.item.name}</Text>
              <Text note>{props.item.description}</Text>
            </Body>
            <Right>
              <Icon color="grey" name="arrow-circle-right" size={20}/>
            </Right>
          </ListItem>
    )
  }
  else return null
}
