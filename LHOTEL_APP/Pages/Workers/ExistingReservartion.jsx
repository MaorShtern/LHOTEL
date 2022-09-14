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



export default function ExistingReservation({ route, navigation }) {

  let {Id} = route.params
  // useEffect =()=>{  console. log("fsfsdf"),[]}
  const [id, setId] = useState(Id)
  // const [currentReservation, setCurrentReservation] = useState([])
  // useEffect(() => { FetchData() }, []);

 

const ReservationCheck = async ()=> {

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      "id": id,
     
    }),
    headers: { 'Content-Type': 'application/json' }
  };
  let result = await fetch('http://proj13.ruppin-tech.co.il/GetReservedRoomsByCustomerId', requestOptions);
  let currReservation  = await result.json();
  if (currReservation !== null) {
    navigation.navigate("ShortCheckIn",{currReservation:currReservation})
    return
    
  }
  else alert("No matching Reservation for the ID you entered")
 
} 
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.hotelback}
        resizeMode="cover"
        style={{
          flex: 2,
          justifyContent: "flex-end",
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
                  borderRadius: 10,
                },
              ]}
              colors={["#926F34", "#DFBD69"]}
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
   
   
    zIndex: 1,
    fontWeight: 'bold',
    bottom:40,
    color: 'white',
    right: 10
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
