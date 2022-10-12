import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomerHome from "../Customer/CustomerHome";
import Login from "../Customer/Login";
import Registration from "../Customer/Registration";
import Booking from "../Customer/Booking";
import SaveRoom from "../Customer/SaveRoom";
import Payment from "../Customer/Payment";
import ConfirmationPage from "../Customer/ConfirmationPage";
import Credit from "../Credit";
import AppContext from "../../AppContext";
import RoomService from "../Customer/RoomService";
import Products from "../Customer/Products";
// import Bill from "../Customer/Bill";
// import CheckIn from "../Customer/CheckIn";
// import { useFocusEffect } from "@react-navigation/native";
const drawer = createDrawerNavigator();

export default function Drawer() {
  const myContext = useContext(AppContext);
  const user = myContext.user;
  const bill = myContext.bill;
  let isUserConnected = JSON.stringify(myContext.user) !== "{}";
  let isAtHotel = myContext.bill.CustomerID !== "";

 
 

  console.log(isAtHotel);
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
        {/* {JSON.stringify(myContext.user) !== '{}'? 
        (<drawer.Screen
          name="Booking"
          component={Booking}
        />) : null} */}
        <drawer.Screen
          name="Booking"
          component={Booking}
          options={{
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        {/* drawerItemStyle: isUserConnected ?  {}:  { display: "none" }, */}
        <drawer.Screen
          name="Room Service"
          component={RoomService}
          options={{
            drawerItemStyle: isAtHotel ? {} : { display: "none" },
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        {/* isUserConnected */}
        <drawer.Screen
          name="Products"
          component={Products}
          options={{
            drawerItemStyle: { display: "none" },
            // drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        {/* <drawer.Screen
          name="Bill"
          component={Bill}
          options={{
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        /> */}
        <drawer.Screen
          name="Credit"
          component={Credit}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
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
            headerMode: "none",
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
            headerMode: "none",
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
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
      </drawer.Navigator>
    </NavigationContainer>
  );
}
