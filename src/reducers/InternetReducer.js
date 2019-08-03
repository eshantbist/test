const initialState = {
  internetState:{},
  syncStatus:'inProgress'
}

const ListReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'SET_INERNET_VALUE':
    return{
      ...state,
      internetState:action.internetState
    }

    case 'SYNC_STATE_CHANGE':
    return{
      ...state,
      syncStatus:action.value
    }

    default:
    return state;
  }
}

export default ListReducer
