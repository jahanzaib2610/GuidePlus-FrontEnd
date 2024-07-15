import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Clipboard, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';

const FoundHub = () => {
  const Separator = () => <View style={styles.separator} />;
  const [posts, setPosts] = useState([]);
  const [buttonClicked, setButtonClicked] = useState('viewAll');
  const [text, setText] = useState('All Posts');
  const [modalVisible, setModalVisible] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [inputId, setInputId] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [imageURI, setImageURI] = useState('https://via.placeholder.com/150/f0f0f0/000/?text=No+Image+Selected');
  const [fullScreenImageURI, setFullScreenImageURI] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const API = 'http://192.168.100.8:5000'

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = `${API}/foundHub`;
      if (buttonClicked === 'lost') {
        setText('All Lost Item Posts');
        endpoint += '/lostPosts';
      } else if (buttonClicked === 'found') {
        setText('All Found Item Posts');
        endpoint += '/foundPosts';
      } else {
        setText('All Posts');
      }

      console.log(`Fetching data from ${endpoint}...`);
      let response = await fetch(endpoint);
      response = await response.json();
      setPosts(response.length ? response : []);
    };
    fetchData();
  }, [buttonClicked]);

  const handleButtonClick = (btn) => {
    setButtonClicked(btn);
  };



  const handleCancelPress = () => {
    setInputId('');
    setModalVisible(false);
    setAddModal(false);
    setStatus('');
    setDescription('');
    setContact('');
    setImageURI('https://via.placeholder.com/150/f0f0f0/000/?text=No+Image+Selected')
    setUploadSuccess(false)
  };

  const handleDeletePress = async () => {
    let response = await fetch(`${API}/foundHub/deletePosts`, {
      method: 'delete',
      body: JSON.stringify({ inputId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    if (response) {
      Alert.alert('Post deleted Successfully!');
      setPosts(prevPosts => prevPosts.filter(post => post._id !== inputId));
    } else if (response.acknowledged === 'false') {
      Alert.alert('Failed to Delete Post!');
    }
    setInputId('');
    setModalVisible(false);
  };



  const handleAddPress = async () => {
    if (imageURI && status && description && contact) {
      try {
        console.log('Adding post:', { imageURL, status, description, contact });
        let response = await fetch(`${API}/foundHub/addPost`, {
          method: 'POST',
          body: JSON.stringify({ imageURL, status, description, contact }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', response.status);
        if (response.ok) {
          let jsonResponse = await response.json();
          console.log('Response data:', jsonResponse);
          Alert.alert('Post Added Successfully!');
          setPosts([jsonResponse, ...posts]); // Add new post to the top
          setAddModal(false);
          setStatus('');
          setContact('');
          setDescription('');
          setImageURI('https://via.placeholder.com/150/f0f0f0/000/?text=No+Image+Selected');
          setUploadSuccess
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
      setImage(result.assets[0].uri);
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

  const handleImagePress = (uri) => {
    setFullScreenImageURI(uri);
    setImageModalVisible(true);
  };

  return (
    <View style={styles.container}>


      <View style={{ display: 'flex' }}>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={[{ width: 100 }, styles.button]} onPress={() => setAddModal(true)}>
            <Text style={{ color: 'white' }}>Add Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ width: 100 }, styles.button]} onPress={() => handleButtonClick('lost')}>
            <Text style={{ color: 'white' }}>Lost</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ width: 100 }, styles.button]} onPress={() => handleButtonClick('found')}>
            <Text style={{ color: 'white' }}>Found</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
          <TouchableOpacity style={[{ width: '50%', marginTop: 10 }, styles.button]} onPress={() => handleButtonClick('viewAll')}>
            <Text style={{ color: 'white' }}>View All</Text>
          </TouchableOpacity>

        </View>
      </View>
      <Separator />
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{text}</Text>
      {posts.length > 0 ? (
        <FlatList

          data={posts.reverse()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => handleImagePress(item.imageURL)}>
                <Image source={{ uri: item.imageURL }} style={styles.image} />
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>Status: {item.status}</Text>
                <Text style={styles.description}><Text style={{ fontWeight: 'bold' }}>Description: </Text> {item.description}</Text>
                <Text style={styles.contact}><Text style={{ fontWeight: 'bold' }}>Contact: </Text>{item.contact}</Text>
                {/* <TouchableOpacity onLongPress={() => copyToClipboard(item._id)}>
                  <Text>Post id: {item._id}</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No Posts have been made yet!</Text>
      )}

      {/* Add Post Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModal}
        onRequestClose={() => setAddModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.inputLabel}>Status</Text>
            <TextInput
              placeholder="Enter Status (i.e: Lost or Found) "
              value={status}
              onChangeText={setStatus}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              placeholder="Enter description for Post "
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Contact</Text>
            <TextInput
              placeholder="Enter Contact here"
              value={contact}
              onChangeText={setContact}
              style={styles.input}
            />
            {loading && (
              <ActivityIndicator size="large" color="#329acb" />
            )}
            {uploadSuccess && (
              <Icon name="check" size={40} color="green" />
            )}
            <View style={{ marginBottom: 20 }}>
              {imageURI ? (
                <Image source={{ uri: imageURI }} style={{ width: 280, height: 200 }} />
              ) : (
                <Image source={require('./pics/2.png')} style={{ width: 280, height: 200 }} />
              )}
              <TouchableOpacity style={{ display: 'flex', alignItems: 'center', padding: 10, backgroundColor: 'green', marginTop: 20 }} onPress={pickImage}>
                <Text style={{ color: 'white' }}>Select Image</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCancelPress} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddPress} style={[styles.modalButton, styles.okButton]}>
                <Text style={styles.buttonText}>Add Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Delete Post Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.inputLabel}>Enter Post ID to Delete</Text>
            <TextInput
              placeholder="Enter Post Id "
              value={inputId}
              onChangeText={setInputId}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCancelPress} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeletePress} style={[styles.modalButton, styles.okButton]}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Full Screen Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableOpacity style={styles.fullScreenImageContainer} onPress={() => setImageModalVisible(false)}>
          <Image source={{ uri: fullScreenImageURI }} style={styles.fullScreenImage} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#329acb',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 20
  },
  infoContainer: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#777'
  },
  contact: {
    fontSize: 14,
    color: '#777'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputLabel: {
    fontSize: 16,
    // marginBottom: 5
  },
  input: {
    width: 250,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: 'red'
  },
  okButton: {
    backgroundColor: '#329acb'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

export default FoundHub;