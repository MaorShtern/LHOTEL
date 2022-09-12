import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Login({ navigation }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const FetchUserFromDB = async () => {

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        "mail": email,
        "password": password
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch('http://proj13.ruppin-tech.co.il/GetCustomerByMailAndPassword', requestOptions);
    let user = await result.json();
    if (user !== null) {
      console.log(JSON.stringify(user));
      saveUser(user)
      return
    }
    FetchUserFromDB()
  }



  const saveUser = async (value) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(value), () => {
        navigation.navigate('Home')
      });

    }
    catch (error) {
      Alert.alert(error)
    }
  }


  const LogIn = () => {

    if (email.length != 0 && password.length != 0) {
      FetchUserFromDB()
    }
    else {
      Alert.alert("No such user exists in the system")
    }

  }



  const Delete = () => {
    setEmail('')
    setPassword('')
  }



  return (
    <View>
      <Text style={styles.HeadLine}>Login</Text>
      <View style={styles.label}>
        <Text style={styles.Text}>Email: </Text>
        <TextInput keyboardType='email-address' onChangeText={(email) => setEmail(email)} style={styles.TextInput}></TextInput>
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
});
