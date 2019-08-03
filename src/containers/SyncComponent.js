import React,{Component} from 'react'
import {
  View,
  Text } from 'react-native';
import {sync} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

class SyncComponent extends Component{

  shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.InternetReducer.syncStatus==this.props.InternetReducer.syncStatus){
        return false;
      }
      return true;
  }

  sync=(syncStatus)=>{
    if(syncStatus=='synchronize'){
      this.props.sync();
    }
    else {
      console.log("do nothing");
    }
  }

  render(){
    const {InternetReducer:{syncStatus}} = this.props;
    this.sync(syncStatus);
    return(
      <View></View>
    )
  }
}

const mapStateToProps=(state)=>{
  return {InternetReducer:state.InternetReducer};
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({sync},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SyncComponent);
