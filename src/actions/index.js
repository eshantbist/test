import {SHOW_FORM_MODAL,CHANGE_LIST_VIEW, SET_POOJA} from './actionTypes'


export function change_list_view(isListView){
  return{
    type:CHANGE_LIST_VIEW,
    isListView
  }
}

export function getPooja(pooja){
  return{
    type:SET_POOJA,
    pooja
  }
}

export function showFormModal(value){
  return{
    type:SHOW_FORM_MODAL,
    value
  }
}
