import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {firebase} from '../firebase'
import { useNavigation } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const Notification = ({logout}) => {
 
  const [notification, setNotification] = useState(null);
  const handleButtonPress = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status === 'granted') {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Example Notification',
          body: 'This is an example notification',
        },
        trigger: null,
      });

      setNotification(notificationId);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.userNameText}>Promise</Text>
      {notification && <Text style={styles.notificationText}>Notification sent with ID: {notification}</Text>}
      <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.text}>Get Notified</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    button: {
        backgroundColor: 'blue',
        width: '70%',
        borderRadius: 15,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 27,
        fontWeight: 'bold'
    },
    logoutButton: {
      position: 'absolute',
      top: '3%',
      left: '3%',
      borderColor: 'rgb(252, 220, 220)',
      borderWidth:1,
      padding: 2,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 10
    },
    userNameText: {
      position: 'absolute',
      top: '3%',
      right: '3%',
      borderColor: 'rgb(252, 220, 220)',
      borderWidth:1,
      padding: 2,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 10
    },
    notificationText: {
      marginBottom: 30
    }
})

export default Notification;
