import { SafeAreaView, TextInput, TouchableOpacity, Text } from "react-native";
import React, { useContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Styles from "./Style";
import { AuthContext } from "./Context/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const { token, setToken } = useContext(AuthContext)

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(login.email, login.password)
      .then(async (res) => {
        console.log(res, 'User signed in!');
        try {
          await AsyncStorage.setItem('token', res.user.uid)
        } catch (e) {
          console.log(e)
        }
        // Update user status in database
        database()
          .ref(`/users/${res.user.uid}`)
          .update({
            status: 'online'
          });

        navigation.navigate("home");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <TextInput placeholder="Email" style={Styles.emailInfo} value={login.email} onChangeText={(e) => setLogin({ ...login, email: e })} />
      <TextInput placeholder="Password" secureTextEntry style={Styles.emailInfo} value={login.password} onChangeText={(e) => setLogin({ ...login, password: e })} />
      <TouchableOpacity onPress={handleLogin} style={Styles.registerBtn}>
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "800" }}>Login</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>
        Don't have an account?{" "}
        <Text onPress={() => navigation.navigate("registrtation")} style={{ color: "red" }}>Register</Text>
      </Text>
    </SafeAreaView>
  );
};

export default Login;
