import { View, Text, StyleSheet, TextInput, ScrollView, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from '@mui/material';



export default function Booking({ navigation }) {

  const [flagEnrty, setFlagEntry] = useState(false)
  const [flagExit, setFlagExit] = useState(false)
  const [enteryDate, setEnteryDate] = useState(new Date())
  const [exitDate, setExitDate] = useState(new Date())

  const [single, setSingle] = useState(false)
  const [double, setDouble] = useState(false)
  const [svit, setSvit] = useState(false)


  // if(getDate() === null)
  // {
  //   Alert.alert('Must be logged in with a user to book a hotel room')
  //   navigation.navigate('Login')
  // }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@conect_user')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      Alert.alert(error)
    }
  }



  const showDatePickerEntry = () => {
    setFlagEntry(true);
  };
  const hideDatePickerEntry = () => {
    setFlagEntry(false);
  };

  const showDatePickerExit = () => {
    setFlagExit(true);
  };
  const hideDatePickerExit = () => {
    setFlagExit(false);
  };

  const handleConfirmEnteryDate = (date) => {
    setEnteryDate(date)
    hideDatePickerEntry()
  };

  const handleConfirmExitDate = (date) => {
    setExitDate(date)
    hideDatePickerExit()
  };


  const [amount_Of_People, setAmount_Of_People] = useState(0)
  const [number_Of_Nights, setNumber_Of_Nights] = useState(0)
  const [breakfast, setreakfast] = useState(false);
  

  const Delete = () => {
    setAmount_Of_People(0)
    setNumber_Of_Nights(0)
    setreakfast(false);
    setSingle(false)
    setDouble(false)
    setSvit(false)
    setEnteryDate(new Date())
    setExitDate(new Date())
  }

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Booking</Text>
      <View style={styles.label}>

        <View style={{ height: 10 }}></View>

        <TouchableOpacity style={styles.button} onPress={showDatePickerEntry} >
          <Text>{"Entry date: " + enteryDate.getDate() + "/" + (enteryDate.getMonth() + 1) + "/" + enteryDate.getFullYear()}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={flagEnrty}
          mode="date"
          onConfirm={handleConfirmEnteryDate}
          onCancel={hideDatePickerEntry} />
        <View style={{ height: 20 }}></View>

        <TouchableOpacity style={styles.button} onPress={showDatePickerExit} >
          <Text>{"Exit date: " + exitDate.getDate() + "/" + (exitDate.getMonth() + 1) + "/" + exitDate.getFullYear()}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={flagExit}
          mode="date"
          onConfirm={handleConfirmExitDate}
          onCancel={hideDatePickerExit} />
        <View style={{ height: 20 }}></View>

        <TextInput value={amount_Of_People} placeholder='Amount of people: ' style={styles.TextInput} keyboardType="number-pad" onChangeText={(number) => setAmount_Of_People(number)}></TextInput>
        <View style={{ height: 10 }}></View>

        <View>
          <Text style={styles.Text}>Room Type</Text>
          <View style={styles.RadioCheckbox}>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={single ? 'checked' : 'unchecked'} onPress={() => { setSingle(!single) }} />
              <Text>Single</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={double ? 'checked' : 'unchecked'} onPress={() => { setDouble(!double) }} />
              <Text>Double</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={svit ? 'checked' : 'unchecked'} onPress={() => { setSvit(!svit) }} />
              <Text>Suit</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 10 }}></View>
        <TextInput value={number_Of_Nights} placeholder='Number of nights: ' style={styles.TextInput} keyboardType="number-pad" onChangeText={(number) => setNumber_Of_Nights(number)}></TextInput>
        <View style={{ height: 10 }}></View>

        <View style={styles.switchContainer}>
          <Switch onValueChange={() => { setreakfast(!breakfast) }} value={breakfast} />
          <Text>Include breakfast?</Text>
        </View>
        <View style={{ height: 10 }}></View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={Delete} >
            <Text>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SaveRoom')} >
            <Text>SUBMIT</Text>
          </TouchableOpacity>
          {/* <Button title="DELETE" ></Button>
          <Button title="SUBMIT" onPress={() => navigation.navigate('SaveRoom')} ></Button> */}
        </View>
      </View>
    </ScrollView>
  )
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

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
  },

  label: {
    padding: 20,
  },

  button:
  {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10

  },

  RadioCheckbox: {
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
  },

  Checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  TextInput: {
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    padding: 10,
  },

  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10
  },

  Text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },


});