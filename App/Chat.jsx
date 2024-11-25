import { View, Text, SafeAreaView, ImageBackground, TextInput, Image, TouchableOpacity } from "react-native"
import Styles from "./Style";
import { SvgXml } from "react-native-svg";
import ICON from "./Assets/Icon";

const Chat = () => {
    return (
        <SafeAreaView style={Styles.chatContainer} >
            <ImageBackground style={Styles.image} source={require('./Assets/socialmedia.jpg')} resizeMode="cover"  >
                <View style={Styles.navbar} >
                    <View>
                        <Image source={{ uri: "https://avatars.githubusercontent.com/u/107460626?s=400&u=a626f3c848e2ae5d8bbe3ddde3c00d9db22cc848&v=4" }} style={{ height: 50, width: 50, borderRadius: 30 }} />
                    </View>
                    <View style={{ width: "20%", flexDirection: "row", alignItems: "center" }} >
                        <SvgXml xml={ICON.videoCall} />
                        <TouchableOpacity  activeOpacity={0.7} onPress={()=>console.log("Hello")} >
                            <SvgXml xml={ICON.threeDot} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={Styles.inputContainer} >
                    <View style={{ width: "75%", flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 25, justifyContent: "center" }}>
                        <SvgXml xml={ICON.Smilemoji} />
                        <TextInput multiline={true} placeholder="write Message....." style={{ width: "80%", }} />
                    </View>
                    <View style={Styles.mikeBox} >
                        <SvgXml xml={ICON.mike} />
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    )
}
export default Chat