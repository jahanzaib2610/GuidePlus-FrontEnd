import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, Clipboard } from 'react-native';

const AnnouncementsAdmin = () => {

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [inputId, setInputId] = useState('')

  const API = 'https://guide-plus.vercel.app'

  useEffect(() => {
    fetchAnnouncement();
  },[])

  const fetchAnnouncement = async() => {
    let response = await fetch(`${API}/fetchAnnouncements`)
    response = await response.json()
    if(response){
      setAnnouncements(response.reverse())
    }
    else{
      setAnnouncements('')
    }
  }
  // For Adding Announcement
  const handleAddPress = async () => {
    if (!title || !description) {
      Alert.alert('Fill out all the Fields!')
    }
    else {
      let data = await fetch(`${API}/announcement`, {
        method: 'post',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (data.ok) {
        data = await data.json()
        Alert.alert('Announcement Added Successfully!')
        setTitle('');
        setDescription('');
        // Close the modal
        setModalVisible(false);
        fetchAnnouncement();
      }
      else{
        Alert.alert('Something went wrong!','Try again later')
      }
    }
    // Reset input fields
    setTitle('');
    setDescription('');
    // Close the modal
    setModalVisible(false);
  };

  // Function for Copying ID
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied!', `ID: '${text}' has been copied`);
  };
  
  const handleDeletePress = async() => {
    if(inputId){
    let response = await fetch(`${API}/deleteAnnouncement`,{
      method:'delete',
      body:JSON.stringify({inputId}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    response = await response.json();
    if (response.deletedCount > 0){
      Alert.alert('Announcement Deleted Successfully')
      setDeleteModalVisible(false)
      setInputId('')
      fetchAnnouncement();
    }
    else{
      Alert.alert('Failed to Delete Announcement', 'Try Again Later')
    } }
    else{
      Alert.alert('Insert ID to Delete!')
    }
  }
  // For closing Modal
  const handleCancelPress = () => {
    // Reset input fields
    setTitle('');
    setDescription('');
    setInputId('')
    // Close the modal
    setModalVisible(false);
    setDeleteModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={{display:'flex', flexDirection:'row', gap:10}}>
      <TouchableOpacity onPress={() => setModalVisible(true)}
        style={{ backgroundColor: '#329acb', width: '50%', padding: 10, borderRadius: 8, marginBottom: 20 }} >
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Add Announcement</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setDeleteModalVisible(true)}
        style={{ backgroundColor: '#329acb', width: '50%', padding: 10, borderRadius: 8, marginBottom: 20 }} >
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 16 }}>Delete Announcement</Text>
      </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter Title"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter Description"
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleAddPress}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCancelPress}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Delete */}
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.label}>ID</Text>
            <TextInput
              style={styles.input}
              value={inputId}
              onChangeText={setInputId}
              placeholder="Enter ID"
            />
            
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleDeletePress}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleCancelPress}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {announcements ? (
        <FlatList
        data={announcements}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.announcementContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.date}><Text style={{fontWeight:'bold'}}>Posted on:</Text> {item.date}</Text>
              <TouchableOpacity onLongPress={()=>copyToClipboard(item._id)}>
                <Text style={styles.date}>Post id: {item._id}</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
      ) : (
        <Text>No Annouoncements have been made yet!</Text>
      )
      
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  announcementContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    width:370
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#4e4f4f',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#329acb',
    padding: 10,

    borderRadius: 5,
    marginHorizontal: 5,
    width: '45%',
    alignItems: 'center',
  },
});

export default AnnouncementsAdmin;
