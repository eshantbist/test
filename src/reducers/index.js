import ListReducer from './ListReducer'
import InternetReducer from './InternetReducer'
import {combineReducers} from 'redux';

const rootReducer= combineReducers({
  ListReducer,
  InternetReducer
})

export default rootReducer;
