const initialState = {
  forgotPasswordError: false,
  forgotPasswordErrorMessage: '',
  success:false,
  loading:false,
  forgotPasswordConfirmationalModal:false,
  confirmForgotPasswordError:false,
  confirmForgotPasswordErrorMessage:'',
  challengeSuccess:false,
  challengeLoading:false
}

const ForgotPasswordReducer=(state = initialState, action) => {
  switch(action.type) {
    case 'FORGOT_PASSWORD':
      return {
        ...state,
        forgotPasswordError: false,
        success:false,
        forgotPasswordErrorErrorMessage: '',
        loading:true,
      }
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        forgotPasswordError: false,
        forgotPasswordErrorErrorMessage: '',
        success:true,
        loading:false,
        forgotPasswordConfirmationalModal:true
      }
    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        forgotPasswordError: true,
        forgotPasswordErrorErrorMessage: action.error.message,
        success:false,
        loading:false,
      }

    case 'CONFIRM_FORGOT_PASSWORD':
      return{
        ...state,
        confirmForgotPasswordError: false,
        confirmForgotPasswordErrorMessage: '',
        challengeSuccess:false,
        challengeLoading:true,
      }

    case 'CONFIRM_FORGOT_PASSWORD_SUCCESS':
      return{
        ...state,
        confirmForgotPasswordError: false,
        confirmForgotPasswordErrorMessage: '',
        challengeSuccess:true,
        challengeLoading:false,
        forgotPasswordConfirmationalModal:false
      }

    case 'CONFIRM_FORGOT_PASSWORD_FAILURE':
      return{
        ...state,
        confirmForgotPasswordError: true,
        confirmForgotPasswordErrorMessage: action.error.message,
        challengeSuccess:false,
        challengeLoading:false,
      }

    default:
      return state
  }
}

export default ForgotPasswordReducer;
