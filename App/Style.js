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
        padding: 10,
        borderRadius: 10,
        width: "75%",
        backgroundColor: "#fff",
    },
    registerBtn: {
        backgroundColor: "red",
        marginTop: 10,
        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
        width: "80%"
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
    },
    iconfit: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#83f28f",
        paddingLeft: 10,
        borderRadius: 20,
    },
    rightMar: {
        marginRight: 5
    },
    chatApplication: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
        paddingTop: 5,
        alignItems: "center",
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 15
    }

});

export default Styles