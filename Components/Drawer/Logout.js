import React, { useState } from 'react';
import { View, Text, Button, Modal, DevSettings } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const Logout = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogout = async () => {
        try {
            // Clear AsyncStorage
            await AsyncStorage.clear();
            // DevSettings.reload();
            // Navigate to the login screen (Reset the navigation stack)
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Login' }
                    ]
                })
            );
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const handleNoPress = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Dashboard' }
                ]
            })
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop:100,  }}>
            <Text style={{fontWeight:'bold', fontSize:24, padding:20}}>Hope you have a Nice day!</Text>
            <Button title="Logout" onPress={() => setModalVisible(true)} />

            {/* Logout Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ marginBottom: 10 }}>Are you sure you want to logout?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button title="Yes" onPress={handleLogout} />
                            <Button title="No" onPress={handleNoPress} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Logout;
