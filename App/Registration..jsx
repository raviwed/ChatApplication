import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Styles from "./Style";

const Registration = ({ navigation }) => {
  const [registration, setRegistration] = useState({ email: "", password: "", username: "" });

  const handleRegister = () => {
    if (registration.email && registration.password && registration.username) {
      auth()
        .createUserWithEmailAndPassword(registration.email, registration.password)
        .then((res) => {console.log(res, 'User account created & signed in!');
          // Add user to database
          database()
            .ref(`/users/${res.user.uid}`)
            .set({
              userId: res.user.uid,
              username: registration.username,
              email: registration.email,
              status: 'online',
            });

          navigation.navigate("Login");
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });

      setRegistration({ email: "", password: "", username: "" });
    } else {
      Alert.alert("All fields should not be empty!");
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <TextInput placeholder="Username" style={Styles.emailInfo} value={registration.username} onChangeText={(e) => setRegistration({ ...registration, username: e })} />
      <TextInput placeholder="Email" style={Styles.emailInfo} value={registration.email} onChangeText={(e) => setRegistration({ ...registration, email: e })} />
      <TextInput placeholder="Password" secureTextEntry style={Styles.emailInfo} value={registration.password} onChangeText={(e) => setRegistration({ ...registration, password: e })} />
      <TouchableOpacity onPress={handleRegister} style={Styles.registerBtn}>
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "800" }}>Register</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>
        Already have an account?{" "}
        <Text onPress={() => navigation.navigate("Login")} style={{ color: "red" }}>Login</Text>
      </Text>
    </SafeAreaView>
  );
};

export default Registration;
