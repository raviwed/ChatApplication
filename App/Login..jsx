import { View, SafeAreaView, TextInput, TouchableOpacity, Text } from "react-native"
import React, { useState } from "react"
import auth from '@react-native-firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import database from '@react-native-firebase/database';
import Styles from "./Style";
const Login = ({ navigation }) => {
    const [Login, setLogin] = useState({ email: "", password: "" })
    const handlelogin = () => {
        auth()
        .signInWithEmailAndPassword(Login.email,Login.password)
        .then((res) => {
          console.log( res,'User account created & signed in!');
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
        database()
        .ref('todo/4' )
        .set({
          age: 37,
        })
        .then(() => console.log('Data updated.'));
    };
    return (
        <SafeAreaView style={Styles.container} >
            <TextInput placeholder="email Id" style={Styles.emailInfo} value={Login.email} onChangeText={(e) => setLogin({ ...Login, email: e })} />
            <TextInput placeholder="password" style={Styles.emailInfo} value={Login.password} onChangeText={(e) => setLogin({ ...Login, password: e })} />
            <TouchableOpacity onPress={handlelogin} style={Styles.registerBtn}  >
                <Text style={{ textAlign: "center", color: "#fff", fontWeight: "800" }}  >Login</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 10 }} >Already Logged in then just <Text onPress={() => navigation.navigate("registrtation")} style={{ color: "red" }}> Register ?</Text></Text>
        </SafeAreaView>
    )
}
export default Login