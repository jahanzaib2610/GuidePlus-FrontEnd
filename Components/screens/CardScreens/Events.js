import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

const EventsAdmin = () => {

  const [allEvents, setAllEvents] = useState('')

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
  return (
    <>
      {allEvents.length === 0 ? (
        <View style={styles.EventContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Upcoming Events:</Text>
          <Text style={styles.noEventText}>There are no upcoming Events!</Text>
        </View>
      ) : (
        <View style={styles.EventContainer}>
          <Text style={{fontWeight:'bold', fontSize:18}}>Upcoming Events:</Text>
          <FlatList
            data={allEvents}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.title}>Event Name: {item.eventName}</Text>
                  <Text style={styles.date}>Event Date: {item.eventDate}</Text>
                  <Text style={styles.description}>Event Time: {item.eventTime}</Text>
                  <Text style={styles.description}>Event Location: {item.eventLocation}</Text>
                </View>
              )
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({


  EventContainer: {
    flex: 1,
    padding: 20,
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


});

export default EventsAdmin;
