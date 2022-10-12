import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import AppContext from "../../AppContext";

export default function Login({ navigation }) {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const myContext = useContext(AppContext);

  const user = myContext.user;
  const bill = myContext.bill;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const FetchUserFromDB = async (hashPassword) => {
    try {
      SetLoading(false);
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          id: id,
          password: hashPassword,
        }),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/GetCustomerByMailAndPassword",
        requestOptions
      );
      let user = await result.json();
      // console.log(JSON.stringify(user));
      if (user !== null) {
        // console.log(JSON.stringify(user));
        SetLoading(true);
        myContext.setUserDB(user);
        // navigation.navigate('Home')
        return;
      } else {
        alert("There is no registered user in the system");
      }
    } catch (error) {
      alert(error);
    }
    // setModalVisible(!isModalVisible)
    SetLoading(true);
  };

  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );

  // const saveUser = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('@user', JSON.stringify(value), () => {
  //       navigation.navigate('Home')
  //     });

  //   }
  //   catch (error) {
  //     Alert.alert(error)
  //   }
  // }

  const LogIn = () => {
    if (id.length != 0 && password.length != 0) {
      var Hashes = require("jshashes");
      let hashPassword = new Hashes.SHA1().b64_hmac(id, password); // הצפנת סיסמת משתמש לפי מפתח ת.ז שלו והשמה במשתנה
      FetchUserFromDB(hashPassword);
      setModalVisible(!isModalVisible);
      // toggleModal()
      //  FetchCustomerReservationFromDB(id)
    } else {
      Alert.alert("No such user exists in the system");
    }
  };
const FetchCustomerReservationFromDB = async () => {
 if (user.CustomerID !== undefined) {
  try {
 const requestOptions = {
 method: "POST",
  body: JSON.stringify({
   id: user.CustomerID
  }),
  headers: { "Content-Type": "application/json" },
 };
 let result = await fetch(
  "http://proj13.ruppin-tech.co.il/RoomResit",requestOptions
        );
        let customerReservation = await result.json();

        if (customerReservation !== null) {
          bill.CustomerID = customerReservation[0].CustomerID;
          bill.BillNumber = customerReservation[0].BillNumber;
          bill.BillDate = customerReservation[0].BillDate;
          bill.AmountOfPeople = customerReservation[0].AmountOfPeople;
          bill.Breakfast = customerReservation[0].Breakfast;
          bill.NumberOfNights = customerReservation[0].NumberOfNights;
          bill.AmountOfPeople = customerReservation[0].AmountOfPeople;

          customerReservation.map((room) =>
            bill.rooms.push({
              RoomNumber: room.RoomNumber,
              PricePerNight: room.PricePerNight,
            })
          );

          //   console.log(JSON.stringify(bill));
        } else {
          FetchCustomerReservationFromDB();
        }
      } catch (error) {
        alert(error);
      }
      setModalVisible(!isModalVisible)
      navigation.navigate("Home");
    }
  };
  const Delete = () => {
    setID("");
    setPassword("");
  };

  return (
    <View>
      <Text style={styles.HeadLine}>Login</Text>
      <View style={{ paddingTop: 10 }}>{loading ? null : <Spinner />}</View>
      <View style={styles.label}>
        <Text style={styles.Text}>ID : </Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(id) => setID(id)}
          style={styles.TextInput}
        ></TextInput>
      </View>
      <View style={styles.label}>
        <Text style={styles.Text}>Password : </Text>
        <TextInput
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          style={styles.TextInput}
        ></TextInput>
      </View>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#90A9A4",
            width: "90%",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#fff",
            marginVertical: 150,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              paddingVertical: 50,
              width: 180,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Please log in to continue placing the order
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 50,
            }}
          >
            <Button title="OK" onPress={FetchCustomerReservationFromDB} />
            {/* <Button title="cancel" onPress={toggleModal} /> */}
          </View>
        </View>
      </Modal>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.button} onPress={Delete}>
            DELETE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button2} onPress={() => LogIn()}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  label: {
    padding: 20,
  },
  TextInput: {
    height: 50,
    marginVertical: 2,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,

    borderRadius: 10,
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
  },
  button: {
    backgroundColor: "#C0C0C0",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  button2: {
    backgroundColor: "rgba(35,100,168, 0.4)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,

    fontWeight: "500",
  },
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
