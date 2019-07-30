import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/PoojaListStyle'
import {TouchableOpacity,Text,View,Dimensions} from 'react-native';


export const PoojaBlockItem = (props) =>{
  if(!props.item.empty){
    return(
          <TouchableOpacity style={[styles.item,{height: Dimensions.get('window').width / props.numColumns}]} onPress={()=>props.showDetail(props.item)}>
            <Text style={styles.itemText}>{props.item.keyword}</Text>
            <Text style={styles.itemPrice}>{props.item.price}</Text>
          </TouchableOpacity>
    )
  }
  else return <View style={[styles.item, styles.itemInvisible]} />
}
