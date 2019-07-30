import React, {Fragment} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import PoojaList from './src/containers/PoojaList'
import PoojaDetail from './src/components/PoojaDetail'
import Header from './src/containers/Header'

const AppNavigator = createStackNavigator({
  Home: {
    screen: PoojaList,
    navigationOptions: ({navigation}) => ({
      header : <Header navigation={navigation}/>,
    }),
  },
  Detail: {
    screen: PoojaDetail,
    navigationOptions: ({navigation}) => ({
      title : "POOJA ",
    }),
  }
});

const AppStack= createAppContainer(AppNavigator);

export default AppStack;
