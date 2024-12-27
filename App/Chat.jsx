import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { SvgXml } from 'react-native-svg';
import ICON from './Assets/Icon';

const Chat = ({ route, navigation }) => {
  const { userId, username } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const currentUserId = auth().currentUser.uid;
  const chatRoomId = [currentUserId, userId].sort().join('_');
  const flatListRef = useRef(null);

  useEffect(() => {
    const messagesRef = database().ref(`/chatrooms/${chatRoomId}/messages`);
    messagesRef.on('value', snapshot => {
      const data = snapshot.val();
      const messagesList = data
        ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
        : [];
      setMessages(messagesList.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
    });
    return () => messagesRef.off('value');
  }, [chatRoomId]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: currentUserId,
        text: message,
        timestamp: new Date().toISOString(),
      };
      database().ref(`/chatrooms/${chatRoomId}/messages`).push(newMessage);
      setMessage('');
    }
  };

  return (
    <ImageBackground source={require('./Assets/Background.jpg')} style={styles.container}>
      <View style={{ padding: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('home')}>
          <SvgXml xml={ICON.backButton} width="24" height="24" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{username}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.senderId === currentUserId ? styles.myMessage : styles.otherMessage}>
            <Text>
              {item.text}
            </Text>
            <Text style={{ fontSize: 10, color: '#888', textAlign: 'left', marginTop: 5 }}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Message Input */}
      <View style={styles.msgContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={sendMessage} activeOpacity={0.7} style={styles.sendMsg}>
          <SvgXml xml={ICON.sendMsg} width="24" height="24" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, objectFit: 'cover' },
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 10,
    width: '75%',
    marginVertical: 20,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#daf7dc',
    padding: 8,
    flexDirection: 'column',
    margin: 4,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 8,
    margin: 4,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  sendMsg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default Chat;
