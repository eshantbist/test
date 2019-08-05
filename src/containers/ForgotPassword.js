import React, {Component} from 'react';
import {Alert,ActivityIndicator,SafeAreaView,BackHandler,ScrollView,Modal,TouchableOpacity,Button,TextInput,Platform, StyleSheet, Text, View,KeyboardAvoidingView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../styles/SignInStyle';
import {confirmNewPassword,userForgotPassword} from '../actions'

class ForgotPassword extends Component {
  state = {
    email:'',
    new_password:'',
    authCode:'',
  }

  onChangeText(key,value) {
    this.setState({[key]:value})
  }

  confirm=()=>{
    const {email,authCode,new_password} = this.state;
    this.props.confirmNewPassword(email,authCode,new_password);
  }

  showVerify=()=>{
    const {email} = this.state;
    this.props.userForgotPassword(email)
  }

  onPasswordPress=()=>{
    Alert.alert(
      '',
      'Minimum length of password should be 8.It should contain at atleast one Uppercase and one LowerCase.It should also contain atleast one number',
    )
  }

  render() {
    const {ForgotPasswordReducer:{forgotPasswordConfirmationalModal,forgotPasswordError,challengeLoading,loading,confirmForgotPasswordError,confirmForgotPasswordErrorMessage}} = this.props;
    return (
      <SafeAreaView
        style={[styles.background, styles.container]}
      >
        <View style={styles.container}>
            <View style={[{flexDirection:'row',justifyContent:'space-between',backgroundColor:"#bfbfbf",padding:10}]}>
              <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.props.navigation.navigate('Auth')}>
                <FontAwesome name={'chevron-left'} style={{fontSize:20,marginRight:5,color:'#004466'}}/>
                <Text style={{fontSize:17,color:'#004466'}}>Back</Text>
              </TouchableOpacity>
              <Text style={{fontSize:18,marginRight:50,fontWeight:'500',color:'#004466'}}>Forgot Password</Text>
              <View/>
            </View>
            <View style={styles.container} />
            <KeyboardAvoidingView style={[styles.wrapper,{marginBottom:50}]} behavior={"padding"} keyboardVerticalOffset={10} enabled>
              <FontAwesome name={'user-circle'} style={styles.userIcon} size={100}/>
              {forgotPasswordError&&<Text style={styles.errorMessage}>*Invalid Email</Text>}
              <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                  <FontAwesome
                    name='user'
                    style={styles.icon}
                  />
                </View>
                <TextInput
                  placeholder='Chinmaya Registered Email'
                  value={this.state.email}
                  onChangeText={value => this.onChangeText('email',value)}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                />
              </View>
              {
                loading
                ?
                <View>
                  <ActivityIndicator size="small" color="#0000ff" />
                </View>
                :
                <TouchableOpacity activeOpacity={.5} onPress={()=>this.showVerify()}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                  </View>
                </TouchableOpacity>
              }
            </KeyboardAvoidingView>
          <View style={styles.container} />
        </View>
        <Modal visible={forgotPasswordConfirmationalModal} >
          <SafeAreaView style={{flex:1,backgroundColor:'#cccccc'}}>
            <Text style={{marginHorizontal:20,fontSize:20,marginTop:'40%',fontFamily:'AmericanTypewriter'}}>
              A verification code is sent to
            </Text>
            <Text style={{marginHorizontal:20,fontSize:20,marginBottom:'20%',fontFamily:'AmericanTypewriter'}}>{this.state.email}</Text>
            <View style={{backgroundColor:'#f2f2f2',marginHorizontal:10,borderRadius:3}}>
              {confirmForgotPasswordError&&<Text style={styles.errorMessage}>*{confirmForgotPasswordErrorMessage}</Text>}
              <TextInput
                placeholder="Verification Code"
                onChangeText={value => this.onChangeText('authCode',value)}
                value={this.state.authCode}
                keyboardType='numeric'
                style={{borderBottomWidth:1,marginVertical:10,marginHorizontal:10,marginTop:50,fontSize:20}}
              />
              <TextInput
                placeholder="New Password"
                onChangeText={value => this.onChangeText('new_password',value)}
                value={this.state.new_password}
                style={{borderBottomWidth:1,marginVertical:10,marginHorizontal:10,marginTop:50,fontSize:20}}
              />
              <View style={{marginBottom:10,flexDirection:'row',alignSelf:'center',marginVertical:20}}>
                {challengeLoading
                  ?
                  <ActivityIndicator color='blue' size='small' />
                  :
                  <View>
                    <Button
                      title='Confirm'
                      onPress={()=>this.confirm()}
                    />
                    <Button
                      title='Cancel'
                      onPress={this.props.closeConfirmationModal}
                    />
                  </View>
                }
              </View>
              <TouchableOpacity onPress={()=>this.onPasswordPress()}>
                <Text style={{position:'absolute',right:5,bottom:5,color:'blue'}}>
                  Phone Policy
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1}} />
          </SafeAreaView>
         </Modal>
      </SafeAreaView>
    );
  }
}

mapStateToProps=state=>{
  return {
    ForgotPasswordReducer:state.ForgotPasswordReducer
  }
}

mapDispatchToProps=dispatch=>{
  return bindActionCreators({
    confirmNewPassword,
    userForgotPassword
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword)
