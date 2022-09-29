import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Customer from "./Class/Customer";
import { CreditCardInput } from "react-native-credit-card-input-view";
import AppContext from "../AppContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Credit({ route, navigation }) {


  const myContext = useContext(AppContext);
  const isEmploeeConncted = JSON.stringify(myContext.employee) !== "{}";

  let { ReservationDetails } = route.params;
console.log(ReservationDetails.NumberOfNights);
  const [form, SetForm] = useState({});

  const onChange = (form) => {
    SetForm(form);
  };

  const SaveRoomReservation = async (value) => {
    let { the_data, totalSum } = route.params;
    // console.log(totalSum);
    try {
      // console.log(totalSum);
      navigation.navigate("ConfirmationPage", {
        customer: value,
        the_data: the_data,
        totalSum: totalSum
      });
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(value.fields),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch("http://proj13.ruppin-tech.co.il/SaveRoomReservation", requestOptions);
      let customerResult = await result.json();
      if (customerResult)
        navigation.navigate("ConfirmationPage", {
          customer: value,
          the_data: the_data,
          totalSum: totalSum
        });
      // console.log(customerResult);
      // navigation.navigate('ConfirmationPage', {
      //   id: value.CustomerID, the_data: the_data,
      //   number_Of_Nights: number_Of_Nights, breakfast: breakfast, entryDate: entryDate, exitDate: exitDate,
      //   total: totalSum, Name: name, CardNum: cardNum
      // })
    } catch (error) {
      alert(error);
    }
  };

  // const ContinueOptions =()=>{
  //    isEmploeeConncted ?
  //    ConfirmInformation():ConfirmInformation2()

  // }
  // console.log(ReservationDetails);
  // const CheckFields = () => { }
  const ConfirmInformation = () => {
    // console.log(form);
    if (!form.valid) {
      alert("Incorrect credit card details")
      return
    }
    let reservation = createCustomerReservation();
    // console.log(customer);
    isEmploeeConncted
      ? navigation.navigate("ShortCheckIn", {
        currReservation: [reservation.fields],
      })
      : SaveRoomReservation(reservation);
  };
  //
  const createCustomerReservation = () => {

    let newReservation = {
      className: Customer,
      fields: {
        CustomerID: ReservationDetails.CustomerID,
        CustomerType: ReservationDetails.CustomerType,
        FirstName: ReservationDetails.FirstName,
        LastName: ReservationDetails.LastName,
        Mail: ReservationDetails.Mail,
        PhoneNumber: ReservationDetails.PhoneNumber,
        EmployeeID: isEmploeeConncted ? ReservationDetails.EmployeeID : -1,
        EntryDate: ReservationDetails.EntryDate,
        ExitDate: ReservationDetails.ExitDate,
        CounterSingle: ReservationDetails.CounterSingle,
        CounterDouble: ReservationDetails.CounterDouble,
        CounterSuite: ReservationDetails.CounterSuite,
        AmountOfPeople: ReservationDetails.AmountOfPeople,
        Breakfast: ReservationDetails.Breakfast,
        NumberOfNights: ReservationDetails.NumberOfNights,
        CardHolderName: form.values.name,
        CreditCardNumber: form.values.number.replace(/ /g, ""),
        CreditCardDate: form.values.expiry,
        ThreeDigit: form.values.cvc,
      },
    };
    return newReservation;

  };


  let { totalSum } = route.params;


  return (
    <View>
{isEmploeeConncted ? null:   <Text style={styles.HeadLine}>Total to pay: {totalSum}$</Text>}
    

      <View style={isEmploeeConncted ? styles.empstyleCard : styles.styleCard}>
        <CreditCardInput
          requiresName={true}
          allowScroll={true}
          autoFocus={true}
          cardScale={0.4}
          keyboardType="numeric"
          onChange={onChange}
          useVertical={true}
        />
        {/* <Text style={{ fontSize: 16, color: "#444", fontWeight: "bold" }}>
            SUBMIT
          </Text>
          <Text style={{ fontSize: 16, color: "#444", fontWeight: "bold" }}>
            SUBMIT
          </Text> */}
      </View>

      <View style={styles.footerStyle}>
        <TouchableOpacity style={styles.footerButtonOne}>
          <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
            DELETE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButtonTwo}
          onPress={() => ConfirmInformation()}
        >
          <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",

  },

  TextInput: {
    flexDirection: "row",
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    padding: 10,
  },
  styleCard: {
    paddingTop: 20,

  },
  empstyleCard: {
    paddingTop: 100
  },
  footerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 650,
    position: "absolute",
    // paddingTop: 15,
  },
  footerButtonOne: {
    backgroundColor: "#656255",

    // padding: 15,
    marginHorizontal: 20,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },

  footerButtonTwo: {
    backgroundColor: "#556B2F",

    // marginLeft:10,
    // padding: 15,
    marginHorizontal: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
