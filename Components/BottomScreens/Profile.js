import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  
  useEffect(() => {
    getProfile()
  }, [])
  const getProfile = async() => {
    let getName = await AsyncStorage.getItem('name')
    getName = JSON.parse(getName)
    console.log(getName);
    setName(getName)
    // console.log(name);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    result = result.assets[0].uri
    if (!result.canceled) {
      setProfilePic(result);
    }
  };

  return (
    <SafeAreaView>
    <View style={{display:'flex', alignItems:'center', marginTop:50}}>
        <TouchableOpacity onPress={pickImage}>
        <View style={styles.imageContainer}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profileImage} />
          ) : (
            <Text style={styles.imagePlaceholder}>Pick an image</Text>
          )}
        </View>
      </TouchableOpacity></View>
    <View style={{padding:15}}>
        <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Department</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your department"
        value={department}
        onChangeText={setDepartment}
      />
      <Text style={styles.label}>Roll No</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your roll no"
        value={rollNo}
        onChangeText={setRollNo}
      /></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  imageContainer: {
    display:'flex',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    color: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default Profile;
