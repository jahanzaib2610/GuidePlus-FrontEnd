import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { styles } from "./CSS/Login_css";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation, setIsAdmin, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const API = 'https://guide-plus.vercel.app'

  const HandleLogin = async() => {
    if(!email || !password){
      Alert.alert('Alert!', 'Please fill all the fields')
      return
    }
    if(password.length < 8){
      Alert.alert('Password Length must be atleast')
      return
    }
      let result = await fetch(`${API}/login`, {
        method:'post',
        body:JSON.stringify({email, password}),
        headers: {
          'Content-Type':'Application/json'
        }
      })
      result = await result.json()
      console.log(result);
      if(result.name){
        if(result.admin == true){
          const name = JSON.stringify(result.name);
          const admin = JSON.stringify(result.admin);
          await AsyncStorage.setItem('name', name)
          await AsyncStorage.setItem('email', email)
          await AsyncStorage.setItem('password', password)
          await AsyncStorage.setItem('admin', admin)
          console.log(email, password, admin, name);
          // if(email && password && admin){
            onLogin(1); // Call the onLogin function passed as a prop
            navigation.navigate('Dashboard')
          // }
        }else{
          try {
          const department = result.department
            const name = result.name
            await AsyncStorage.setItem('name', name)
            await AsyncStorage.setItem('email', email)
            await AsyncStorage.setItem('department', department)
            await AsyncStorage.setItem('password', password)
          console.log(email, password, department, name);
            onLogin(0)
            navigation.navigate('Dashboard')
          } catch (error) {
            Alert.alert('Something went wrong', 'Try again later!', [
              {text: 'OK'},
            ]);
          }
        }
      }
      else{
        Alert.alert('Warning!',JSON.stringify(result.message),[
          {text: 'OK'},
        ]);
      }
    
  };

  return (
    <View style={styles.login}>
      <Image
              source={require("../../assets/background.png")}
              style={{ width: "100%", height: 400, position: "absolute" }}
            />
      <View style={{ paddingTop: 200 }}>
        <Image
          source={require("../assets/images/RIUF.png")}
          style={{ height: 200, width: 209, position: "relative" }}
        />
      </View>
      <View style={{ paddingTop: 36 }}>
        <TextInput 
        placeholder="Email" 
        style={styles.text_input} 
        value={email}
        autoCapitalize='none'
        onChangeText={(text)=>setEmail(text)}
        required
        />
      </View>
      <View style={{ paddingTop: 16 }}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.text_input}
          value={password}
          autoCapitalize='none'
          onChangeText={(text)=>setPassword(text)}
          required
          />
      </View>

      {/* Login button */}
      <View style={{ paddingTop: 18 }}>
        <TouchableOpacity style={styles.login_button} onPress={HandleLogin}>
          <Text style={{ color: "white", fontStyle: "normal", fontSize: 17 }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 14 }}>
        <Text style={{ fontSize: 16 }}> Don't have an account?</Text>
      </View>
      <View style={{ paddingTop: 0 }}>
        <TouchableOpacity
          style={styles.signup_button}
          onPress={() => navigation.navigate("Signup")}
          >
          <Text style={styles.Signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

