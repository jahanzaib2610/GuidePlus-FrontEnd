import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, Keyboard } from 'react-native'
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';


const RoomLocator = () => {
  const Separator = () => <View style={styles.separator} />;
  const [roomNo, setRoomNo] = useState('')
  const [description, setDescription] = useState('Feel free to search your room')
  const [getImage, setGetImage] = useState('https://via.placeholder.com/150')

  const API = 'https://guide-plus.vercel.app'

  const HandleSearch = async() => {
    // try {
      let result = await fetch(`${API}/roomLocator/searchRoom`, {
          method:'post',
          body:JSON.stringify({roomNo}),
          headers: {
            'Content-Type':'Application/json'
          }
        })
        result= await result.json();
        // console.log(result);
        if(result.description){
          setDescription(result.description)
          setGetImage(result.imageURL)
          Keyboard.dismiss()
          // console.log(getImage);
        }else{
          Alert.alert(result.result)
          setDescription('Feel free to search your room')
        }
      
    // } catch (error) {
    //   Alert.alert('Something went wrong', 'Try agin Later')
    // }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerText}>
        <Text style={styles.headingText}>Having a problem in finding your room</Text>
        <Text style={styles.subText}>We are right here to help you</Text>
      </View>
      <View style={styles.searchArea}></View>
      <Separator />
      <View >
        <TextInput
          style={styles.inputField}
          keyboardType='numeric'
          value={roomNo}
          placeholder='Search Room No. Here...'
          onChangeText={(text) => setRoomNo(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={HandleSearch}>
          <Text style={{ color: "white", fontWeight: 'bold', fontSize: 17 }}>Search</Text>
          <FontAwesome5 name="search-location" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Separator style={styles.secondSeparator}/>
      <View style={styles.detailSection}>
        <Text style={{fontWeight:'bold', fontSize:20, paddingBottom:20}}>Description:</Text>
        <View style={styles.descriptionArea}>
          <Text style={{fontWeight:'light', fontSize:16}}>{description}</Text>
        </View>
        <Image source={{ uri: getImage }} style={{ width: '100%', height: 200, borderRadius: 10, objectFit:'cover' }} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom:20
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 28,
    padding: 5,
  },
  subText: {
    fontSize: 18,
    padding: 5,
  },
  inputField: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderBottomWidth: 0.7,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 5
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom:10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#329acb',
    borderColor: 'black',
    borderBottomWidth: 0.7,
    borderStyle: 'solid',
  }
});
export default RoomLocator