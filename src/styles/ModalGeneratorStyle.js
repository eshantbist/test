import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaContainer:{
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  outsideContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  modalContainer:{
    borderRadius:20,
    width:'80%',
    height:'60%',
    borderWidth:1,
    borderColor:'white',
    padding:10,
    backgroundColor:'white'
  },
  inputStyle:{
    borderWidth:1,
    borderRadius:20,
    padding:5,
    marginVertical:10,
    paddingLeft:10
  },
  textArea:{
    height:80,
    borderRadius:10
  },
  priceText:{
    fontSize:15,
    marginLeft:5
  },
  nameText:{
    padding:10,
    alignSelf:'center',
    fontSize:18
  }
});

export default styles;
