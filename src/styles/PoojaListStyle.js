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
  },
  offlineContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  offlineImage: {
    width: '20%',
    height: '10%'
  },
  noInternetText:{
    color:'#666666',
    fontSize:20,
    marginHorizontal:30
  },
  retryButton:{
    borderWidth:0.5,
    marginTop:20,
    padding:8,
    borderColor:'#404040',
    borderRadius:5
  },
  retryButtonText:{
    fontSize:20,
    color:'#666666'
  }
});

export default styles;
