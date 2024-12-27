import { SafeAreaView, TextInput, TouchableOpacity, Text, Button, View, Image } from "react-native";
import React, { useContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Styles from "./Style";
import { AuthContext } from "./Context/Context";
import storage from '@react-native-firebase/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import { SvgXml } from "react-native-svg";
import ICON from "./Assets/Icon";

const Login = ({ navigation }) => {
  const [login, setLogin] = useState({ email: "", password: "" });
  // const [imageUri, setImageUri] = useState(null);
  // const [uploading, setUploading] = useState(false);
  // const [downloadURL, setDownloadURL] = useState(null);
  const { token, setToken } = useContext(AuthContext)

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(login.email, login.password)
      .then(async (res) => {
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
  // const handleGalleryPic = () => {
  //   launchImageLibrary({ mediaType: 'photo' }, (response) => {
  //     if (response.didCancel || response.errorMessage) {
  //       console.log('User cancelled image picker or error:', response.errorMessage);
  //     } else {
  //       const uri = response.assets[0].uri;
  //       setImageUri(uri);
  //     }
  //   });

  // }
  // const uploadImage = async () => {
  //   if (!imageUri) return;

  //   setUploading(true);
  //   const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
  //   const storageRef = storage().ref(`images/${fileName}`);

  //   try {
  //     await storageRef.putFile(imageUri);
  //     const url = await storageRef.getDownloadURL();

  //     // Save the URL to Realtime Database
  //     database().ref('/images').push({ imageUrl: url });

  //     setDownloadURL(url);
  //     console.log('Image uploaded successfully:', url);
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //   } finally {
  //     setUploading(false);
  //   }
  // };
  // console.log(imageUri, "imageUri")
  return (
    <SafeAreaView style={Styles.container}>
      {/* <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Button title="Select Image" onPress={handleGalleryPic} />
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, margin: 10 }} />}
        <Button title="Upload Image" onPress={uploadImage} disabled={uploading} />
        {uploading && <Text>Uploading...</Text>}
        {downloadURL && <Text>Image URL: {downloadURL}</Text>}
      </View> */}
      <View style={Styles.iconfit}>
        <SvgXml xml={ICON.emailIcon} width="24" height="24" style={Styles.rightMar} />
        <TextInput placeholder="Email" style={Styles.emailInfo} value={login.email} onChangeText={(e) => setLogin({ ...login, email: e })} />
      </View>
      <View style={Styles.iconfit}>
        <SvgXml xml={ICON.password} width="24" height="24" style={Styles.rightMar} />
        <TextInput placeholder="Password" secureTextEntry style={Styles.emailInfo} value={login.password} onChangeText={(e) => setLogin({ ...login, password: e })} />
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={handleLogin} style={Styles.registerBtn}>
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
