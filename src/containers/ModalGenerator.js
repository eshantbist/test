import React,{Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import {getPooja,showFormModal} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import styles from '../styles/ModalGeneratorStyle'

class ModalGenerator extends Component{
  render(){
    const {ListReducer:{formModal,currentPooja}} = this.props;
    return(
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={formModal}
          onRequestClose={() => {this.props.showFormModal(false); this.props.getPooja({})}}
        >
          <SafeAreaView style={styles.safeAreaContainer}>
          <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? "height" : "none"} enabled>
          <TouchableOpacity
            style={{height:'100%',width:'100%'}}
            activeOpacity={1}
            onPressOut={() => {this.props.showFormModal(false); this.props.getPooja({})}}
          >
            <View
              style={styles.outsideContainer}
            >
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                <ScrollView>
                  <Text style={styles.nameText}>{currentPooja.name}</Text>
                  <Text style={styles.priceText}>Amount: {currentPooja.price}</Text>
                  <TextInput placeholder='Phone Number' keyboardType='numeric' style={styles.inputStyle}/>
                  <TextInput placeholder='Name' style={styles.inputStyle}/>
                  <TextInput placeholder='Nakshatra' style={styles.inputStyle}/>
                  <TextInput placeholder='Gotra' style={styles.inputStyle}/>
                  <TextInput placeholder='Other' maxLength = {100} multiline = {true} numberOfLines = {4} style={[styles.inputStyle,styles.textArea]}/>
                  <Button
                    onPress={()=>console.log('presses')}
                    title="Submit"
                  />
                </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableOpacity>
          </KeyboardAvoidingView>
          </SafeAreaView>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps=(state)=>{
  return {ListReducer:state.ListReducer};
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({getPooja,showFormModal},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalGenerator);
