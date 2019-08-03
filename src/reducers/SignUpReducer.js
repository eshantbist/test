const initialState = {
  isAuthenticating:false,
  signUpError:false,
  signUpErrorMessage:'',
  signUpConfirmationModal:false,
}

const SignInReducer=(state = initialState, action) => {
  switch(action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        isAuthenticating: true,
        signUpError: false,
        signUpErrorMessage:'',
      }

    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        isAuthenticating: false,
        signUpError: false,
        signUpErrorMessage:'',
        signUpConfirmationModal:true
      }

    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        isAuthenticating: false,
        signUpError: true,
        signUpErrorMessage: action.error,
        signUpConfirmationModal:false
      }

    default:
      return state
  }
}

export default SignInReducer;
