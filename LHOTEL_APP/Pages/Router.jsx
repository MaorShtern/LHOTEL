
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';

// import Booking from './Booking';
// import Homepage from './Homepage';
import Login from './Login';
// import Payment from './Payment';
// import Registration from './Registration';
// import SaveRoom from './SaveRoom';
// import ConfirmationPage from './ConfirmationPage'

const Stack = createNativeStackNavigator();


export default function Router() {
  return (
    <NavigationContainer>



<Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{headerShown : false
      }}/>
         <Stack.Screen name="Login" component={Login}  options={{title : " "}}/>
    {/* <Stack.Navigator initialRouteName="Homepage">
      <Stack.Screen name="Homepage" component={Homepage} options={{headerShown : false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
      }}/> */}
      {/* <Stack.Screen name="Booking" component={Booking} options={{title : " "}}/>
      <Stack.Screen name="Login" component={Login}  options={{title : " "}}/>
      <Stack.Screen name="Payment" component={Payment}options={{title : " "}} />
      <Stack.Screen name="Registration" component={Registration} options={{title : " "}}/>
      <Stack.Screen name="SaveRoom" component={SaveRoom}options={{title : " "}} />
      <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} options={{title : " "}}/> */}
    </Stack.Navigator>
  </NavigationContainer>
  )
}