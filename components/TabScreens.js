import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Calculator from "../screens/Calculator";
import Home from "../screens/Home";
import Notification from "../screens/Notification";
import Photo from "../screens/Photo";
import Signup from "../screens/Signup";
import TextRender from "../screens/Text";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {firebase} from '../firebase'


const Tab = createBottomTabNavigator();


const TabScreen = ({navigation}) => {

  const logout = async()=>{
    try {
      // const {} = await firebase()
      await firebase.auth().signOut()
      navigation.navigate('Login')
    } catch (error) {
      alert(error.message, 'the error')
    }
  }


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Notification") {
            iconName = focused
              ? "ios-notifications-outline"
              : "ios-notifications-outline";
          } else if (route.name === "Text") {
            iconName = focused ? "ios-text-outline" : "ios-text-outline";
          }else if(route.name==='Photo'){
            iconName = focused ? "ios-images-outline" : "ios-images-outline";
          }else if(route.name==='Calculator'){
            iconName = focused ? "ios-calculator-outline" : "ios-calculator-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Notification" 
             children={()=><Notification logout={logout}/>}
      //  component={Notification} 
      />
      <Tab.Screen name="Text" 
             children={()=><TextRender logout={logout}/>}
      // component={TextRender} 
      />
      <Tab.Screen name="Photo"
      //  component={Photo} 
       children={()=><Photo logout={logout}/>}
       />
      <Tab.Screen name="Calculator" 
      // component={Calculator} 
             children={()=><Calculator logout={logout}/>}

      />
    </Tab.Navigator>
  );
};

export default TabScreen;
