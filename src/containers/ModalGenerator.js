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
import {getPooja,showFormModal,savePoojaDetails} from '../actions'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import styles from '../styles/ModalGeneratorStyle'

class ModalGenerator extends Component{
  constructor(props){
    super(props);
    this.state={
      phone_number:null,
      name:'',
      nakshatra:'',
      gotra:'',
      other_info:'',
    }
  }

  onChangeText(key,value) {
      this.setState({[key]:value})
  }

  postData=()=>{
    const {ListReducer:{currentPooja}} = this.props;
    const {phone_number,name,nakshatra,gotra,other_info} = this.state;
    this.props.savePoojaDetails(currentPooja.name,currentPooja.price,phone_number,name,nakshatra,gotra,other_info);
  }

  render(){
    const {ListReducer:{formModal,currentPooja}} = this.props;
    return(
      <View>
        <Modal
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
                  <Text style={styles.priceText}>Amount: ₹{currentPooja.price}</Text>
                  <TextInput placeholder='Phone Number' keyboardType='numeric' style={styles.inputStyle} value={this.state.phone_number} onChangeText={value => this.onChangeText('phone_number',value)}/>
                  <TextInput placeholder='Name' style={styles.inputStyle} value={this.state.name} onChangeText={value => this.onChangeText('name',value)}/>
                  <TextInput placeholder='Nakshatra' style={styles.inputStyle} value={this.state.nakshatra} onChangeText={value => this.onChangeText('nakshatra',value)}/>
                  <TextInput placeholder='Gotra' style={styles.inputStyle} value={this.state.gotra} onChangeText={value => this.onChangeText('gotra',value)}/>
                  <TextInput placeholder='Other' maxLength = {100} multiline = {true} numberOfLines = {4} value={this.state.other_info} style={[styles.inputStyle,styles.textArea]} onChangeText={value => this.onChangeText('other_info',value)}/>
                  <Button
                    onPress={()=>this.postData()}
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
  return bindActionCreators({getPooja,showFormModal,savePoojaDetails},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalGenerator);
