import React, {Component} from 'react';
import AppStack from './AppStack';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';
console.disableYellowBox = true;

const createStoreWithMiddleWare=applyMiddleware(thunk)(createStore);

export default class App extends Component {
  render() {
    return(
      <Provider store={createStoreWithMiddleWare(reducers)}>
          <AppStack/>
      </Provider>
    );
  }
}
