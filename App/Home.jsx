import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const currentUserId = auth().currentUser.uid;

  useEffect(() => {
    const usersRef = database().ref('/users');
    usersRef.on('value', snapshot => {
      const data = snapshot.val();
      const userList = data
        ? Object.keys(data)
          .filter(key => key !== currentUserId) // Exclude current user
          .map(key => ({ id: key, ...data[key] }))
        : [];
      setUsers(userList);
    });
    // (async () => {
    //   try {
    //     await AsyncStorage.clear()
    //   } catch (e) {
    //     console.log(e)
    //     setRoute('Login')
    //   }
    // })()
    return () => usersRef.off('value');
  }, [currentUserId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('chat', { userId: item.id })}>
            <Text style={styles.userItem}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  userItem: { fontSize: 18, marginVertical: 8 }
});

export default UserListScreen;
