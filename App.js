import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { TextInput } from "react-native-paper";
// import Router from './Pages/Router';
import Home from './Pages/Home';
import Login from './Pages/Login';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Payment from './Pages/Payment';
import CustomerHome from './Pages/CustomerHome';




const Stack = createNativeStackNavigator();



export default function App() {
  return (
  <NavigationContainer>
   
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{headerShown : false}}/>
      <Stack.Screen name="Login" component={Login}  options={{title : " "}}/>
      <Stack.Screen name="CustomerHome" component={CustomerHome} 
        options={{headerShown : false, headerTintColor: '#fff',headerTitleStyle: {fontWeight: 'bold'}}}/>
      </Stack.Navigator>
</NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
