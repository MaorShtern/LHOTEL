import React, { useEffect, useState, useContext } from "react";
import Customer from "../Class/Customer";
import Reservation from "../Class/Reservation";
import {StyleSheet,View,Image, TouchableOpacity,  FlatList,  Alert,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";
import { Divider, Text } from "react-native-paper";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import { Checkbox } from "react-native-paper";
import CheckIn from "./CheckIn";
import AppContext from "../../AppContext";



export default function ShortCheckIn({ route, navigation }) {
  // { route, navigation }
  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation

  // let { currReservation } = route.params;

  // const curr = currReservation[0];
  // console.log(curr);

  const CalcCost = () => {
    let total = 0;
    if (curr.BillNumber === undefined) {
      let rooms_costs = [
        { type: "Single", cost: 100, amount: curr.CounterSingle },
        { type: "Double", cost: 300, amount: curr.CounterDouble },
        { type: "Suite", cost: 500, amount: curr.CounterSuite },
      ];
      rooms_costs.map((room) => {
        room.cost = room.cost * room.amount;
      });
      rooms_costs.forEach((element) => {
        total += element.cost;
      });
    } else {
      for (let i = 0; i < currReservation.length; i++) {
        total += currReservation[i].PricePerNight;
      }
    }

    return total;
  };
  const ReservationCard = () => {
    const renderItem = ({ item }) => (
      <>
        <Divider
          style={{
            width: 2,
            height: "70%",
            marginRight: 10,
            alignSelf: "center",
          }}
        />

        <Text
          style={{
            fontSize: 17,
            paddingHorizontal: 5,
            marginRight: 10,
            paddingBottom: 5,
          }}
        >
          Room : {item.RoomNumber}
        </Text>
      </>
    );

    return (
      <View
        style={{
          marginHorizontal: 10,
          paddingTop: 10,
          height: 200 + (Math.ceil(currReservation.length / 3) - 1) * 25,
          
        }}
      >
        <View style={styles.Details}>
          <Text style={{ fontSize: 16 }}>
            {moment(
              curr.BillDate === undefined ? new Date() : new Date(curr.BillDate)
            ).format("DD.MM.YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {curr.BillNumber === undefined ? null : "No : " + curr.BillNumber}
          </Text>
        </View>
        <View style={{ paddingTop: 10,alignSelf:'flex-end' }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            <Image style={styles.icon} source={images.calendar} />
            {" " +
              moment(new Date(curr.EntryDate))
                .format("DD.MM.YYYY")
                .split(".")[0] +
              " - " +
              moment(new Date(curr.ExitDate)).format("DD.MM.YYYY")}{" "}
            ({moment(curr.ExitDate).diff(moment(curr.EntryDate), "days")}{" "}
            nights)
          </Text>
          <Text
            style={{
              color: "#888",
              paddingHorizontal: 5,
              paddingTop: 10,
              fontSize: 17,
              alignSelf:'flex-end'
            }}
          >
            {curr.AmountOfPeople} adults
          </Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginRight: 5,
            }}
          >
            {currReservation[0].RoomNumber === undefined ? null : (
              <FlatList
                data={currReservation}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
              />
            )}
          </View>
        </View>
      </View>
    );
  };
 // פונצקיה לביצוע צ'ק אין ללקוח שלא קיים לו משתמש במערכת
  const CheckIn_Without_Existing_User = async () => {
    var Hashes = require('jshashes')
        let SHA1Pass = new Hashes.SHA1().b64_hmac(curr.CustomerID, curr.CustomerID)
        let SHA1Card = new Hashes.SHA1().b64_hmac(curr.CustomerID, curr.CreditCardNumber)
    try {
      let newCustomer = {
        // יצירת אובייקט מסוג לקוח
        className: Customer,
        fields: {
          CustomerID: curr.CustomerID,
          CustomerType: curr.CustomerType,
          FirstName: curr.FirstName,
          LastName: curr.LastName,
          Mail: curr.Mail,
          Password: SHA1Pass,
          PhoneNumber: curr.PhoneNumber,
          CardHolderName: curr.CardHolderName,
          CreditCardNumber: SHA1Card ,
          CreditCardDate: curr.CreditCardDate,
          ThreeDigit: curr.ThreeDigit,
          EmployeeID: curr.EmployeeID,
          AmountOfPeople: curr.AmountOfPeople,
          Breakfast: curr.Breakfast,
          CounterSingle: curr.CounterSingle,
          CounterDouble: curr.CounterDouble,
          CounterSuite: curr.CounterSuite,
          ExitDate: curr.ExitDate,
          EntryDate: curr.EntryDate
        },
      };
     

    
      let theCustomer = JSON.stringify(newCustomer.fields)
     
      const requestOptions = {
        method: 'POST',
        body: theCustomer,
        headers: { 'Content-Type': 'application/json' }
    };
      
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/CheckIn_Without_Existing_User", requestOptions);
      let reservationResult = await result.json();
      if (reservationResult) {
        console.log(reservationResult);
        alert("You have checked in successfully !");
      }
      navigation.navigate("CheckIn");
    } catch (error) {
      alert(error);
    }
  };
  const CheckIn_With_Existing_User = async () => {
    try {
      let reservation = {
        // יצירת אובייקט מסוג לקוח
        className: Reservation,
        fields: {
          CustomerID: curr.CustomerID,
          Breakfast: curr.Breakfast,
          CardHolderName: curr.CardHolderName,
          CreditCardNumber: curr.CreditCardNumber,
          CreditCardDate: curr.CreditCardDate,
          ThreeDigit: curr.ThreeDigit,
          AmountOfPeople: curr.AmountOfPeople,
          EmployeeID: curr.EmployeeID,
          CounterSingle: curr.CounterSingle,
          CounterDouble: curr.CounterDouble,
          CounterSuite: curr.CounterSuite,
          ExitDate: curr.ExitDate,
          EntryDate: curr.EntryDate,
        },
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(reservation.fields),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/CheckIn_With_Existing_User",
        requestOptions
      );
      let customerResult = await result.json();
      if (customerResult) {
        console.log(customerResult);
        alert("You have checked in successfully !");
      }
      navigation.navigate("CheckIn");
    } catch (error) {
      alert(error);
    }
  };
  const CheckInWithExistingReservation = async () => {
    try {
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
          "id": curr.CustomerID,
          "Entry_Date": curr.EntryDate,
        }),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch("http://proj13.ruppin-tech.co.il/CheckIn", requestOptions);
      let customerResult = await result.json();
      if (customerResult !==null) {
        console.log(customerResult);

        alert("You have checked in successfully !");
      }
      navigation.navigate("CheckIn");
    } catch (error) {
      alert(error);
    }
  };
console.log(myContext.isUserExist);
  const CheckIn = () => {
    if (curr.BillNumber !== undefined) CheckInWithExistingReservation();
    else if (myContext.isUserExist) CheckIn_With_Existing_User();
    else CheckIn_Without_Existing_User();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flex: 2 }}>
        <Image
          source={images.hotelback}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "80%",
          }}
        />
        <View
          style={[
            {
              position: "absolute",
              bottom: "5%",
              left: "5%",
              right: "5%",
              borderRadius: 15,

              backgroundColor: "#fff",
            },
            styles.shadow,
          ]}
        >
          <ReservationCard />
        </View>

        <View
          style={{
            position: "absolute",
            flexDirection: "row",
          }}
        ></View>
      </View>

      <View style={{ flex: 1.5 }}>
        <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 20, paddingBottom: 20 ,alignSelf:'flex-end'}}>
            Customer's details{" "}
          </Text>

          <View style={styles.containerTaskDedtails}>
            <View style={styles.Details}>
              <Text
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  fontSize: 18,
                  // alignSelf: "flex-end",
                }}
              >
                Type : {curr.CustomerType}
              </Text>
              <Text
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  fontSize: 18,
                  // alignSelf: "flex-end",
                }}
              >
                ID : {curr.CustomerID}
              </Text>
            </View>
            <View style={styles.Details}>
              <Text style={{ fontSize: 18 }}>{curr.Mail}</Text>
              <Text style={{ fontSize: 18 }}>
                {curr.FirstName + " " + curr.LastName}
              </Text>
            </View>
            <View style={styles.Details}>
              {/* <Text style = {{paddingHorizontal:5,paddingVertical:5,fontSize:18 ,alignSelf:'flex-end'}}>5421************</Text> */}
              {/* <Icon name="card" size={25} color="#a8a9ad" /> */}
            </View>
            <Text style={{ padding: 10, fontSize: 18 ,alignSelf:'flex-end'}}>
              {" "}
              <Icon name="call" size={20} color="#a8a9ad" />
              {curr.PhoneNumber}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={{ flex: 0.5, paddingHorizontal: 10 }}>
        <LinearGradient
          style={[{ height: 70, width: "100%", borderRadius: 15 }]}
          colors={["#edf0fc", "#d6dfff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30 }}>{CalcCost()}$</Text>
            </View>

            <TouchableOpacity
              style={{ width: 130, height: "80%", marginHorizontal: 10 }}
              //   onPress={() => SaveReservationToDB()}
              onPress={() => CheckIn()}
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
                colors={["#46aeff", "#5884ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={{ color: "#fff" }}>CHECK IN NOW</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,

    // padding: 20,
  },

  containerTaskDedtails: {
    borderColor: "black",
    borderWidth: 1,
  },

  Details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  BTNImages: {
    width: 30,
    height: 30,
  },
  BTNContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
});
