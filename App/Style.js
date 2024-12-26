import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    emailInfo: {
        borderColor: "black",
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        width: "90%"
    },
    registerBtn: {
        backgroundColor: "red",
        marginTop: 10,
        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
        width: "90%"
    },
    image: {
        flex: 1,
        
    },
    navbar: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10,
        height: 55,
        backgroundColor: "#fff",
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.21,
        shadowRadius: 7.68,
        elevation: 10,
        position: "absolute",
        top: 0,
    },
    videoCallDotContainer: {
        width: "20%",
        flexDirection: "row",
        alignItems: "center"
    },
    chatContainer: {
        flex: 1,
        backgroundColor: "#fff",

    },
    inputContainer: {
        width: "100%",
        position: "absolute",
        bottom: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    mikeBox: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: "#1fd655",
        justifyContent: "center",
        alignItems: "center",
    },
    emojismileContainer: {
        width: "75%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 25,
        justifyContent: "center"
    }

});

export default Styles