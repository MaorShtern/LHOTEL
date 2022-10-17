import React, { useContext } from 'react'
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
import CheckIn from '../Workers/CheckIn';
import CheckOut from '../Workers/CheckOut';
import EmployeesManagement from '../Workers/EmployeesManagement';
import UpdateDetails from '../Workers/UpdateDetails';
import ExistingReservation from '../Workers/ExistingReservartion';
import ShortCheckIn from '../Workers/ShortCheckIn';
import NewReservation from '../Workers/NewReservation';
import AddEmployee from '../Workers/AddEmployee';
import Credit from '../Credit';
import Products from "../Customer/Products";
import AppContext from '../../AppContext';
import Reports from '../Workers/Reports';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';





const Stack = createNativeStackNavigator();
// options={{ headerShown: false }}
const MaterialTopTabs = createMaterialTopTabNavigator();


export default function Router() {
  const myContext = useContext(AppContext);


  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
        <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="WorkerMenu" component={WorkerMenu} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="Registration" component={Registration} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="EditTasks" component={EditTasks} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="Shift" component={Shift} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="AddCharge" component={AddCharge} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="CheckIn" component={CheckIn} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="CheckOut" component={CheckOut} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="EmployeesManagement" component={EmployeesManagement} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="UpdateDetails" component={UpdateDetails} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="NewReservation" component={NewReservation} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="ShortCheckIn" component={ShortCheckIn} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="ExistingReservation" component={ExistingReservation} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="Credit" component={Credit} options={{ 
          headerTitle: "",
          headerTintColor: "white",
          headerMode: 'none',
          headerStyle: {
            backgroundColor: "#000",}}} />
        <Stack.Screen name="Reports" component={Reports} options={{ headerShown: myContext.isIos }} />
        <Stack.Screen name="Products" component={Products} options={{ headerShown: myContext.isIos }} />

        <Stack.Screen name="Top"children={createTopTabs}  options={{ 
          headerTitle: "",
          headerTintColor: "white",
          headerMode: 'none',
          headerStyle: {
            backgroundColor: "#000",}}}/>

      </Stack.Navigator>
    </NavigationContainer>

  )
}

const createTopTabs = (props) => {
  return <MaterialTopTabs.Navigator>
    <MaterialTopTabs.Screen
      name="All Tasks"
      component={Tasks}
      
    />
    <MaterialTopTabs.Screen name="Today's Tasks" component={Tasks}   />
    <MaterialTopTabs.Screen name="Open Tasks" component={Tasks}  />
    <MaterialTopTabs.Screen name="Task Form" component={EditTasks}  />
  </MaterialTopTabs.Navigator>
}