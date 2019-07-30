import React,{Component} from 'react';
import {View,Text,SafeAreaView,TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {change_list_view} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import styles from '../styles/HeaderStyle'

class Header extends Component{
  render(){
    const text = "POOJA'S AVAILABLE";
    const {ListReducer:{isListView}} = this.props;
    return(
      <SafeAreaView style={{flex:1,backgroundColor:'white',borderBottomWidth:0.2,justifyContent:'space-between',flexDirection:'row'}}>
        {isListView
          ?
            <TouchableOpacity style={styles.iconTouch} onPress={()=>this.props.change_list_view(false)}>
              <FontAwesome style={styles.icon} name='th-large'/>
            </TouchableOpacity>
          :
            <TouchableOpacity style={styles.iconTouch} onPress={()=>this.props.change_list_view(true)}>
              <FontAwesome style={styles.icon} name='list'/>
            </TouchableOpacity>}
         <Text style={styles.headerText}>{text}</Text>
         <View></View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps=(state)=>{
  return {ListReducer:state.ListReducer};
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({change_list_view},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
