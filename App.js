import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  /*const [todos, setToDos] = useState(initialTodos);

  const LoadTodos = () => {
    AsyncStorage.getItem('Stored To Do').then(data => {
      if (data !== null) {
        setToDos(JSON.parse(data))
      }
    }).catch((error) => console.log(error));
  }
*/

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name = 'Welcome' component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name = 'Home' component={HomeScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
