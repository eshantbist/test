import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 2,
    padding:5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontSize:25
  },
  itemPrice: {
    color: '#fff',
    position:'absolute',
    bottom:5,
  },
  modalContainer:{
    borderRadius:20,
    width:'80%',
    height:'60%',
    borderWidth:1,
    borderColor:'white',
    padding:10,
    backgroundColor:'white'
  }
});

export default styles;
