import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import auth from '@react-native-firebase/auth';
import Styles from "./Style";

const Registration = ({ navigation }) => {
  const [registrtation, setRegistrtation] = useState({ email: "", password: "" })

  const handleRegister = () => {
    if (registrtation.email !== "", registrtation.password !== ""){
      auth().createUserWithEmailAndPassword(registrtation.email, registrtation.password).then(() => {
        console.log('User account created & signed in!');
      })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error, "error");
        });
      setRegistrtation({ email: "", password: "" })
    }else{
      Alert.alert("fileds should not be Empty ")
    }
  }
  return (
    <SafeAreaView style={Styles.container}  >
      <TextInput placeholder="email Id" style={Styles.emailInfo} value={registrtation.email} onChangeText={(e) => setRegistrtation({ ...registrtation, email: e })} />
      <TextInput placeholder="password" style={Styles.emailInfo} value={registrtation.password} onChangeText={(e) => setRegistrtation({ ...registrtation, password: e })} />
      <TouchableOpacity onPress={handleRegister} style={Styles.registerBtn}  >
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "800" }}  >Register</Text>
      </TouchableOpacity>
      <Text style={{marginTop:10}} >Already Logged in then just <Text  onPress={()=>navigation.navigate("Login")} style={{color:"red"}}  >Login </Text></Text>
    </SafeAreaView>
  )
}
export default Registration