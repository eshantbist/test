import React, {Component} from 'react';
import {SafeAreaView} from 'react-native'
import {createStackNavigator, createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PoojaList from './src/containers/PoojaList'
import SignIn from './src/containers/SignIn'
import SignUp from './src/containers/SignUp'
import ForgotPassword from './src/containers/ForgotPassword'
import PoojaDetail from './src/components/PoojaDetail'
import PoojaListHeader from './src/containers/PoojaListHeader'
import config from './src/aws-exports';
import Amplify, { Auth } from 'aws-amplify';
Amplify.configure(config);
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUser,fetchUserDetails} from './src/actions'

const AppNavigator = createStackNavigator({
  Home: {
    screen: PoojaList,
    navigationOptions: ({navigation}) => ({
      header : <PoojaListHeader navigation={navigation}/>,
    }),
  },
  Detail: {
    screen: PoojaDetail,
    navigationOptions: ({navigation}) => ({
      title : "POOJA ",
    }),
  }
});

const AuthNavigator = createMaterialBottomTabNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'SignIn') {
          iconName = `sign-in`;
        } else if (routeName === 'SignUp') {
          iconName = `user-plus`;
        }
        return <FontAwesome name={iconName} size={20} color={tintColor} />;
      },
    }),
    activeTintColor: 'white',
    animationEnabled: true,
    shifting: true,
});

const AuthStackNavigator = createSwitchNavigator({
  Auth: { screen: AuthNavigator },
  ForgotPassword: {screen: ForgotPassword}
});

const AuthStackContainer = createAppContainer(AuthStackNavigator);

const StackContainer= createAppContainer(AppNavigator);

class AppStack extends Component {
  state = {
    user: {},
    isLoading: true
  }

  async componentDidMount() {
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
         console.log(json.res.schema.properties);
       })
       .catch(err=>{
         console.log(err);
       })
     })
     .catch(err=>{
       console.log(err);
     })
     
    try {
      const user = await Auth.currentAuthenticatedUser()
      if(user.username){
        this.props.fetchUserDetails(user.attributes.email);
      }
      this.setState({ user, isLoading: false })
    } catch (err) {
      console.log(err);
      this.setState({isLoading: false })
    }
  }

  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ user })
    } catch (err) {
      this.setState({ user: {} })
    }
  }

  // componentDidMount() {
  //   this.props.getUser();
  // }
  //
  // static getDerivedStateFromProps(nextProps, prevState){
  //     console.log(nextProps);
  //     console.log(prevState);
  //     if (nextProps.SignInReducer !== prevState.SignInReducer) {
  //         //this.props.getUser();
  //         return true;
  //     }
  //     else return null; // Triggers no change in the state
  // }


  render() {
    let loggedIn = false
    if (this.state.user.username ) {
      loggedIn = true
    }
    if (this.state.isLoading){
      return null
    }
    if(loggedIn){
      return (
        <StackContainer />
      )
    }
    return(
       <AuthStackContainer/>
    )
  }
}

const mapStateToProps = state => ({
  SignInReducer: state.SignInReducer
})

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({getUser,fetchUserDetails},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AppStack)
