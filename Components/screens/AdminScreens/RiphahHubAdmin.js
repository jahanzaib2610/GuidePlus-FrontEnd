import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const RiphahHubAdmin = () => {


  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [clubPresident, setClubPresident] = useState('');
  const [contact, setContact] = useState('')
  const [allClubs, setAllClubs] = useState('')

  const API = 'https://guide-plus.vercel.app'



  useEffect(() => {
    fetchData()
  }, [])
  // Fetching data
  const fetchData = async () => {
    let data = await fetch(`${API}/allClubs`)
    data = await data.json();
    // console.log(data);
    setAllClubs(data.reverse())
    // setAllEvents(response)
  }
  // Function to handle button press
  const handlePress = (title) => {
    setRequestTitle(title);
    setIsRequestModalVisible(true);
  };

  // Function to handle header buttons press
  const handleHeaderButtonPress = (action) => {
    if (action === 'Add') {
      setIsAddModalVisible(true);
    } else {
      Alert.alert('Header Button Pressed', `You pressed the ${action} button`);
    }
  };

  // Function to add a new card
  const handleAddClub = async () => {
    if (clubName && clubDescription && clubPresident && contact) {
      // setCardData([...cardData, { id: cardData.length + 1, title: clubName, description: clubDescription, president: clubPresident }]);
      let data = await fetch(`${API}/addClub`, {
        method: 'post',
        body: JSON.stringify({ clubName, clubDescription, clubPresident ,contact }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      data = await data.json()
      setClubName('');
      setClubDescription('');
      setClubPresident('');
      setContact('')
      setIsAddModalVisible(false);
      fetchData();
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => handleHeaderButtonPress('Add')}>
          <Text style={styles.headerButtonText}>Add Society</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={() => handleHeaderButtonPress('Remove')}>
          <Text style={styles.headerButtonText}>Remove Society</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={allClubs}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Name: {item.clubName}</Text>
            
            <Text style={styles.description}><Text style={{fontWeight:'bold'}}>Description:</Text> {item.clubDescription}</Text>
            <Text style={{fontSize:14, marginBottom:15}}><Text style={{fontWeight:'bold'}}>President:</Text> {item.clubPresident}</Text>
            <Text style={{fontSize:14, marginBottom:15}}>
              {/* <FontAwesome name="whatsapp" size={16} color="green" /> */}
              <FontAwesome6 style={{borderRadius:10}} name="square-whatsapp" size={18} color="green" />
              <Text style={{fontWeight:'bold'}}> Contact:</Text> {item.contact}</Text>
          </View>
        )}
        // keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cardContainer}
      />

      {/* Add Society Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Society</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Society Name"
              value={clubName}
              onChangeText={setClubName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Society Description"
              value={clubDescription}
              onChangeText={setClubDescription}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Enter President Name"
              value={clubPresident}
              onChangeText={setClubPresident}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Contact details or No."
              value={contact}
              onChangeText={setContact}
            />
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddClub}>
                <Text style={styles.modalButtonText}>Add Society</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsAddModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Padding to account for status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerButton: {
    backgroundColor: '#329acb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    textAlign:'justify'
  },
  button: {
    backgroundColor: '#329acb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalButton: {
    backgroundColor: '#3291cb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RiphahHubAdmin