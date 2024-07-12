import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GameScreen = () => {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState('');
  const [limit, setLimit] = useState('1');
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGameIndex, setSelectedGameIndex] = useState(null);

  const API = 'https://guide-plus.vercel.app'
  
  useEffect(() => {
    // Fetch games from MongoDB and set the initial game data

    fetchData();
  }, []);

  const fetchData = async() => {
    let response = await fetch(`${API}/sports/allGames`)
    response = await response.json()
    console.log(response);
    setTableData(response)
  }



  const handleAddGame = async() => {
    if (game) {
      if (selectedGameIndex !== null) {
        // If an item is selected, treat the Add button as an edit button
        handleSaveEditedGame();
        return;
      }
      let response = await fetch(`${API}/sports/addGames`, {
        method:'post',
        body:JSON.stringify({game, limit}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      response = await response.json()
      console.log(response);
      fetchData();
      

      setModalVisible(false);
    }
  };

  const handleEditGame = (index) => {

  };

  const handleSaveEditedGame = () => {
    if (selectedGameIndex !== null && gameName && gameLimit) {
      const updatedGames = [...games];
      updatedGames[selectedGameIndex] = { ...updatedGames[selectedGameIndex], name: gameName, limit: parseInt(gameLimit, 10) };
      setGames(updatedGames);
      setTableData(updatedGames);

      // Reset input fields
      setGame('');
      setLimit('1');

      // Close modal
      setModalVisible(false);

      // Reset selectedGameIndex
      setSelectedGameIndex(null);
    }
  };

  const handleDeleteGame = async(_id) => {
  
    console.log(_id);
    let data = await fetch(`${API}/deleteGames/${_id}`, {
      method:'DELETE',
    })
    data = await data.json()
    if(data.deletedCount > 0 ){
      Alert.alert('Game Deleted Successfully!')
    } 
    else{
      Alert.alert('Failed to Delete Game!')
    }
    fetchData();
  
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.headerText}>Game</Text>
      <Text style={styles.headerText}>Limit</Text>
      <Text style={styles.headerText}>Edit</Text>
      <Text style={styles.headerText}>Delete</Text>
    </View>
  );

  const renderGameItem = ({ item, index }) => (
    <View style={styles.gameItem}>
      <Text style={styles.gameText}>{item.game}</Text>
      <Text style={styles.gameText}>{item.limit}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => handleEditGame(index)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteGame(item._id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title={selectedGameIndex !== null ? 'Edit' : 'Add Game'} onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            
            <TextInput
              placeholder="Game Name"
              value={game}
              onChangeText={setGame}
              style={styles.input}
            />
            <Picker
              selectedValue={limit}
              onValueChange={(itemValue) => setLimit(itemValue)}
              style={styles.input}
            >
              {[...Array(12)].map((_, i) => (
                <Picker.Item key={i.toString()} label={(i + 1).toString()} value={(i + 1).toString()} />
              ))}
            </Picker>

            <View style={styles.modalButtons}>
            {/* <View style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', paddingTop: 20 }}> */}

            <TouchableOpacity style={styles.button}  onPress={() => setModalVisible(false)} >
            <Text style={styles.button_text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAddGame} >

            <Text style={styles.button_text}>Save</Text>

            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {renderTableHeader()}
      <FlatList
        data={tableData}
        renderItem={renderGameItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  gameText: {
    fontSize: 16,
    width:90
  },
  editButton: {
    backgroundColor: '#329acb',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    display: 'flex',
    width: 100,
    height: 42,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: '#329acb',
    justifyContent: "center",
    alignItems: "center",
    //space in buttons
    margin: 8,

  },button_text: {
    color: "white", fontStyle: "normal", fontSize: 17
  }

});

export default GameScreen;
