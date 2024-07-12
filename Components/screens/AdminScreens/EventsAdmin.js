import React, { useEffect, useState } from 'react';
import { View, Alert, Modal, TextInput, StyleSheet, TouchableOpacity, Clipboard, Text, FlatList } from 'react-native';

const EventsAdmin = () => {
  const Separator = () => <View style={styles.separator} />;
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [allEvents, setAllEvents] = useState('')
  const [eventId, setEventId] = useState('')
  
  const API = 'https://guide-plus.vercel.app'

  useEffect(() => {
    fetchData()
  }, [])
  // Fetching data
  const fetchData = async () => {
    let response = await fetch(`${API}/allEvents`)
    response = await response.json();
    // console.log(response);
    setAllEvents(response)
  }


  const handleAddEvent = async () => {
    console.log('Add Event:', eventName, eventDate, eventTime, eventLocation);
    if (!eventName || !eventDate || !eventTime || !eventLocation) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    if (eventName.length < 4) {
      Alert.alert("Event name must be at least 4 characters long.");
      return;
    }

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(eventDate)) {
      Alert.alert("Please enter a valid date format (dd/mm/yyyy).");
      return;
    }

    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    if (!timePattern.test(eventTime)) {
      Alert.alert("Please enter a valid time format (hh:mm AM/PM).");
      return;
    }

    console.log(eventName, eventDate, eventTime, eventLocation);
    // Fetch API for Adding Events
    let response = await fetch(`${API}/addEvents`, {
      method: 'post',
      body: JSON.stringify({ eventName, eventDate, eventTime, eventLocation }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json()
    if (response) {
      Alert.alert('Event Added Successfully!')
    }
    fetchData();
    setEventName("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setAddModalVisible(false);


  };
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    
    Alert.alert('Copied!', `ID: '${text}' has been copied`);
    
  };

  const handleEditEvent = async () => {
    if (!eventName || !eventDate || !eventTime || !eventLocation) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    if (eventName.length < 4) {
      Alert.alert("Event name must be at least 4 characters long.");
      return;
    }

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(eventDate)) {
      Alert.alert("Please enter a valid date format (dd/mm/yyyy).");
      return;
    }

    const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
    if (!timePattern.test(eventTime)) {
      Alert.alert("Please enter a valid time format (hh:mm AM/PM).");
      return;
    }
    console.log('Edit Event:',eventId, eventName, eventDate, eventTime, eventLocation);
    // try {
      let data = await fetch(`${API}/eventsUpdate`, {
        method: 'put',
        body: JSON.stringify({eventId, eventName, eventDate, eventTime, eventLocation }),
        headers: {
          'content-type': 'application/json'
        }
      })
      data = await data.json()
      console.log(data);
      if (data) {
        Alert.alert('Event Updated Successfully!');
        fetchData();
        setEditModalVisible(false)
      }
      else {
        Alert.alert('Failed to update event!');
      }

    // } catch (error) {
    //   console.error('Error updating event:', error);
    //   Alert.alert('An error occurred while updating event!');
    // }
  };

  const handleDeleteEvent = async() => {
    console.log('Delete Event:', eventName, eventDate, eventTime, eventLocation);
    let response = await fetch(`${API}/eventsDelete`, {
      method: 'delete',
      body: JSON.stringify({ eventId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    if (response) {
      Alert.alert('Event deleted Successfully!');
    }
     else if(response.acknowledged === 'false') {
      Alert.alert('Failed to Delete Event!');
    }
    fetchData();
    setEventId('')
    setDeleteModalVisible(false);
  };
  const handleCancelPress = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
    setDeleteModalVisible(false);
    setEventName('')
    setEventDate('')
    setEventTime('')
    setEventLocation('')
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => setAddModalVisible(true)}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Add Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setEditModalVisible(true)}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Edit Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => setDeleteModalVisible(true)}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Delete Event</Text>
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={styles.EventContainer}>
        {allEvents.length === 0 ? (
          <View style={styles.EventContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Upcoming Events:</Text>
            <Text style={styles.noEventText}>There are no upcoming Events!</Text>
          </View>
        ) : (
          <View style={styles.EventContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Upcoming Events:</Text>
            <FlatList
              data={allEvents.reverse()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.card}>
                    <Text style={styles.title}>Event Name: {item.eventName}</Text>
                    <Text style={styles.description}>Event Time: {item.eventTime}</Text>
                    <Text style={styles.description}>Event Location: {item.eventLocation}</Text>
                    <Text style={styles.description}>Event Date: {item.eventDate}</Text>
                    <TouchableOpacity onLongPress={() => copyToClipboard(item._id)}>
                      <Text style={styles.date}>Event id: {item._id}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
        )}
      </View>

      {/* Add Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={() => isAddModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.inputLabel}>Event Name</Text>
            <TextInput
              placeholder="Enter Event Name to add "
              value={eventName}
              onChangeText={setEventName}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Event Date</Text>
            <TextInput
              placeholder="Enter Event Date (dd/mm/yyyy) "
              value={eventDate}
              onChangeText={setEventDate}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Event Time</Text>
            <TextInput
              placeholder="Enter Event Time (hh:mm AM or PM)"
              value={eventTime}
              onChangeText={setEventTime}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Event Location</Text>
            <TextInput
              placeholder="Enter Event Location"
              value={eventLocation}
              onChangeText={setEventLocation}
              style={styles.input}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCancelPress} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddEvent} style={[styles.modalButton, styles.okButton]}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.inputLabel}>Event id:</Text>
            <TextInput
              placeholder="Enter Event ID to Edit"
              value={eventId}
              onChangeText={setEventId}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Event Name</Text>
            <TextInput
              placeholder="Enter Event Name to Edit"
              value={eventName}
              onChangeText={setEventName}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Event Date</Text>
            <TextInput
              placeholder="Enter Event Date (dd/mm/yyyy) "
              value={eventDate}
              onChangeText={setEventDate}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Event Time</Text>
            <TextInput
              placeholder="Enter Event Time (hh:mm AM or PM)"
              value={eventTime}
              onChangeText={setEventTime}
              style={styles.input}
            />
            <Text style={styles.inputLabel}>Event Location</Text>
            <TextInput
              placeholder="Enter Event Location"
              value={eventLocation}
              onChangeText={setEventLocation}
              style={styles.input}
            />

            <View style={styles.buttonContainer}>

              <TouchableOpacity onPress={handleCancelPress} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEditEvent} style={[styles.modalButton, styles.okButton]}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text>Event id: </Text>
            <TextInput
              placeholder="Enter Event id to Delete"
              value={eventId}
              onChangeText={setEventId}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>

              <TouchableOpacity onPress={handleCancelPress} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteEvent} style={[styles.modalButton, styles.okButton]}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  },
  EventContainer: {
    flex: 1,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#329acb', // Adjust title color as needed
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333', // Adjust description color as needed
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: '#329acb',
    width: 110,
    alignItems: 'center',
    borderRadius: 7,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  }, buttonContainer: {
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }



});

export default EventsAdmin;
