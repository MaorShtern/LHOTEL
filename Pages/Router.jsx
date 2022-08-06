import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Booking from './Booking';
import Homepage from './Homepage';
import Login from './Login';
import Payment from './Payment';
import Registration from './Registration';
import SaveRoom from './SaveRoom';
import ConfirmationPage from './ConfirmationPage'

const Stack = createNativeStackNavigator();


export default function Router() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Homepage">
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="SaveRoom" component={SaveRoom} />
      <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}