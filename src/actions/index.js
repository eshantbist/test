import {SET_INERNET_VALUE,SHOW_FORM_MODAL,CHANGE_LIST_VIEW, SET_POOJA} from './actionTypes'
import NetInfo from "@react-native-community/netinfo";
import SQLite from 'react-native-sqlite-storage';
let db;
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

export function setInternetValues(){
    return (dispatch) => {
      NetInfo.fetch().then(state => {
        dispatch(setInternetState(state));
        db = SQLite.openDatabase({ name: "appDB", createFromLocation: "~MyPooja.db" },
            this.openSuccess, this.openError);
        if(state.isConnected == true && state.isInternetReachable == true ){
            db.transaction(tx => {
              tx.executeSql('SELECT * FROM my_pooja', [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                  temp.push(results.rows.item(i));
                }
                console.log(temp);
                temp.map(async tempdata=>{
                  if(tempdata.sync==0){
                      db.transaction((tx)=> {
                        tx.executeSql(
                          'UPDATE my_pooja set sync=? where id=?',
                          [1,tempdata.id],
                          (tx, results) => {
                            if(results.rowsAffected>0){
                              alert("updated row");
                            }else{
                              console.log('Updation Failed');
                            }
                          }
                        );
                      });
                      let data = {
                        'pooja_name':tempdata.pooja_name,
                        'pooja_amount':tempdata.pooja_amount,
                        'person_name':tempdata.person_name,
                        'nakshatra':tempdata.nakshatra,
                        'gotra':tempdata.gotra,
                        'other_info':tempdata.other_info,
                        'phone_number':tempdata.phone_number
                      }
                      let response = await fetch(`http://echoes.staging.chinmayamission.com/wp-json/gcmw/v1/set-pooja-list`, {
                          method: 'POST',
                          headers: {
                            'Accept':       'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(data),
                        });
                      let json = await response.json();
                  }
                })
            })
          });
        }
      });
    }
}

function setInternetState(internetState){
  return{
    type:SET_INERNET_VALUE,
    internetState
  }
}

export function savePoojaDetails(pooja_name,pooja_amount,phone_number,person_name,nakshatra,gotra,other_info){
  db = SQLite.openDatabase({ name: "appDB", createFromLocation: "~MyPooja.db" },
      this.openSuccess, this.openError);
  return (dispatch) => {
    NetInfo.fetch().then(async(state) => {
      dispatch(setInternetState(state));
      if(state.isConnected == true && state.isInternetReachable == true ){
        let data = {
          'pooja_name':pooja_name,
          'pooja_amount':pooja_amount,
          'person_name':person_name,
          'nakshatra':nakshatra,
          'gotra':gotra,
          'other_info':other_info,
          'phone_number':phone_number

        }
        let response = await fetch(`http://echoes.staging.chinmayamission.com/wp-json/gcmw/v1/set-pooja-list`, {
            method: 'POST',
            headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        let json = await response.json();
      }
      else {
        db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO my_pooja (pooja_name, pooja_amount, person_name,phone_number,nakshatra,gotra,other_info,sync ) VALUES (?,?,?,?,?,?,?,?)',
              [pooja_name, pooja_amount, person_name,phone_number, nakshatra, gotra, other_info, false],
              (tx, results) => {
                console.log('Results', results);
                if (results.rowsAffected > 0) {
                  alert('Successfully uploaded');
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });
      }
    });
  }
}
