import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import AppContext from "../../AppContext";

export default function Login({ navigation }) {

  const [id, setID] = useState('')
  const [password, setPassword] = useState('')
  const [loading, SetLoading] = useState(true)
  const myContext = useContext(AppContext);


  const FetchUserFromDB = async (hashPassword) => {
    try {
      SetLoading(false)
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          "id": id,
          "password": hashPassword
        }),
        headers: { 'Content-Type': 'application/json' }
      };
      let result = await fetch('http://proj13.ruppin-tech.co.il/GetCustomerByMailAndPassword', requestOptions);
      let user = await result.json();
      // console.log(JSON.stringify(user));
      if (user !== null) {
        // console.log(JSON.stringify(user));
        SetLoading(true)
        myContext.setUserDB(user)
        navigation.navigate('Home')
        return
      }
      else {
        alert("There is no registered user in the system")
      }
    } catch (error) {
      alert(error)
    }
    SetLoading(true)
  }


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
      var Hashes = require('jshashes')
      let hashPassword = new Hashes.SHA1().b64_hmac(id, password) // הצפנת סיסמת משתמש לפי מפתח ת.ז שלו והשמה במשתנה 
      FetchUserFromDB(hashPassword)
    }
    else {
      Alert.alert("No such user exists in the system")
    }

  }



  const Delete = () => {
    setID('')
    setPassword('')
  }



  return (
    <View>
      <Text style={styles.HeadLine}>Login</Text>
      <View style={{ paddingTop: 10 }}>
        {loading ? null : <Spinner />}
      </View>
      <View style={styles.label}>
        <Text style={styles.Text}>ID: </Text>
        <TextInput keyboardType='numeric' onChangeText={(id) => setID(id)} style={styles.TextInput}></TextInput>
      </View>
      <View style={styles.label}>
        <Text style={styles.Text}>Password: </Text>
        <TextInput onChangeText={(password) => setPassword(password)} secureTextEntry={true} style={styles.TextInput}></TextInput>
      </View>

      <View style={styles.ButtonContainer}>
        <TouchableOpacity>
          <Text style={styles.button} onPress={Delete} >DELETE</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button} onPress={LogIn} >SUBMIT</Text>
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
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    padding: 10
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10
  },
  button:
  {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10
  },
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
});
