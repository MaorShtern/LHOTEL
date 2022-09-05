import React from 'react'
import Home from '../Home';
import Drawer from './Drawer';
import Tasks from '../Workers/Tasks';
import Registration from '../Customer/Registration';
import ConfirmationPage from '../Customer/ConfirmationPage'
import CustomerHome from '../Customer/CustomerHome'
import WorkerMenu from '../Workers/WorkerMenu'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditTasks from '../Workers/EditTasks';
import Shift from '../Workers/Shift';
import AddCharge from '../Workers/AddCharge'
import ManualCheckIn from '../Workers/ManualCheckIn';
import EmployeesManagement from '../Workers/EmployeesManagement';
import UpdateDetails from '../Workers/UpdateDetails';

const Stack = createNativeStackNavigator();


export default function Router() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
        <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />
        <Stack.Screen name="WorkerMenu" component={WorkerMenu} options={{ headerShown: false }} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} options={{ title: " " }} />
        <Stack.Screen name="Registration" component={Registration} options={{ title: " " }} />
        <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} options={{ title: " " }} />
        <Stack.Screen name="EditTasks" component={EditTasks} options={{ headerShown: false }} />
        <Stack.Screen name="Shift" component={Shift} options={{ headerShown: false }} />
        <Stack.Screen name="AddCharge" component={AddCharge} options={{ title: " " }} />
        <Stack.Screen name="ManualCheckIn" component={ManualCheckIn} options={{ title: " " }} />
        <Stack.Screen name="EmployeesManagement" component={EmployeesManagement} options={{ title: " " }} />
        <Stack.Screen name="UpdateDetails" component={UpdateDetails} options={{ title: " " }} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}