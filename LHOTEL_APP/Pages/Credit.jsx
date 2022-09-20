import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Customer from "./Class/Customer";
import { CreditCardInput } from "react-native-credit-card-input-view";
import AppContext from "../AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Credit({ route, navigation }) {
 
 
  const myContext = useContext(AppContext);
  const isEmploeeConncted = JSON.stringify(myContext.employee) !== "{}";

  let { customerDetails } = route.params;

  const [form, SetForm] = useState({});

  const onChange = (form) => {
    SetForm(form);
  };

  const SaveRoomReservation = async (value) => {
    let { the_data } = route.params;
    // console.log(the_data);
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(value.fields),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/SaveRoomReservation",
        requestOptions
      );
      let customerResult = await result.json();
      if (customerResult)
        navigation.navigate("ConfirmationPage", {
          customer: value,
          the_data: the_data,
        });
      console.log(customerResult);
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
  const ConfirmInformation = () => {
    let customer = createUser();
    // console.log(customer);
    isEmploeeConncted
      ? navigation.navigate("ShortCheckIn", {
          currReservation: [customer.fields],
        })
      : SaveRoomReservation(customer);
  };
  //
  const createUser = () => {
    let newCustomer = {
      className: Customer,
      fields: {
        CustomerID: customerDetails.CustomerID,
        CustomerType: customerDetails.CustomerType,
        FirstName: customerDetails.FirstName,
        LastName: customerDetails.LastName,
        Mail: customerDetails.Mail,
        PhoneNumber: customerDetails.PhoneNumber,
        CardHolderName: form.values.name,
        CreditCardNumber: form.values.number.replace(/ /g, ""),
        CreditCardDate: form.values.expiry,
        ThreeDigit: form.values.cvc,
        AmountOfPeople: customerDetails.AmountOfPeople,
        EmployeeID: isEmploeeConncted ? customerDetails.EmployeeID : -1,
        CounterSingle: customerDetails.CounterSingle,
        CounterDouble: customerDetails.CounterDouble,
        CounterSuite: customerDetails.CounterSuite,
        ExitDate: customerDetails.ExitDate,
        EntryDate: customerDetails.EntryDate,
      },
    };
    return newCustomer;
    navigation.navigate("ShortCheckIn", {
      currReservation: [newCustomer.fields],
    });
    console.log("new cast using emloeey " + JSON.stringify(newCustomer.fields));
  };
  // const ConfirmInformation2 = () => {

  //   // const { the_data, number_Of_Nights, breakfast, entryDate, exitDate, amount_Of_People } = route.params

  //   //   let counter_Single = the_data.filter((per) => per.type === "Single room")[0] === undefined ? 0: the_data.filter((per) => per.type === "Single room")[0].count
  //   //   let counter_Double =  the_data.filter((per) => per.type === "Double room")[0] === undefined ?0: the_data.filter((per) => per.type === "Double room")[0].count
  //   //  let counter_Suite = the_data.filter((per) => per.type === "Suite")[0] === undefined ?0: the_data.filter((per) => per.type === "Suite")[0].count

  //    // console.log(user);
  //     // let customer = {
  //     //  className: Customer,
  //     //   fields: {
  //     //     CustomerID: user.CustomerID,
  //     //     CustomerType: 1,
  //     //     FirstName: user.FirstName,
  //     //     LastName: user.LastName,
  //     //     Mail: user.Mail,
  //     //     Password: user.Password,
  //     //     PhoneNumber: user.PhoneNumber,
  //     //     CardHolderName: form.values.name,
  //     //     CreditCardNumber: form.values.number.replace(/ /g, ''),
  //     //     CreditCardDate: form.values.expiry,
  //     //     ThreeDigit: form.values.cvc,
  //     //     EmployeeID: -1,
  //     //     CounterSingle: counter_Single,
  //     //     CounterDouble:counter_Double,
  //     //     CounterSuite: counter_Suite,
  //     //     EntryDate: entryDate,
  //     //     ExitDate: exitDate,
  //     //     AmountOfPeople: amount_Of_People
  //     //   }

  //     // }
  //     // console.log("new cast using customer "+ customer.fields);

  //     // SaveRoomReservation(customer.fields)
  //   }

  let { totalSum } = route.params;

  // console.log(totalSum);
  // style={{ marginTop: 120 }}
  return (
    <View>
      
      {
isEmploeeConncted ? null :<Text style={styles.HeadLine}>Total to pay: {totalSum}$</Text>
      }
      
      <View style={isEmploeeConncted ? styles.empstyleCard:styles.styleCard }>
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
    textDecorationLine: "underline",
  },

  TextInput: {
    flexDirection: "row",
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    padding: 10,
  },
  styleCard:{
    paddingTop: 20 ,
    
  },
  empstyleCard:{
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
