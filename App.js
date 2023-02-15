import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Home from "./screens/Home";
import TabScreen from "./components/TabScreens";
import { useEffect, useState } from "react";
import {firebase} from './firebase.js'

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false)
  }

  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

  

  if(initializing) return null;

  const unAuthScreen = ()=> (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        {/* <Stack.Screen name="Task" options={{headerShown: false}} component={TabScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )

  const authScreen = ()=> (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Task" options={{headerShown: false}} component={TabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  return (
    authScreen()
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
