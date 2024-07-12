import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';


const RiphahHub = () => {

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


  return (
    <View style={styles.container}>
      {<View style={styles.header}>
        <Text style={{fontSize:18, fontWeight:'bold'}}>Welcome to Riphah, </Text>
        <Text style={{fontSize:18, fontWeight:'bold'}}>Clubs and Societies</Text>
        
      </View> }
      
      <FlatList
        data={allClubs}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Name: {item.clubName}</Text>
            <Text style={styles.description}>Description: {item.clubDescription}</Text>
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

      

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Padding to account for status bar
  },
  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
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
    marginBottom: 15,
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

export default RiphahHub