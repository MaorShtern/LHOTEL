import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState} from "react";
import { ActivityIndicator } from "react-native";


export default function Login({ navigation }) {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

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

      if (user !== null) {
        SetLoading(true);
        myContext.setUserDB(user);

        navigation.navigate("Home");
        return;
      } else {
        alert("There is no registered user in the system");
      }
    } catch (error) {
      alert(error);
    }

    SetLoading(true);
  };

  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );

  const LogIn = () => {
    if (id.length != 0 && password.length != 0) {
      var Hashes = require("jshashes");
      let hashPassword = new Hashes.SHA1().b64_hmac(id, password); // הצפנת סיסמת משתמש לפי מפתח ת.ז שלו והשמה במשתנה
      FetchUserFromDB(hashPassword);
     
    } else {
      Alert.alert("No such user exists in the system");
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
