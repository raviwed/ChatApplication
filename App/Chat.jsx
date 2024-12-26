import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Chat = ({ route, navigation }) => {
  const { userId } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const currentUserId = auth().currentUser.uid;
  const chatRoomId = [currentUserId, userId].sort().join('_');

  useEffect(() => {
    const messagesRef = database().ref(`/chatrooms/${chatRoomId}/messages`);
    messagesRef.on('value', snapshot => {
      const data = snapshot.val();
      const messagesList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setMessages(messagesList);
    });
    return () => messagesRef.off('value');
  }, [chatRoomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: currentUserId,
        text: message,
        timestamp: new Date().toISOString()
      };
      database().ref(`/chatrooms/${chatRoomId}/messages`).push(newMessage);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('home')} >
        <Text>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={item.senderId === currentUserId ? styles.myMessage : styles.otherMessage}>
            {item.text}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding : 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 },
  myMessage: {
    alignSelf: 'flex-end', backgroundColor: '#daf7dc', padding: 8, margin: 4, borderRadius: 10, shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  otherMessage: {
    alignSelf: 'flex-start', backgroundColor: '#fff', padding: 8, margin: 4, borderRadius: 10, shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  }
});

export default Chat;
