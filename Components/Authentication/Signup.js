import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from './CSS/Signup_css';


export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setpassword] = useState("");

  const API = 'https://guide-plus.vercel.app'

  const HandleSignup = async () => {
    if (!name || !rollNo || !email || !gender || !department || !password) {
      Alert.alert('Please fill all the fields correctly!')
      return
    }
    else if (password.length < 8) {
      Alert.alert('Password Length must be atleast 8 characters!')
      return
    }
    else {
      try {
        let result = await fetch(`${API}/signup`, {
          method: 'post',
          body: JSON.stringify({ name, rollNo, email, department, gender, password }),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (result.ok) {
          const data = await result.json();
          Alert.alert(data.message)
          // console.log(data);
          navigation.navigate("Login")
        }
        else {
          const errorData = await result.json()
          Alert.alert(errorData.error)
        }


      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <View style={styles.login}>

      {/* Riphah Image  */}

      <View
        style={{
          paddingTop: 50,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: "#3299ca",
              fontSize: 40,
              fontWeight: "bold",
              padding: 20,
            }}
          >
            Create Account
          </Text>
        </View>
        <TextInput
          placeholder="Name"
          style={styles.text_input}
          value={name}
          onChangeText={(text) => { setName(text) }}

        />
      </View>
      <View style={{ paddingTop: 14 }}>
        <TextInput
          placeholder="Roll No."
          style={styles.text_input}
          keyboardType='numeric'
          value={rollNo}
          onChangeText={(text) => { setRollNo(text) }}
        />
      </View>
      <View style={{ paddingTop: 14 }}>
        <TextInput
          placeholder="Email"
          style={styles.text_input}
          value={email}
          autoCapitalize='none'
          onChangeText={(text) => { setEmail(text) }}
        />
      </View>
      <View style={{ paddingTop: 14 }}>
        <TextInput
          placeholder="Gender"
          style={styles.text_input}
          value={gender}
          onChangeText={(text) => { setGender(text) }}
        />
      </View>
      <View style={{ paddingTop: 14 }}>
        <TextInput
          placeholder="Department"
          style={styles.text_input}
          value={department}
          onChangeText={(text) => { setDepartment(text) }}
        />
      </View>
      <View style={{ paddingTop: 14 }}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.text_input}
          value={password}
          autoCapitalize='none'
          onChangeText={(text) => { setpassword(text) }}
        />
      </View>
      <View style={{ paddingTop: 14 }}>
        <TextInput
          placeholder="Re Enter Passowrd"
          secureTextEntry
          autoCapitalize='none'
          style={styles.text_input}
        />
      </View>

      <View style={{ paddingTop: 14 }}>
        {/* Login button */}
        <TouchableOpacity style={styles.login_button} onPress={HandleSignup}>
          <Text style={{ color: "white", fontStyle: "normal", fontSize: 17 }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 14 }}>
        <Text style={{ fontSize: 16 }}> Already have an account?</Text>
      </View>
      <View style={{ paddingTop: 0 }}>
        <TouchableOpacity
          style={styles.signup_button}
          onPress={() => { navigation.navigate("Login") }}
        >
          <Text
            style={{
              color: "#3299ca",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
