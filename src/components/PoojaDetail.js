import React,{Component} from 'react'
import {View,SafeAreaView,Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PoojaDetail extends Component{
  render(){
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ITEM');
    console.log(item);
    return(
      <SafeAreaView>
        <Text>{JSON.stringify(item)}</Text>
      </SafeAreaView>
    )
  }
}
