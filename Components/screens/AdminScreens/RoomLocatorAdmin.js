import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert, Keyboard, Image, Modal, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';


const RoomLocatorAdmin = () => {
  const Separator = () => <View style={styles.separator} />;
  const [roomNo, setRoomNo] = useState('')
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [description, setDescription] = useState('')
  const [imageURI, setImageURI] = useState('')
  const [descriptionToShow, setDescriptionToShow] = useState('')
  const [imageToShow, setImageToShow] = useState('https://via.placeholder.com/150')
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  

  const API = 'https://guide-plus.vercel.app'

  // Search API for Room
  const HandleSearch = async () => {
    // try {
    let result = await fetch(`${API}/roomLocator/searchRoom`, {
      method: 'post',
      body: JSON.stringify({ roomNo }),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    result = await result.json();
    console.log(result);
    if (result.description) {
      setDescriptionToShow(result.description)
      setImageToShow(result.imageURL)
      setDescription('')
      setImageURI('')
      Keyboard.dismiss();
    } else {
      // Alert.alert(result.error)
      setDescriptionToShow(result.result)
      Keyboard.dismiss();
      // setDescription('Feel free to search your room')
    }

  }



  const handleAddPress = async () => {
    if (imageURI && description && roomNo) {
      try {
        console.log('Adding post:', { imageURL, description, roomNo });
        let response = await fetch(`${API}/roomLocator/roomInsert`, {
          method: 'POST',
          body: JSON.stringify({ imageURL, description, roomNo }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status);
        if (response.ok) {
          let jsonResponse = await response.json();
          console.log('Response data:', jsonResponse);
          Alert.alert('Post Added Successfully!');
          setModalVisible1(false);
          setRoomNo('');
          setDescription('');
          setImageURI('https://via.placeholder.com/150');
          setDescriptionToShow('');
          setImageURL('https://via.placeholder.com/150')
          setUploadSuccess(false);
        } else {
          let errorResponse = await response.json();
          console.error('Failed to add post:', errorResponse);
          Alert.alert('Failed to add Post', 'Try again later');
        }
      } catch (error) {
        console.error('Error while adding post:', error);
        Alert.alert('Failed to add Post', 'Try again later');
      }
    } else {
      Alert.alert('Fill out all the Fields');
    }
  };

  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
  });

  const s3 = new AWS.S3();


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
      setImageURI(result.assets[0].uri)
    }
  };

  const uploadImage = async (uri) => {
    const fileName = `photo_${new Date().getTime()}.jpg`;
    try {
      // Get file info to ensure the file exists
      const fileInfo = await FileSystem.getInfoAsync(uri);

      if (!fileInfo.exists) {
        Alert.alert('Upload Failed', 'File does not exist');
        return;
      }

      // Read the file as base64
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const params = {
        Bucket: 'guide-plus-image-bucket', // Your bucket name
        Key: fileName,
        Body: Buffer.from(file, 'base64'),
        ContentType: 'image/jpeg',
      };
      setLoading(true);
      s3.upload(params, (error, data) => {
        setLoading(false);
        setUploadSuccess(true);
        if (error) {
          console.error('Error uploading image to S3:', error);
          Alert.alert('Upload Failed', 'Failed to upload Image');
        } else {
          console.log('Successfully uploaded image to S3:', data);
          // Alert.alert('Upload Successful', 'Image uploaded successfully!');
          setImageURL(data.Location)
        }
      });
    } catch (error) {
      console.error('Error reading the file:', error);
      Alert.alert('Upload Failed', 'Error reading the file');
    }
  };

  // Update Room API for Room Locator
  const handleUpdatePress = () => {
    // Your logic when OK button is pressed
    console.log('Input 1:', roomNo);
    console.log('Input 2:', description);
    setModalVisible2(false); // Close the modal
  };

  // Delete Room API for Room Locator
  const handleDeletePress = async () => {
    // Your logic when OK button is pressed
    // console.log(roomNo);
    let response = await fetch(`${API}/roomLocator/deleteRoom`, {
      method: 'delete',
      body: JSON.stringify({ roomNo }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json()
    if (response.acknowledged && result.deletedCount === 1) {
      Alert.alert('Room Deleted Successfully!')
    }
    if (response.message) {
      Alert.alert('Failed to Delete Room Number :' + roomNo)
    }

    console.log(response);
    setModalVisible3(false); // Close the modal
    setDescription('')
    setImageURI('')
    setRoomNo('')

  };

  const handleCancelPress = () => {
    setModalVisible1(false);
    setModalVisible2(false);
    setModalVisible3(false);
    setRoomNo('');
    setImageURI('')
    setDescription('')
    setUploadSuccess(false)
  };



  return (
    // <ScrollView>

    <View style={styles.container}>
      {/* <Text style={{ fontWeight: 'bold', fontSize: 26, marginBottom: 20 }}>Welcome, {adminName}</Text> */}
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 20 }}>
        <TouchableOpacity onPress={() => setModalVisible1(true)} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible2(true)} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible3(true)} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ModalContainer}>


        {/* Add Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.inputLabel}>Room No.</Text>
              <TextInput
                placeholder="Enter Room No. to Add "
                keyboardType='numeric'
                value={roomNo}
                onChangeText={setRoomNo}
                style={styles.input}
              />
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                placeholder="Enter Description For Room No."
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              {loading && (
              <ActivityIndicator size="large" color="#329acb" />
            )}
            {uploadSuccess && (
              <Icon name="check" size={40} color="green" />
            )}
              <View style={{ marginBottom: 20 }}>
                {
                  imageURI ? <Image source={{ uri: imageURI }} style={{ width: 100, height: 200 }} />
                    : <Image source={require('./pics/2.png')} style={{ width: 280, height: 200 }} />
                }
                {/* <Image source={{uri:image}} style={{ width: 200, height: 200 }} />  */}
                <TouchableOpacity style={{ display: 'flex', alignItems: 'center', padding: 10, backgroundColor: 'green', marginTop: 20 }} onPress={pickImage} >
                  <Text style={{ color: 'white' }}>Select Image</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleCancelPress} style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddPress} style={[styles.modalButton, styles.okButton]}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Update Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => setModalVisible2(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.inputLabel}>Room No.</Text>
              <TextInput
                placeholder="Enter Room No. to update"
                value={roomNo}
                keyboardType='numeric'
                onChangeText={setRoomNo}
                style={styles.input}
              />
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                placeholder="Enter Description For Room No. "
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <View style={{ marginBottom: 20 }}>
                {
                  imageURI ? <Image source={{ uri: imageURI }} style={{ width: 280, height: 200 }} />
                    : <Image source={require('./pics/2.png')} style={{ width: 280, height: 200 }} />
                }
                {/* <Image source={{uri:image}} style={{ width: 200, height: 200 }} />  */}
                <TouchableOpacity style={{ display: 'flex', alignItems: 'center', padding: 10, backgroundColor: 'green', marginTop: 20 }} onPress={pickImage} >
                  <Text style={{ color: 'white' }}>Select Image</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleCancelPress} style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUpdatePress} style={[styles.modalButton, styles.okButton]}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* DELETE Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => setModalVisible3(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.inputLabel}>Room No.</Text>
              <TextInput
                placeholder="Enter Room No. to Delete"
                value={roomNo}
                keyboardType='numeric'
                onChangeText={setRoomNo}
                style={styles.input}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleCancelPress} style={[styles.modalButton, styles.cancelButton]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeletePress} style={[styles.modalButton, styles.okButton]}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
      <Separator />

      <View >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Enter Room No :</Text>
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
      <Separator style={styles.secondSeparator} />
      <ScrollView>
        <View style={styles.detailSection}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 20 }}>Description: </Text>
          <View style={styles.descriptionArea}>
            <Text style={{ fontWeight: 'light', fontSize: 16, marginBottom: 8 }}>{descriptionToShow}</Text>
          </View>
          {/* <View style={{width:'100%', height:'100%'}}>  */}
          <Image source={{ uri: imageToShow }} style={{ width: '100%', height: 220, borderRadius: 10, objectFit:'cover' }} />
          {/* </View> */}
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  ModalContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#329acb',
    // display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
  buttonText: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',

    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  inputLabel: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'left'
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%', // Adjust button width as needed
    alignItems: 'center',
  },
  okButton: {
    backgroundColor: '#329acb',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
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
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#329acb',
    borderColor: 'black',
    borderBottomWidth: 0.7,
    borderStyle: 'solid',
  }
});
export default RoomLocatorAdmin