import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Text, View } from "react-native"
import Login from "./App/Login."
import Chat from "./App/Chat"
import Registration from "./App/Registration."

const  Stack= createNativeStackNavigator()
const App=()=>{

  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="chat"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="registrtation" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App