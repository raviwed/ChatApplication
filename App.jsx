import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Text, View } from "react-native"
import Login from "./App/Login."
import Chat from "./App/Chat"
import Registration from "./App/Registration."
import Home from "./App/Home"
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from "react"
import ContextProvider from "./App/Context/Context"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Stack = createNativeStackNavigator()
const App = () => {
  const [route, setRoute] = useState(null)
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.getItem('token').then((res) => {
          setRoute(res ? 'home' : 'Login')
        })
      } catch (e) {
        console.log(e)
        setRoute('Login')
      }
    })();
  }, [])
  
  if (route === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={route}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="chat" component={Chat} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="registrtation" component={Registration} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  )
}
export default App