import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import { images } from "../../images";
import { Ionicons } from "@expo/vector-icons";
import { CustomCard } from "./CustomCard";
const reservations = [

  {
    Room_Number: 3,
    
    Bill_Number: 3,
    Customer_ID: 333,
    Bill_Date: "2021-01-01",
    Entry_Date: "2021-01-01",
    Exit_Date: "2021-01-05",
    Amount_Of_People: 2,
    Room_Status: "Reserved",
  },
  {
    Room_Number: 4,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Reserved",
  },
  {
    Room_Number: 12,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Reserved",
  },
  {
    Room_Number: 13,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Reserved",
  },
  {
    Room_Number: 5,
    Bill_Number: 5,
    Customer_ID: 555,
    Bill_Date: "2020-09-12",
    Entry_Date: "2020-09-12",
    Exit_Date: "2020-09-16",
    Amount_Of_People: 2,
    Room_Status: "Reserved",
  },
];

export default function ExistingReservation({ route, navigation }) {

  const [id, setId] = useState(0);
  const [currentReservationsArr, setCurrentReservationsArr] = useState([])


const ReservationCheck = ()=> {
  let currReservations =  reservations.filter(
    (reservation) => reservation.Customer_ID == id  )
    if  (currReservations.length !== 0) {
      // setCurrentReservationsArr(currReservations)
      console.log(JSON.stringify(currReservations));
      navigation.navigate("ShortCheckIn",{currentReservationsArr:currReservations})
    } else alert("No matching Reservation for the ID you entered")
} 
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.hotelloby}
        resizeMode="cover"
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      >
        <Text style={styles.header}>LHOTEL</Text>
      </ImageBackground>

      <View style={styles.bottomview}>
        <View style={{ paddingTop: 80 }}>
          <Text
            style={{ alignSelf: "center", fontWeight: "bold", fontSize: 25 }}
          >
            Enter customer's ID
          </Text>

          <TextInput
            style={styles.input}
  
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(id) =>setId(id)}
            value={id}
          />

          <TouchableOpacity
            onPress={() => ReservationCheck()}
            style={{
              width: "70%",
              height: 60,
              marginHorizontal: 10,
              marginVertical: 20,
              alignSelf: "center",
              borderRadius: 25,
              shadowOpacity: 0.3,
              shadowRadius: 25,
              elevation: 5,
            }}
          >
            <LinearGradient
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 25,
                },
              ]}
              colors={["#f1a101", "#c0592b"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#000", fontSize: 25, fontWeight: "bold" }}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  bottomview: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -40,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    fontSize: 35,
    alignSelf: "flex-end",
    paddingTop: 145,
    paddingLeft: 25,

    fontWeight: "bold",

    color: "#fff",
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 50,
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    shadowColor: "grey",

    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "orange",
    alignSelf: "center",
    width: 210,
    paddingHorizontal: 50,
    paddingVertical: 20,

    borderRadius: 10,
  },
  textButton: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
