import { useState, useEffect } from 'react';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Announcements from './screens/CardScreens/Announcements';
import AnnouncementsAdmin from './screens/AdminScreens/AnnouncementsAdmin';
import Events from './screens/CardScreens/Events';
import EventsAdmin from './screens/AdminScreens/EventsAdmin';
import Sports from './screens/CardScreens/Sports';
import SportsAdmin from './screens/AdminScreens/Sports/Sport_Admin';
import FoundHub from './screens/CardScreens/FoundHub';
import FoundHubAdmin from './screens/AdminScreens/FoundHubAdmin';
import RiphahHub from './screens/CardScreens/RiphahHub';
import RiphahHubAdmin from './screens/AdminScreens/RiphahHubAdmin'
import FormScreen from './screens/AdminScreens/FormScreen'
import RoomLocator from './screens/CardScreens/RoomLocator';
import RoomLocatorAdmin from './screens/AdminScreens/RoomLocatorAdmin';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup'
import AsyncStorage from "@react-native-async-storage/async-storage";
import GameScreen from './screens/AdminScreens/Sports/AdminSport/Add_Games';
import Schedule from './screens/AdminScreens/Sports/AdminSport/Schedule';
import AdminTeamView from './screens/AdminScreens/Sports/AdminSport/Teams_Admin';
import ScoreScreen from './screens/AdminScreens/Sports/AdminSport/Score_Admin';
import StudentSchedule from './screens/CardScreens/StudentSchedule';
import { View, ActivityIndicator } from 'react-native';

export default function AppNavigator({ navigation }) {
  const stack = createNativeStackNavigator();
  const [isAdmin, setIsAdmin] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, [isAdmin]);

  const checkLoginStatus = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      const admin = await AsyncStorage.getItem('admin');

      if (admin) {
        setIsAdmin(true);
        setInitialRoute('Dashboard');
        console.log('Admin login');
      } else if (!admin && email && password) {
        setIsAdmin(false);
        setInitialRoute('Dashboard');
        console.log('User login');
      } else {
        setInitialRoute('Login');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <stack.Navigator initialRouteName={initialRoute}>
      <stack.Screen name="Login" options={{ headerShown: false }}>
        {(props) => <Login {...props} isAdmin={isAdmin} onLogin={(value) => {
          if (value == 1) {
            setIsAdmin(true);
            setInitialRoute('Dashboard');
          } else if (value == 0) {
            setIsAdmin(false);
            setInitialRoute('Dashboard');
          }
        }} />}
      </stack.Screen>
      <stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
      {
        !isAdmin ? (
          <>
            <stack.Screen name='Dashboard' component={Home} options={{ headerShown: false, gestureEnabled: false }} />
            <stack.Screen name='Announcements' component={Announcements} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='Events' component={Events} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='Sports' component={Sports} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='FoundHub' component={FoundHub} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='RiphahHub' component={RiphahHub} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='RoomLocator' component={RoomLocator} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='StudentSchedule' component={StudentSchedule} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
          </>
        ) : (
          <>
            <stack.Screen name='Dashboard' component={Home} options={{ headerShown: false, gestureEnabled: false }} />
            <stack.Screen name='Announcements' component={AnnouncementsAdmin} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='Events' component={EventsAdmin} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='Sports' component={SportsAdmin} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='FoundHub' component={FoundHubAdmin} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='RiphahHub' component={RiphahHubAdmin} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='RoomLocator' component={RoomLocatorAdmin} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='SocietyForm' component={FormScreen} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='Add_Games' component={GameScreen} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='Teams_Admin' component={AdminTeamView} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='Schedule' component={Schedule} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
            <stack.Screen name='Score' component={ScoreScreen} options={{ headerStyle: { backgroundColor: '#329acb' }, headerTintColor: '#fff', }} />
          </>
        )
      }
    </stack.Navigator>
  )
}
