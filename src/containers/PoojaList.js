import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  } from 'native-base';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import {PoojaListItem} from '../components/PoojaListItem'
import {PoojaBlockItem} from '../components/PoojaBlockItem'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getPooja,showFormModal,setInternetValues,syncAction,sync} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import ModalGenerator from './ModalGenerator'
import {availablePooja} from '../config'
import styles from '../styles/PoojaListStyle'
import SQLite from 'react-native-sqlite-storage';
import NetInfo from "@react-native-community/netinfo";
import SyncComponent from './SyncComponent'

let db;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;
class PoojaList extends React.Component {

  // componentDidMount=async()=> {
  //   db = SQLite.openDatabase({ name: "appDB", createFromLocation: "~MyPooja.db" },
  //       this.openSuccess, this.openError);
  //   /*select query*/
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM MyPooja', [], (tx, results) => {
  //       var temp = [];
  //       for (let i = 0; i < results.rows.length; ++i) {
  //         temp.push(results.rows.item(i));
  //       }
  //       console.log(temp);
  //     });
  //   });
    /*select query*/

    /*Insert Query*/
    // const pooja_name = 'Test Name';
    // const pooja_amount = 51;
    // const person_name = 'Eshant Bist';
    // const nakshatra = 'nakshatra';
    // const gotra = 'gotra';
    // const other_info = 'other info';
    // const sync =false;
    // db.transaction(function(tx) {
    //         tx.executeSql(
    //           'INSERT INTO MyPooja (pooja_name, pooja_amount, person_name,nakshatra,gotra,other_info,sync ) VALUES (?,?,?,?,?,?,?)',
    //           [pooja_name, pooja_amount, person_name, nakshatra, gotra, other_info, sync],
    //           (tx, results) => {
    //             console.log('Results', results);
    //             if (results.rowsAffected > 0) {
    //               alert('Successfully uploaded');
    //             } else {
    //               alert('Registration Failed');
    //             }
    //           }
    //         );
    //       });
    /*Insert Query*/

    /*Delete Query*/
    // const person_name = 'Eshant Bist';
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DELETE FROM  MyPooja where person_name=?',
    //     [person_name],
    //     (tx, results) => {
    //       console.log('Results', results.rowsAffected);
    //       if (results.rowsAffected > 0) {
    //         alert('Successfully deleted');
    //       } else {
    //         alert('Please insert a valid User Id');
    //       }
    //     }
    //   );
    // });
    /*Delete Query*/
  //}

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
     NetInfo.isConnected.addEventListener(
          'connectionChange',
          this._handleConnectionChange,
       );
    });
  }


  _handleConnectionChange = (isConnected) => {
    this.props.setInternetValues();
  };

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this._handleConnectionChange);
  }

  retry=()=>{
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log(
        'Initial, type: ' +
          connectionInfo.type +
          ', effectiveType: ' +
          connectionInfo.effectiveType,
      );
      if(connectionInfo.type=='none'){
        this.setState({offline:true});
      }
      else {
        this.setState({offline:false})
      }
    });
  }
  //
  // openSuccess() {
  //   console.log("Database is opened");
  // }
  //
  // openError(err) {
  //   console.log("error: ", err);
  // }

  showDetail=(item)=>{
    this.props.showFormModal(true);
    this.props.getPooja(item);
  }

  retry=()=>{
    this.setState({offline:false})
  }


  render() {
    const {ListReducer:{isListView}} = this.props;
    const {InternetReducer:{internetState,syncStatus}} = this.props;
    const {UserReducer:{poojaAvailable,templeInfo,userLoading}} = this.props;
    console.log(poojaAvailable);
    // if(internetState.isConnected == false || internetState.isInternetReachable == false ){
    //     return(
    //       <View style={styles.offlineContainer}>
    //         <Image source={require('../img/oops.png')} resizeMode='contain' style={styles.offlineImage} />
    //         <Text style={styles.noInternetText}>No Internet Connection found. Do you still want to use </Text>
    //       </View>
    //     )
    //   }
      //this.sync(syncStatus);
      if(userLoading){
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      }
      return(
        <SafeAreaView style={{flex:1}}>
          {isListView
            ?
            <Container>
              <Content>
                <List>
                <FlatList
                  data={Object.values(poojaAvailable)}
                  ref={(c) => {this.flatList = c;}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => <PoojaListItem showDetail={(item)=>this.showDetail(item)} item={item} />}
                />
                </List>
              </Content>
            </Container>
            :
            <FlatList
              data={formatData(Object.values(poojaAvailable), numColumns)}
              style={styles.container}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <PoojaBlockItem numColumns={numColumns} showDetail={(item)=>this.showDetail(item)} item={item} />}
              numColumns={numColumns}
            />
          }
          <ModalGenerator/>
          <SyncComponent />
        </SafeAreaView>
      )
   }
}

const mapStateToProps=(state)=>{
  return {ListReducer:state.ListReducer,InternetReducer:state.InternetReducer,UserReducer:state.UserReducer};
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({showFormModal,getPooja,setInternetValues,syncAction,sync},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PoojaList);
