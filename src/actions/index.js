/*Action-Types for pooja item and pooja list*/
import {SHOW_FORM_MODAL,CHANGE_LIST_VIEW, SET_POOJA} from './actionTypes';

/*Action-Types For Syncing*/
import {SYNC_STATE_CHANGE,SET_INERNET_VALUE} from './actionTypes';

/*Action-Types For SignIn*/
import {LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE,SUPPRESS_SIGNIN_ERRORS} from './actionTypes';

/*Action-Types For LogOut*/
import {LOG_OUT} from './actionTypes';

/*Action-Types For User*/
import {GET_USER,NO_USER_FOUND} from './actionTypes';

/*Action-Types For SignUp*/
import {SIGN_UP,SIGN_UP_FAILURE,SIGN_UP_SUCCESS,SUPPRESS_SIGNUP_ERRORS} from './actionTypes';

/*Action-Types For SignUp confirmation*/
import {CONFIRM_SIGNUP,CONFIRM_SIGNUP_SUCCESS,CONFIRM_SIGNUP_FAILURE,CLOSE_CONFIRMATION_MODAL} from './actionTypes';

/*Action-Types For fetching user details*/
import {FETCH_USER_INFO,FETCH_USER_INFO_FAILURE,FETCH_USER_INFO_SUCCESS} from './actionTypes';

/*Action-Types For forgot password*/
import {FORGOT_PASSWORD,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAILURE} from './actionTypes';

import NetInfo from "@react-native-community/netinfo";
import SQLite from 'react-native-sqlite-storage';
import {Platform,Alert,AsyncStorage} from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config)
let db;

/*Actions For User*/
export function getUser(){
  console.log("here");
  return(dispatch)=>{
    Auth.currentAuthenticatedUser()
    .then(user => {
      console.log(user);
      dispatch(getUserDetails(user))
    })
    .catch(err => {
      console.log(err);
      dispatch(noUserFound(err))
    });
  }
}

function getUserDetails(user){
  return{
    type:GET_USER,
    user
  }
}

function noUserFound(user){
  return{
    type:NO_USER_FOUND,
  }
}

/*Actions For Syncing*/
export function setInternetValues(){
    return (dispatch) => {
      NetInfo.fetch().then(state => {
          db = SQLite.openDatabase({ name: "appDB", createFromLocation: "~MyPooja.db" },
              this.openSuccess, this.openError);
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM my_pooja', [], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              console.log(temp);
            });
          });
        dispatch(setInternetState(state));
        if(state.isConnected == true && state.isInternetReachable == true ){
           dispatch(syncStatus('synchronize'));
        }
        else{
          dispatch(syncStatus('inProgress'));
        }
      });
    }
}

function setInternetState(internetState){
  return{
    type:SET_INERNET_VALUE,
    internetState
  }
}

function syncStatus(value){
  return{
    type:SYNC_STATE_CHANGE,
    value
  }
}

export function sync(){
  return(dispatch)=>{
    NetInfo.fetch().then(state => {
      if(Platform.OS=='ios'){
        db = SQLite.openDatabase({name: 'MyPooja.db', createFromLocation : "~www/MyPooja.db", location: 'Library'},
          this.openSuccess, this.openError);
      }
      else{
        db = SQLite.openDatabase({ name: "appDB", createFromLocation: "~MyPooja.db" },
            this.openSuccess, this.openError);
      }
      let count = 0;
      if(state.isConnected == true && state.isInternetReachable == true ){
          console.log(state);
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM my_pooja', [], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              temp.map(async tempdata=>{
                if(tempdata.sync==0){
                  let data = {
                    'pooja_name':tempdata.pooja_name,
                    'pooja_amount':tempdata.pooja_amount,
                    'person_name':tempdata.person_name,
                    'nakshatra':tempdata.nakshatra,
                    'gotra':tempdata.gotra,
                    'other_info':tempdata.other_info,
                    'phone_number':tempdata.phone_number
                  }
                  let response = await fetch(`http://echoes.staging.chinmayamission.com/wp-json/gcmw/v1/set-pooja-list`, {
                      method: 'POST',
                      headers: {
                        'Accept':       'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data),
                    });
                  console.log(response);
                  if(response.status==200){
                    count ++;
                  }
                  let json = await response.json();
                  console.log(json);
                  if(json=='success'){
                    db.transaction(tx => {
                      tx.executeSql(
                        'DELETE FROM  my_pooja where id=?',
                        [tempdata.id],
                        (tx, results) => {
                          console.log('Results', results.rowsAffected);
                          if (results.rowsAffected > 0) {
                            console.log('deleted');
                          } else {
                            console.log('Please insert a valid User Id');
                          }
                        }
                      );
                    });
                  }
                  if(count>0){
                    Alert.alert(
                      '',
                      `${count} items synced`
                    )
                  }
                  else{
                    Alert.alert(
                      '',
                      `Data upto date`
                    )
                  }
                }
              })
          })
        });
      }
      dispatch(syncStatus('synchronize'));
    });
  }
}

/*Actions for pooja item and pooja list*/
export function savePoojaDetails(pooja_name,pooja_amount,phone_number,person_name,nakshatra,gotra,other_info){
  if(Platform.OS=='ios'){
    db = SQLite.openDatabase({name: 'MyPooja.db', createFromLocation : "~www/MyPooja.db", location: 'Library'},
      this.openSuccess, this.openError);
  }
  else{
    db = SQLite.openDatabase({ name: "appDB", createFromLocation: "~MyPooja.db" },
        this.openSuccess, this.openError);
  }
  return (dispatch) => {
    NetInfo.fetch().then(async(state) => {
      dispatch(setInternetState(state));
      if(state.isConnected == true && state.isInternetReachable == true ){
        let data = {
          'pooja_name':pooja_name,
          'pooja_amount':pooja_amount,
          'person_name':person_name,
          'nakshatra':nakshatra,
          'gotra':gotra,
          'other_info':other_info,
          'phone_number':phone_number

        }
        let response = await fetch(`http://echoes.staging.chinmayamission.com/wp-json/gcmw/v1/set-pooja-list`, {
            method: 'POST',
            headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        if(response.status==200){
          Alert.alert(
            '',
            `Successfully uploaded`
          )
        }
        let json = await response.json();
      }
      else {
        db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO my_pooja (pooja_name, pooja_amount, person_name,phone_number,nakshatra,gotra,other_info,sync ) VALUES (?,?,?,?,?,?,?,?)',
              [pooja_name, pooja_amount, person_name,phone_number, nakshatra, gotra, other_info, false],
              (tx, results) => {
                console.log('Results', results);
                if (results.rowsAffected > 0) {
                  console.log('Added to local Database');
                  Alert.alert(
                    '',
                    `No Internet Will be synced later automatically`
                  )
                } else {
                  console.log('Registration Failed');
                }
              }
            );
          });
      }
    });
  }
}

export function change_list_view(isListView){
  return{
    type:CHANGE_LIST_VIEW,
    isListView
  }
}

export function getPooja(pooja){
  return{
    type:SET_POOJA,
    pooja
  }
}

export function showFormModal(value){
  return{
    type:SHOW_FORM_MODAL,
    value
  }
}


/*Actions For SignIn*/
export function authenticate(email, password) {
  return (dispatch) => {
    let lowerCaseEmail=email.toLowerCase();
    lowerCaseEmail =lowerCaseEmail.trim(lowerCaseEmail);
    dispatch(logIn())
    Auth.signIn(lowerCaseEmail, password)
      .then(user => {
        Auth.currentAuthenticatedUser()
        .then(user => {
          if(user.attributes.name=='User'){
            Auth.signOut();
          }
          else {
            dispatch(fetchUserDetails(lowerCaseEmail));
            dispatch(logInSuccess())
          }
        })
        .catch(err => console.log(err));
      })
      .catch(err => {
        if(err.name==='UserNotConfirmedException')
        {
          Auth.resendSignUp(email)
               .then(data => {
                 console.log("Show user not confirmed signup modal");
               })
               .catch(err => {
                 dispatch(logInFailure(err))
                 console.log('error signing up: ', err)
               });
          }
        else{
          dispatch(logInFailure(err))
        }
      });
  }
}

export function logIn() {
  return {
    type: LOG_IN
  }
}

function logInSuccess() {
  return {
    type: LOG_IN_SUCCESS,
  }
}

function logInFailure(error) {
  return {
    type: LOG_IN_FAILURE,
    error
  }
}

export function suppressLoginErrors(){
  return{
    type: SUPPRESS_SIGNIN_ERRORS,
  }
}

export function userForgotPassword(email){
  let lowerCaseEmail=email.toLowerCase();
  lowerCaseEmail =lowerCaseEmail.trim(lowerCaseEmail);
  return (dispatch) => {
    dispatch(forgotPassword())
    Auth.forgotPassword(lowerCaseEmail)
      .then(data =>
        dispatch(forgotPasswordSuccess())
      )
      .catch(err => {
        console.log(err);
        dispatch(forgotPasswordFailure(err))
      });
  }
}

function forgotPassword(){
  return{
    type:FORGOT_PASSWORD
  }
}

function forgotPasswordSuccess(){
  return{
    type:FORGOT_PASSWORD_SUCCESS
  }
}

function forgotPasswordFailure(error){
  return{
    type:FORGOT_PASSWORD_FAILURE,
    error
  }
}

export function confirmNewPassword(email,code,new_password){
  let lowerCaseEmail=email.toLowerCase();
  lowerCaseEmail =lowerCaseEmail.trim(lowerCaseEmail);
  return (dispatch) => {
    dispatch(confirmForgotPassword())
    Auth.forgotPasswordSubmit(lowerCaseEmail, code, new_password)
    .then(data =>
      {
        dispatch(confirmForgotPasswordSuccess())
    })
    .catch(err => {
        console.log(err);
        dispatch(confirmForgotPasswordFailure(err))
    });
  }
}

function confirmForgotPassword(){
  return{
    type:'CONFIRM_FORGOT_PASSWORD'
  }
}

function confirmForgotPasswordSuccess(){
  return{
    type:'CONFIRM_FORGOT_PASSWORD_SUCCESS'
  }
}

function confirmForgotPasswordFailure(error){
  return{
    type:'CONFIRM_FORGOT_PASSWORD_FAILURE',
    error
  }
}



/*Actions For Fetching user details*/
export function fetchUserDetails(lowerCaseEmail){
  return(dispatch)=>{
    dispatch(fetchUserInfo());
    // fetch('http://echoes.staging.chinmayamission.com/wp-json/gcmw/v1/get-user-temple',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Accept':       'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({username:lowerCaseEmail}),
    //   })
    // .then(response => {
    //    response.json()
    //   .then(json => {
    //       AsyncStorage.setItem('availablePooja',JSON.stringify(json));
    //       dispatch(fetchUserInfoSuccess(json));
    //   })
    //   .catch(err => {
    //       console.log(err)
    //   })
    // })
    // .catch(err=>{
    //   dispatch(fetchUserInfoFailure());
    // })

    fetch('https://5fd3dqj2dc.execute-api.us-east-1.amazonaws.com/v2/forms/5d4904fc7964b10001d0987e',{
        method:'GET',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'anonymus'
        },
      })
     .then(response=>{
       response.json()
       .then(json=>{
         AsyncStorage.setItem('availablePooja',JSON.stringify(json.res.schema.properties));
         console.log(json.res.schema.properties);
         dispatch(fetchUserInfoSuccess(json.res.schema.properties));
       })
       .catch(err=>{
         dispatch(fetchUserInfoFailure());
       })
     })
     .catch(err=>{
       dispatch(fetchUserInfoFailure());
     })
  }
}

function fetchUserInfo(){
  return {
    type: FETCH_USER_INFO,
  }
}

function fetchUserInfoSuccess(info){
  return {
    type: FETCH_USER_INFO_SUCCESS,
    info
  }
}

function fetchUserInfoFailure(){
  return {
    type: FETCH_USER_INFO_FAILURE,
  }
}

export function signOut(){
  return(dispatch)=>{
    Auth.signOut()
      .then(() => {
        dispatch(logOut());
      })
      .catch(err => {
        console.log('err: ', err)
      })
      Alert.alert(
        "Logged Out Successfully"
      )
  }
}

function logOut(){
  return{
    type:LOG_OUT
  }
}


/*Actions For SignUp*/
export function createUser(email, password, fullname) {
  return (dispatch) => {
    dispatch(signUp());
    let lowerCaseEmail=email.toLowerCase();
    lowerCaseEmail =lowerCaseEmail.trim(lowerCaseEmail);
    let name = fullname.trim(fullname);
    /*If user already exists and try to sign up,then sign him/her first*/
    Auth.signIn( lowerCaseEmail, password )
    .then( user => {
      dispatch(closeLoading())
      setTimeout(() => {
        Alert.alert('User exists go to Sign In ')
      }, 10)
      return Auth.signOut();
    } )

    /*Else try signing up in catch block*/
    .catch( err => {
          console.log(err);
          if(err.name==='UserNotFoundException')
          {
               /*aws-amplify signup function*/
               Auth.signUp({
                      username:lowerCaseEmail,
                      password:password,
                      attributes: {
                        name:name,
                      }
                    })
                    .then(data => {
                      console.log('data from signUp: ', data)
                      dispatch(signUpSuccess(data))
                    })
                    .catch(err => {
                      console.log('error signing up: ', err)
                      if(err.code=="InvalidParameterException"){
                        let error="Your Password or email does not follow our policy";
                        dispatch(signUpFailure(error))
                      }
                      else{
                        dispatch(signUpFailure(err.message))
                      }
                    });
            }
            else{
              dispatch(signUpFailure(err.message))
            }
            // if(err.name==='UserNotConfirmedException')
            // {
            //   Auth.resendSignUp(username)
            //        .then(data => {
            //          dispatch(signUpSuccess(data))
            //        })
            //        .catch(err => {
            //          if(err.code=="LimitExceededException"){
            //            let error="You exceeded limit please try after sometime";
            //            dispatch(signUpFailure(error))
            //          }
            //          else{
            //            dispatch(signUpFailure(err.message))
            //          }
            //        });
            //   }
            // if(err.name==='NotAuthorizedException')
            // {
            //   Alert.alert('User exists go to Sign In ')
            // }
            // if(err.name==='Error')
            // {
            //   let error='Network Error';
            //   dispatch(signUpFailure(error))
            // }
            // if(err.name=="InvalidParameterException"){
            //   let error="Your Password or email does not follow our policy";
            //   dispatch(signUpFailure(error))
            // }
        } );

  }
}

function signUp() {
  return {
    type: SIGN_UP
  }
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(error) {
  return {
    type: SIGN_UP_FAILURE,
    error
  }
}

export function closeConfirmationModal(){
  return{
    type:CLOSE_CONFIRMATION_MODAL,
  }
}

export function suppressSignUpErrors(){
  return{
    type:SUPPRESS_SIGNUP_ERRORS
  }
}

export function confirmUserSignUp(email, authCode) {
  let lowerCaseEmail=email.toLowerCase();
  lowerCaseEmail =lowerCaseEmail.trim(lowerCaseEmail);
  return (dispatch) => {
    dispatch(confirmSignUp())
    Auth.confirmSignUp(lowerCaseEmail, authCode)
      .then(data => {
        console.log('data from confirmSignUp: ', data)
        dispatch(confirmSignUpSuccess())
      })
      .catch(err => {
        console.log(err);
        dispatch(confirmSignUpFailure(err))
      });
  }
}

function confirmSignUp() {
  return {
    type: CONFIRM_SIGNUP
  }
}

function confirmSignUpSuccess() {
  return {
    type: CONFIRM_SIGNUP_SUCCESS
  }
}

function confirmSignUpFailure(error) {
  return {
    type: CONFIRM_SIGNUP_FAILURE,
    error
  }
}
