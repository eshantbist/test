const initialState = {
  internetState:{}
}

const ListReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'SET_INERNET_VALUE':
    console.log(action.internetState);
    return{
      ...state,
      internetState:action.internetState
    }

    default:
    return state;
  }
}

export default ListReducer
