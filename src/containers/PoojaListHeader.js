import React,{Component} from 'react';
import {View,Text,SafeAreaView,TouchableOpacity,Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {change_list_view,signOut} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import styles from '../styles/HeaderStyle'

class PoojaListHeader extends Component{
  logOut = () => {
    this._removeData();
    this.props.signOut();
      Alert.alert(
        '',
        "Logged Out Successfully"
      )
  };

  _removeData=async()=>{
    try {
        await AsyncStorage.removeItem('availablePooja');
        console.log('removeds')
     } catch (error) {
        console.log('not removed')
     }
  }

  render(){
    const text = "POOJA'S AVAILABLE";
    const {ListReducer:{isListView}} = this.props;
    const {UserReducer:{userLoading,templeInfo}} = this.props;

    if(userLoading){
      return null;
    }
    return(
      <SafeAreaView style={{backgroundColor:'white',borderBottomWidth:0.2,justifyContent:'space-between',flexDirection:'row'}}>
          {isListView
            ?
              <TouchableOpacity style={styles.iconTouch} onPress={()=>this.props.change_list_view(false)}>
                <FontAwesome style={styles.icon} name='th-large'/>
              </TouchableOpacity>
            :
              <TouchableOpacity style={styles.iconTouch} onPress={()=>this.props.change_list_view(true)}>
                <FontAwesome style={styles.icon} name='list'/>
              </TouchableOpacity>
          }
         <Text style={styles.headerText}>{templeInfo.default}</Text>
         <TouchableOpacity style={[styles.iconTouch,{marginRight:5}]} onPress={()=>this.logOut()}>
           <FontAwesome style={[styles.icon,{left:2,fontSize:20}]} name='sign-out'/>
         </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const mapStateToProps=(state)=>{
  return {ListReducer:state.ListReducer,UserReducer:state.UserReducer};
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({change_list_view,signOut},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PoojaListHeader);
