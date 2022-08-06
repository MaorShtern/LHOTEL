import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Login({ navigation }) {

  const [arrUsers, setArrUsers] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => { readData(); }, []);


  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key_0');

      if (value !== null) {
        let new_Array = [value]
        setArrUsers(JSON.parse(new_Array))
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };


  const saveUser = async (value) => {
    try {
      // console.log("arrUsers: " + JSON.stringify(new_Array));
      await AsyncStorage.setItem('@ConUser', JSON.stringify(value), () => {
        Alert.alert("User Saved")
        // navigation.navigate('Login')
      });

    }
    catch (error) {
      Alert.alert(error)
    }
  }


  const LogIn = () => {

    if (email.length != 0 && password.length != 0) {

      let find_user = arrUsers.filter((per) => per['email'] === email && per['password'] === password)
      find_user = find_user[0]

      if (find_user !== undefined) {
        let full_name = "Welcome:  " + find_user.first_name + " " + find_user.last_name
        // saveUser(full_name)
        // navigation.navigate('Homepage')
        navigation.navigate('Homepage', { full_name })
      }
      else
        Alert.alert("No such user exists in the system")
    }
    else {
      Alert.alert("The fields are not complete")
    }
  }



  const Delete = () => {
    setEmail('')
    setPassword('')
  }

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@storage_Key_0')
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (error) {
  //     Alert.alert(error)
  //   }
  // }


  // const LogIn = () => {
  //   // if(email.length != 0 && password.length != 0)
  //   // {
  //   //   let array = getData()
  //   //   console.log("array: " +JSON.stringify(array));

  //   //   let find_user = array.filter((per) => per.email === email && per.password === password)
  //   //   console.log("find_user: " + find_user);
  //   //   if(find_user !== null)
  //   //   {

  //   //   }
  //   // }
  //   // else
  //   // {
  //   //   Alert.alert("The fields are not complete")
  //   // }
  // }



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
          <Text style={styles.button} onPress={Delete} >Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button} onPress={LogIn} >SUBMIT</Text>
        </TouchableOpacity>
        {/* <Button title="DELETE" onPress={Delete}></Button>
        <Button title="SUBMIT" onPress={LogIn}></Button> */}
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
    textDecorationLine: 'underline'

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
