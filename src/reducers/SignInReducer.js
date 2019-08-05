const initialState = {
  signInError: false,
  signInErrorMessage: '',
  success:false,
  loading:false
}

const SignInReducer=(state = initialState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        signInError: false,
        success:false,
        signInErrorMessage: '',
        loading:true,
      }
    case 'LOG_IN_SUCCESS':
      return {
        signInError: false,
        signInErrorMessage: '',
        success:true,
        loading:false,
      }
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        signInError: true,
        signInErrorMessage: action.error.message,
        success:false,
        loading:false,
      }

    case 'LOG_OUT':
      return {
        ...state,
      }

    case 'SUPPRESS_SIGNIN_ERRORS':
      return{
        signInError: false,
      }

    default:
      return state
  }
}

export default SignInReducer;
