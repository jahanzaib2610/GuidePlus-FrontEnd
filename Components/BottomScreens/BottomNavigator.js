import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from './Dashboard'
import Policy from './Policy'
import Profile from './Profile'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNavigator = () => {
  const bottom = createBottomTabNavigator();
  return (
    // tabBarLabelStyle: {
    //   fontSize: 16, 
    //   color: '#333', 
    // },
    // tabBarActiveTintColor: 'blue',
    
    <bottom.Navigator tab initialRouteName='Dashboard' screenOptions={{ headerShown: false, 
      tabBarStyle: {
        backgroundColor: '#329acb'
      }, 
    tabBarLabelStyle: {
      fontSize: 12, //sets the bootm tab text size
      // color: 'white', // sets the bottom tab text color
      },
      tabBarActiveTintColor: '#FFD700',
      tabBarInactiveTintColor: 'white' 
      }} >
      <bottom.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <MaterialCommunityIcons name="account-circle-outline" size={24} color="white" /> }} />
      <bottom.Screen name="Dashboard" component={Dashboard} options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="white" /> }} />
      <bottom.Screen name="Policy" component={Policy} options={{ tabBarIcon: () => <Ionicons name="settings-outline" size={24} color="white" /> }} />
    </bottom.Navigator>
  )
}

export default BottomNavigator