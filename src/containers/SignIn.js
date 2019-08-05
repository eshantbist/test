import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../styles/SignInStyle';
import {authenticate,logIn,suppressLoginErrors} from '../actions'

class SignIn extends Component {

  state={
    email:'',
    password:'',
    eye:'eye-slash',
    secureTextEntry:true,
  }

  onChangeText(key,value) {
      this.setState({[key]:value})
  }

  signIn=()=>{
    const {email,password} = this.state;
    /*Call action to autenticate user */
    this.props.authenticate(email,password);
  }

  suppressErrors=()=>{
    /*Call action to suppress error warning */
    this.props.suppressLoginErrors();
  }

  eyeToggle=()=>{
    if(this.state.eye==='eye-slash'){
      this.setState({eye:'eye',secureTextEntry:false});
    }
    else {
      this.setState({eye:'eye-slash',secureTextEntry:true});
    }
  }

  render() {
    const {email,password} = this.state;
    const {SignInReducer:{signInError,signInErrorMessage,loading}} = this.props;

    return (
      <View
        style={[styles.background, styles.container]}
      >
        {
          loading
          ?
          <View style={[styles.container,styles.activityIndicator]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <View style={styles.container}>
            <View style={styles.container} />
              <KeyboardAvoidingView style={styles.wrapper} behavior={"padding"} keyboardVerticalOffset={10} enabled>
                <FontAwesome name={'user-circle'} style={styles.userIcon} size={100}/>
                {signInError&&<Text style={styles.errorMessage}>*Invalid Email or Password</Text>}
                {signInErrorMessage==='Network error'&&<Text style={styles.errorMessage}>Network Error</Text>}
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <FontAwesome
                      name='user'
                      style={styles.icon}
                    />
                  </View>
                  <TextInput
                    placeholder='Chinmaya Registered Email'
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
                    secureTextEntry={this.state.secureTextEntry}
                    value={password}
                    onChangeText={value => this.onChangeText('password',value)}
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onSubmitEditing={()=>{this.signIn()}}
                    onFocus={()=>this.suppressErrors()}
                  />
                  <View style={{paddingHorizontal: 10,alignItems: "center",justifyContent: "center"}}>
                    <TouchableOpacity onPress={()=>this.eyeToggle()}>
                      <FontAwesome
                        name={this.state.eye}
                        style={{width: 20,height: 20,fontSize:20,color:'#E57373'}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={.5} onPress={()=>{this.signIn()}}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                  <Text style={{fontSize:15,color:'#1a53ff'}}>Forgot Password?</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            <View style={styles.container} />
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    SignInReducer:state.SignInReducer
  }
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({
    authenticate,
    logIn,
    suppressLoginErrors
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
