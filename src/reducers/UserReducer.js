const initialState = {
  userLoading:true,
  user:{},
}

const UserReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'GET_USER':
    return{
      user:action.user,
      userLoading:false
    }

    case 'NO_USER_FOUND':
    return{
      user:{},
      userLoading:false
    }

    default:
    return state;
  }
}

export default UserReducer
