import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  const API = 'https://guide-plus.vercel.app'

  useEffect(() => {
    fetchAnnouncement();
  }, [])

  const fetchAnnouncement = async () => {
    let response = await fetch(`${API}/fetchAnnouncements`)
    response = await response.json()
    if (response) {
      setAnnouncements(response)
    }
    else {
      setAnnouncements('')
    }
  }

  return (
    <View style={styles.container}>


      {announcements ? (
        <FlatList
          data={announcements.reverse()}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.announcementContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>Posted on: {item.date}</Text>
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
    color: '#6c757d',
  },
  
});

export default Announcements;
