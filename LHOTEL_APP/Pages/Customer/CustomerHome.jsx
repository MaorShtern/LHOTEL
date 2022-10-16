import * as React from "react";
import {  View,  Text,  StyleSheet,  Image,  ScrollView,  Linking,  TouchableOpacity,  StatusBar,} from "react-native";
import CarouselImages from "./CarouselImages";
import { images } from "../../images";
import { useContext ,useEffect} from "react";
import AppContext from "../../AppContext";
import { useFocusEffect } from "@react-navigation/native";

const fullAddress = "חדרה";
const url = Platform.select({
  ios: `maps:0,0?q=${fullAddress}`,
  android: `geo:0,0?q=${fullAddress}`,
});
// console.log();


export default function CustomerHome({ route, navigation }) {
  const myContext = useContext(AppContext);
  const user = myContext.user;
  const bill = myContext.bill;
  const LogOutUser = async () => {
    myContext.setUserDB({});
    myContext.SetBill({
        CustomerID: '',
        BillNumber: 0,
        BillDate: '',
        AmountOfPeople: 0,
        Breakfast: false,
        NumberOfNights: 0,
        rooms: []});
  };

  return (
    <ScrollView>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      {/* {user.FirstName !== undefined ? (
        <View style={styles.userContainer}>
          <TouchableOpacity style={styles.LogoutBtn} onPress={LogOutUser}>
            <Text style={{ color: "white" }}>Log out</Text>
          </TouchableOpacity>
          <Text style={{ color: "white" }}>
            Hello , {user.FirstName} {user.LastName}
          </Text>
        </View>
      ) : null} */}

      {/* <Text style={styles.Text}>DETAILS ABOUT THE HOTEL</Text> */}
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("mailto:maor100maor@example.com")}
          title="support@example.com"
        >
          <Text style={styles.buttonText}>EMAIL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("tel:052-6211881")}
        >
          <Text style={styles.buttonText}>CALL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(url)}
        >
          <Text style={styles.buttonText}>ADDRESS</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.Text}>POPULERS ROOMS</Text>
      <CarouselImages />

      <View style={{ height: 10 }}></View>

      <Text style={styles.Text}>ACTIVITES</Text>

      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
        }}
      >
        <Image style={styles.Image} source={images.bar} />
        <Image style={styles.Image} source={images.events} />
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ paddingRight: 75 }}>BAR</Text>
        <Text style={{ paddingLeft: 75 }}>EVENTS</Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
        }}
      >
        <Image style={styles.Image} source={images.spa} />
        <Image style={styles.Image} source={images.lobi} />
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ paddingRight: 75 }}>SPA</Text>
        <Text style={{ paddingLeft: 75 }}>LOBI</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
    padding: 5,
  },
  Text: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    padding: 20,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonRooms: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    padding: 10,
  },
  user_Name: {
    backgroundColor: "black",
    alignItems: "center",
    textAlign: "center",
  },
  innerText: {
    color: "white",
    padding: 5,
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
    color: "white",
    backgroundColor: "black",
  },
  LogoutBtn: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
});
