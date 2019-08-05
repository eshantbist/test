const initialState = {
  isAuthenticating:false,
  signUpError:false,
  signUpErrorMessage:'',
  signUpConfirmationModal:false,
  isConfirming:false,
  confirmSignUpError:false,
  confirmSignupErrorMessage:''
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

    case 'CONFIRM_SIGNUP':
      return {
        ...state,
        isConfirming: true
      }
    case 'CONFIRM_SIGNUP_SUCCESS':
      return {
        ...state,
        isConfirming: false,
        signUpConfirmationModal: false,
      }
    case 'CONFIRM_SIGNUP_FAILURE':
      return {
        ...state,
        isConfirming: false,
        signUpConfirmationModal: true,
        confirmSignUpError: true,
        confirmSignupErrorMessage: action.error.message
      }

    case 'CLOSE_CONFIRMATION_MODAL':
      return{
        ...state,
        signUpConfirmationModal: false,
        confirmSignUpError: false,
      }

    case 'SUPPRESS_SIGNUP_ERRORS':
      return{
        ...state,
        signUpError: false,
      }

    default:
      return state
  }
}

export default SignInReducer;
