import ListReducer from './ListReducer'
import InternetReducer from './InternetReducer'
import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import UserReducer from './UserReducer'
import SignUpReducer from './SignUpReducer'

const rootReducer= combineReducers({
  ListReducer,
  InternetReducer,
  SignInReducer,
  UserReducer,
  SignUpReducer,
})

export default rootReducer;
