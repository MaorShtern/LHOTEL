import React from 'react'
import Home from '../Home';
import WorkerMenu from '../Workers/WorkerMenu'
import Drawer from './Drawer';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();


export default function Router() {
    return (
        <NavigationContainer independent={true}>
        <stack.Navigator initialRouteName="Home">
          <stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
          <stack.Screen name="WorkerMenu" component={WorkerMenu} options={{ title: " " }} />
        </stack.Navigator>
      </NavigationContainer>
      
    )
}