import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

const Policy = () => {
  const [rulesModal, setRulesModal] = useState(false);
  const [scholarshipModal, setScholarshipModal] = useState(false);
  const [wifiModal, setWifiModal] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  // const [modalContent, setModalContent] = useState('');

  // const openModal = (content) => {
  //   setModalContent(content);
  //   setModalVisible(true);
  // };


  const closeModal = () => {
    setRulesModal(false);
    setScholarshipModal(false)
    setWifiModal(false)
    setAdminModal(false)
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Policy Page</Text>
      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card} onPress={() => setRulesModal(true)}>
          <Text style={styles.cardText}>Rules & Regulation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => setScholarshipModal(true)}>
          <Text style={styles.cardText}>Scholarship Info</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.card} onPress={() => setWifiModal(true)}>
          <Text style={styles.cardText}>WiFi Password Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => setAdminModal(true)}>
          <Text style={styles.cardText}>DSA Admin Contact</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={rulesModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalText}>Rules & Regulations</Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={scholarshipModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalText}>ScholarShip Info</Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={wifiModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalText}>WIFI Pasword Info</Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={adminModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalText}>DSA Admin Contact</Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardRow: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems:'center',
    width: '100%',
    marginBottom: 15,
  },
  card: {
    //marginTop: 2,
    backgroundColor: '#f5ae07',
    padding: 40,
    borderRadius: 10,
    width: '100%',
    marginVertical:10,
    //height: '5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight:'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
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
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#329acb',
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

export default Policy;
