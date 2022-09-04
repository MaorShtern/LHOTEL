import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomerHome from "../Customer/CustomerHome";
import Login from "../Customer/Login";
import Registration from "../Customer/Registration";
import Booking from "../Customer/Booking";
import SaveRoom from "../Customer/SaveRoom";
import Payment from "../Customer/Payment";
import ConfirmationPage from "../Customer/ConfirmationPage";
import RoomService from "../Customer/RoomService";
import Bill from "../Customer/Bill";
import CheckIn from "../Customer/CheckIn";

const drawer = createDrawerNavigator();

export default function Drawer() {


  return (
    <NavigationContainer independent={true}>
      <drawer.Navigator initialRouteName="Home">
        <drawer.Screen
          name="Home"
          component={CustomerHome}
          options={{
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />

        <drawer.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        {/* <drawer.Screen
          name="LogOut"
          options={{
            headerTitle: "",
            headerTintColor: "white",
            headerMode: 'none',
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        /> */}
        <drawer.Screen
          name="Booking"
          component={Booking}
          options={{
            headerTitle: "",
            headerTintColor: "white",
            headerMode: 'none',
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />

        <drawer.Screen
          name="Room Service"
          component={RoomService}
          options={{
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="Bill"
          component={Bill}
          options={{
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
         <drawer.Screen
          name="CheckIn"
          component={CheckIn}
          options={{
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="SaveRoom"
          component={SaveRoom}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: 'none',
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="Payment"
          component={Payment}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: 'none',
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="ConfirmationPage"
          component={ConfirmationPage}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: 'none',
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
      </drawer.Navigator>
    </NavigationContainer>
  );
}
