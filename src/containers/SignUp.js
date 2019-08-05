import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView,
  Modal,
  Button,
  TouchableWithoutFeedback
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createUser,confirmUserSignUp,suppressSignUpErrors,closeConfirmationModal} from '../actions';
import styles from '../styles/SignUpStyle';
import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config)

class SignUp extends Component {

  state={
    fullname:'',
    password:'',
    email:'',
    authCode:null,
    timerValue:30,
    showResend:false
  }

  onChangeText(key,value) {
      this.setState({[key]:value})
  }

  signUp=()=>{
    const {email,fullname,password} = this.state;
    this.props.createUser(email,password,fullname);
  }

  confirm=()=>{
    const {email,authCode} = this.state;
    this.props.confirmUserSignUp(email,authCode);
  }

  componentWillReceiveProps=(nextProps)=>{
    if(nextProps.SignUpReducer.signUpConfirmationModal){
      this.interval = setInterval(
        () => this.setState((prevState)=> ({ timerValue: prevState.timerValue - 1 })),
        1000
      );
      setTimeout(() => this.setState({ showResend: true  }),30*1000);
    }

  }

  componentDidUpdate(){
    if(this.state.timerValue === 0){
      clearInterval(this.interval);
    }
  }

  timer=()=>{
    this.setState({ timerValue: this.state.timerValue -1 });
  }

  onResetPress=()=>{
    let lowerCaseEmail=this.state.email.toLowerCase();
    lowerCaseEmail =lowerCaseEmail.trim(lowerCaseEmail);
    Auth.resendSignUp(lowerCaseEmail)
       .then(data => {
         console.log(data);
     })
     .catch(err => {
       console.log('error signing up: ', err)
     });
  }

  suppressErrors=()=>{
    this.props.suppressSignUpErrors()
  }

  onPasswordPress=()=>{
    Alert.alert(
      '',
      'Minimum length of password should be 8.It should contain at atleast one Uppercase and one LowerCase.It should also contain atleast one number',
    )
  }

  render() {
    const {fullname,password,loading,syncLoading,email} = this.state;
    const {SignUpReducer:{signUpError,signUpErrorMessage,isAuthenticating,signUpConfirmationModal,isConfirming}} = this.props;
    return (
      <View
        style={[styles.background, styles.container]}
      >
      {
        isAuthenticating
        ?
        <View style={[styles.container,styles.activityIndicator]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        :
        <View style={styles.container}>
          <View style={styles.container} />
            <KeyboardAvoidingView style={styles.wrapper} behavior={"padding"} keyboardVerticalOffset={10} enabled>
              <FontAwesome name={'user-plus'} style={{alignSelf:'center'}} color={'#333333'} size={80}/>
              {signUpError&&<Text style={styles.errorMessage}>Either the Password or Email does not follow our policy</Text>}
              <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                  <FontAwesome
                    name='user'
                    style={styles.icon}
                  />
                </View>
                <TextInput
                  placeholder="Full Name"
                  value={fullname}
                  onChangeText={value => this.onChangeText('fullname',value)}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onFocus={()=>this.suppressErrors()}
                />
              </View>
              <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                  <FontAwesome
                    name='envelope'
                    style={styles.icon}
                  />
                </View>
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={value => this.onChangeText('email',value)}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onFocus={()=>this.suppressErrors()}
                />
              </View>
              <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                  <FontAwesome
                    name='key'
                    style={styles.icon}
                  />
                </View>
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={value => this.onChangeText('password',value)}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={()=>{this.signUp()}}
                  onFocus={()=>this.suppressErrors()}
                />
                <View style={{paddingHorizontal: 10,alignItems: "center",justifyContent: "center"}}>
                  <TouchableOpacity onPress={()=>this.onPasswordPress()}>
                    <FontAwesome
                      name='bullseye'
                      style={{width: 20,height: 20,fontSize:20,color:'#E57373'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity activeOpacity={.5} onPress={()=>{this.signUp()}}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          <View style={styles.container} />
          <Modal onRequestClose={this.props.closeConfirmationModal} visible={signUpConfirmationModal} >
            <SafeAreaView style={{flex:1,backgroundColor:'#cccccc'}}>
              <Text style={{marginHorizontal:20,fontSize:20,marginTop:'40%',fontFamily:'AmericanTypewriter'}}>
                A verification code is sent to
              </Text>
              <Text style={{marginHorizontal:20,fontSize:20,marginBottom:'20%',fontFamily:'AmericanTypewriter'}}>{this.state.email}</Text>
              <View style={{backgroundColor:'#f2f2f2',marginHorizontal:10,borderRadius:3}}>
                {this.state.showResend
                  ?
                <TouchableOpacity onPress={()=>this.onResetPress()}>
                  <Text style={{position:'absolute',right:10,top:10,fontWeight:'600',color:'#1a8cff'}}>
                    RESEND OTP
                  </Text>
                </TouchableOpacity>
                :<TouchableWithoutFeedback>
                  <Text style={{position:'absolute',right:10,top:10,fontWeight:'600',color:'#99ccff'}}>
                    RESEND OTP
                  </Text>
                </TouchableWithoutFeedback>}
                {this.state.timerValue!=0&&<Text style={{position:'absolute',backgroundColor:'grey',margin:5,padding:3,color:'white',borderRadius:2,fontWeight:'600'}}>
                  {this.state.timerValue}
                </Text>}
                <TextInput
                  placeholder="Verification Code"
                  onChangeText={value => this.onChangeText('authCode',value)}
                  value={this.state.authCode}
                  keyboardType='numeric'
                  style={{borderBottomWidth:1,marginVertical:10,marginHorizontal:10,marginTop:50,fontSize:20}}
                />
                <View style={{marginBottom:10,flexDirection:'row',alignSelf:'center',marginVertical:20}}>
                  {isConfirming
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
              </View>
              <View style={{flex:1}} />
            </SafeAreaView>
           </Modal>
        </View>
      }
      </View>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    SignUpReducer:state.SignUpReducer
  }
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({
    createUser,
    confirmUserSignUp,
    suppressSignUpErrors,
    closeConfirmationModal
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
