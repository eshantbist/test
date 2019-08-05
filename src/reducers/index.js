import ListReducer from './ListReducer'
import InternetReducer from './InternetReducer'
import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer';
import UserReducer from './UserReducer'
import SignUpReducer from './SignUpReducer'
import ForgotPasswordReducer from './ForgotPasswordReducer'

const rootReducer= combineReducers({
  ListReducer,
  InternetReducer,
  SignInReducer,
  UserReducer,
  SignUpReducer,
  ForgotPasswordReducer
})

export default rootReducer;
