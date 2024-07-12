import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import HomeScreen from './HomeScreen';
import Contact from './Contact';
import Help from './Help';
import Logout from './Logout';

const DrawerNavigator = () => {
    const drawer = createDrawerNavigator();

    return (
        <drawer.Navigator screenOptions={{
            drawerPosition:'right', 
            // headerShown:false
        }}
        initialRouteName='Guide Plus'>
            <drawer.Screen name='Guide Plus' component={HomeScreen} options={{headerStyle: {backgroundColor: '#329acb'}, headerTintColor: '#fff'}}/>
            <drawer.Screen name='Contact' component={Contact} options={{headerStyle: {backgroundColor: '#329acb'}, headerTintColor: '#fff'}}/>
            <drawer.Screen name='Help' component={Help} options={{headerStyle: {backgroundColor: '#329acb'}, headerTintColor: '#fff'}}/>
            <drawer.Screen name='Logout' component={Logout} options={{headerStyle: {backgroundColor: '#329acb'}, headerTintColor: '#fff'}}/>
        </drawer.Navigator>
    )
}

export default DrawerNavigator