import { View, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './Components/AppNavigator'
import ConnectionStatus from './ConnectionStatus'

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent />
      <NavigationContainer>
        <AppNavigator />
        <ConnectionStatus />
      </NavigationContainer>
    </View>
  )
}

export default App