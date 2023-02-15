import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase'; // Import your Firebase configuration here
const firestore = firebase.firestore()

const TextRender = ({logout}) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async () => {
    // // Save the text to Firestore
    if(!text) return alert('Please add a text')
    try {
      await firestore.collection('messages').add({ text });
      // alert('Text Added!')
      setText('');
    } catch (error) {
      console.log(error, 'from the TEXT')
      alert(error, 'from the TEXT')
    }
  };

  React.useEffect(() => {
    // Get the messages from Firestore on snapshot
    const unsubscribe = firestore.collection('messages').onSnapshot(snapshot => {
      const messages = [];
      snapshot.forEach(doc => {
        messages.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.userNameText}>Promise</Text>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="Add a text"
        onChangeText={text => setText(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {messages.map(message => (
        <View key={message.id} style={styles.messageContainer}>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    position:'relative',
    paddingTop: 50
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 10
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  messageContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginVertical: 10
  },
  messageText: {
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
  }
});

export default TextRender;