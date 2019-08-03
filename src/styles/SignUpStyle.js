import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  activityIndicator:{
    justifyContent:'center',
    alignItems:'center'
  },
  background: {
    width: null,
    height: null
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    backgroundColor: "transparent",
    borderColor:'#cccccc',
    borderWidth:1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF'
  },
  iconWrap: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0088cc"
  },
  icon: {
    width: 20,
    height: 20,
    fontSize:20,
    color:'white'
  },
  button: {
    backgroundColor: "#0088cc",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18
  },
  forgotpasswordText: {
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center"
  },
  errorMessage:{
    alignSelf:'center',
    color:'red'
  },
  userIcon:{
    color:'#333333',
    alignSelf:'center'
  }
});

export default styles;
