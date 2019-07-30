const initialState = {
  isListView:false,
  formModal:false,
  currentPooja:{},
}

const ListReducer=(state=initialState,action)=>{
  switch (action.type) {
    case 'CHANGE_LIST_VIEW':
    return{
      ...state,
      isListView:action.isListView
    }

    case 'SET_POOJA':
    return{
      ...state,
      currentPooja:action.pooja
    }

    case 'SHOW_FORM_MODAL':
    return{
      ...state,
      formModal:action.value
    }

    default:
    return state;
  }
}

export default ListReducer
