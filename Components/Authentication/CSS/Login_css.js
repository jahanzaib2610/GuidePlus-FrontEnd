import {StyleSheet } from 'react-native'

 const styles = StyleSheet.create({
    login: {
      height: "100%",
      width: "100%",
      alignItems: "center",
    },
    text_input: {
  
      width: 270,
      height: 44,
      // backgroundColor: '#d1d1d1',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: '#d1d1d1',
      // borderWidth: 0.8,
      borderRadius: 8,
      fontSize: 17,
      borderBottomWidth: 0.8,
  
  
    },
    login_button: {
      width: 270,
      height: 44,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 0,
      borderRadius: 8,
      backgroundColor: '#329acb',
      justifyContent: "center",
      alignItems: "center",
  
  
    },
    signup_button: {
      width: 60,
      // height: 44,
      // paddingVertical: 10,
      // paddingHorizontal: 15,
      borderWidth: 0,
      // borderRadius: 15, 
      // backgroundColor:'#329acb',      
      justifyContent: "center",
      alignItems: "center",
  
  
    },
  
    Signup: {
        color: "#3299ca",
        fontWeight: "bold",
        textDecorationLine: "underline",
      },

  });
  export {styles}