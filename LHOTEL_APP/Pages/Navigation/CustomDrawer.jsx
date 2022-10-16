import React, {useContext}from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AppContext from "../../AppContext";

export default function CustomDrawer(props) {
    // console.log(props.isUserConnected);
    const myContext = useContext(AppContext);
    const LogOutUser =  () => {
        myContext.setUserDB({});
        myContext.SetBill({
            CustomerID: '',
            BillNumber: 0,
            BillDate: '',
            AmountOfPeople: 0,
            Breakfast: false,
            NumberOfNights: 0,
            rooms: []});
        //    props.navigation.closeDrawer()
           props.navigation.navigate("Home")
      };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor:props.isUserConnected ? "#09143C" :"#fff"}}
      >
        {props.isUserConnected ?
             <View style={{ padding: 30 }}>
             <Text
               style={{
                 color: "#fff",
                 fontSize: 18,
                 //   fontFamily: 'Roboto-Medium',
                 marginBottom: 5,
               }}
             >
             {myContext.user.FirstName} {myContext.user.LastName}
             </Text>
           </View>
           : null
        }
       

        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {
props.isUserConnected ?
<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => LogOutUser()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Ionicons name="exit-outline" size={22} /> */}
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>:null
      }
      
    </View>
  );
}
