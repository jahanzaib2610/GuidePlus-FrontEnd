// // InternetConnectionStatus.js

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// const ConnectionStatus = () => {
//   const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleExitApp = () => {
//     BackHandler.exitApp(); // Close the app when the button is pressed
//   };

//   return (
//     !isConnected && (
//       <View style={styles.container}>
//         <Text style={styles.text}>Oops! Looks Like You Have{'\n'} No Internet Connection</Text>
//         <TouchableOpacity style={styles.button} onPress={handleExitApp}>
//           <Text style={styles.buttonText}>Close App</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#f0f0f0',
//     justifyContent: 'center',

//     alignItems: 'center',
//     zIndex: 9999,
//   },
//   text: {
//     fontSize: 20,
//     textAlign:'center',
//     fontWeight: 'bold',
//     color: '#ff0f0f',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#329acb',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ConnectionStatus;







import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import image from './assets/image.png'; // Adjust the path as necessary

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const handleExitApp = () => {
    BackHandler.exitApp(); // Close the app when the button is pressed
  };

  return (
    !isConnected && (
      <ImageBackground source={image} style={styles.container}>
        <View style={styles.overlay}>
          <Text style={styles.text}>Oops! Looks Like You Have{'\n'} No Internet Connection</Text>
          <TouchableOpacity style={styles.button} onPress={handleExitApp}>
            <Text style={styles.buttonText}>Close App</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.8)', // Optional: to make the overlay slightly transparent
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#329acb',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff0f0f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConnectionStatus;




