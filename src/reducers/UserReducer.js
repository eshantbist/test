const initialState = {
  userLoading:false,
  poojaAvailable:[],
  templeInfo:[],

}

const UserReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'FETCH_USER_INFO':
    return{
      userLoading:true
    }

    case 'FETCH_USER_INFO_SUCCESS':
    return{
      ...state,
      poojaAvailable:action.info.pooja_available,
      templeInfo:action.info.temple,
      userLoading:false,
    }

    case 'FETCH_USER_INFO_FAILURE':
    return{
      ...state,
      userLoading:false
    }

    default:
    return state;
  }
}

export default UserReducer
