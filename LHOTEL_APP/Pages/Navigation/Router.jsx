import React from 'react'
import Home from '../Home';
import Drawer from './Drawer';
import Tasks from '../Workers/Tasks';
import Booking from '../Customer/Booking';
import Payment from '../Customer/Payment';
import Registration from '../Customer/Registration';
import SaveRoom from '../Customer/SaveRoom';
import ConfirmationPage from '../Customer/ConfirmationPage'
import CustomerHome from '../Customer/CustomerHome'
import WorkerMenu from '../Workers/WorkerMenu'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditTasks from '../Workers/EditTasks';
import Employees from '../Workers/Employees';
 import ManualCheckIn from '../Workers/ManualCheckIn';


const Stack = createNativeStackNavigator();


export default function Router() {
    return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
      <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />
      <Stack.Screen name="WorkerMenu" component={WorkerMenu} options={{ headerShown: false}} />
      {/* <Stack.Screen name="Booking" component={Booking} options={{title : " "}}/> */}
      {/* <Stack.Screen name="Payment" component={Payment}options={{title : " "}} /> */}
      <Stack.Screen name="CustomerHome" component={CustomerHome}options={{title : " "}} />
      <Stack.Screen name="Registration" component={Registration} options={{title : " "}}/>
      {/* <Stack.Screen name="SaveRoom" component={SaveRoom}options={{title : " "}} /> */}
      <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} options={{title : " "}}/>
      <Stack.Screen name="EditTasks" component={EditTasks} options={{ headerShown: false }} />
      <Stack.Screen name="Employees" component={Employees} options={{ headerShown: false }} />
      {/* <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: false }} /> */}
   <Stack.Screen name="ManualCheckIn" component={ManualCheckIn} options={{ headerShown: false }} />
      </Stack.Navigator>
      </NavigationContainer>
      
    )
}