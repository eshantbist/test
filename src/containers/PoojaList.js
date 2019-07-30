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
  Button
} from 'react-native';
import {PoojaListItem} from '../components/PoojaListItem'
import {PoojaBlockItem} from '../components/PoojaBlockItem'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getPooja,showFormModal} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import ModalGenerator from './ModalGenerator'
import {availablePooja} from '../config'
import styles from '../styles/PoojaListStyle'


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

  showDetail=(item)=>{
    this.props.showFormModal(true);
    this.props.getPooja(item);
  }

  render() {
    const {ListReducer:{isListView}} = this.props;
        return(
          <SafeAreaView style={{flex:1}}>
            {isListView
              ?
              <Container>
                <Content>
                  <List>
                  <FlatList
                    data={availablePooja}
                    ref={(c) => {this.flatList = c;}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <PoojaListItem showDetail={(item)=>this.showDetail(item)} item={item} />}
                  />
                  </List>
                </Content>
              </Container>
              :
              <FlatList
                data={formatData(availablePooja, numColumns)}
                style={styles.container}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <PoojaBlockItem numColumns={numColumns} showDetail={(item)=>this.showDetail(item)} item={item} />}
                numColumns={numColumns}
              />
            }
            <ModalGenerator />
          </SafeAreaView>
        )
   }
}

const mapStateToProps=(state)=>{
  return {ListReducer:state.ListReducer};
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({showFormModal,getPooja},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PoojaList);
