
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Announcements')} style={styles.card}>
          <Image
            source={require("../assets/Icons/announcement.png")}
            style={styles.icon}
          />
          <Text style={styles.icons_text}>Announcement</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Events')} style={styles.card}>
          <Image
            source={require("../assets/Icons/events.png")}
            style={styles.icon}
          />
          <Text style={styles.icons_text}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Sports')} style={styles.card}>
          <Image
            source={require("../assets/Icons/sport.png")}
            style={styles.icon}
          />
          <Text style={styles.icons_text}>Sports</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('FoundHub')} style={styles.card}>
          <Image
            source={require("../assets/Icons/lost.png")}
            style={styles.icon}
          />
          <Text style={styles.icons_text}>FoundHub</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RiphahHub')}>
          <Image
            source={require("../assets/Icons/RIUF.png")}
            style={styles.icon}
          />
          <Text style={styles.icons_text}>RiphahHub</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RoomLocator')} style={styles.card}>
          <Image
            source={require("../assets/Icons/locator.png")}
            style={styles.icon}
          />
          <Text style={styles.icons_text}>RoomLocator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  cardSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
    paddingBottom: 50,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: 160,
    height: 155,
    borderRadius: 15,
    backgroundColor: '#fff',
  },

  icon: {
    width: 45,
    height: 45,
    padding: 38,

  },
  icons_text: {
    paddingTop: 15,
    fontSize: 18,
  },
});
