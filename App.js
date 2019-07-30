import React, {Component} from 'react';
import AppStack from './AppStack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/reducers';
console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return(
      <Provider store={createStore(rootReducer)}>
          <AppStack/>
      </Provider>
    );
  }
}
