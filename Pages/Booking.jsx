import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";




export default function Booking({ navigation }) {

  const [flag, setFlag] = useState(false)
  const [enteryDate, setEnteryDate] = useState(new Date())
  // var date = new Date().getDate();
  // var month = new Date().getMonth() + 1;
  // var year = new Date().getFullYear();
  // var formattedDate = format(enteryDate, "MMMM do, yyyy H:mma")

  // console.warn("A date has been picked: ", date.toString());
  // console.warn("A Day: ", date.getDate());
  //console.warn("A Month: ", date.getMonth()+1);

  //console.warn("A FullYear: ", date.getFullYear());

  // var time = new Date(2022,2,3)
  // console.warn(time.getFullYear())


  const showDatePicker = () => {
    setFlag(true);
  };
  const hideDatePicker = () => {
    setFlag(false);
  };
  const handleConfirm = (date) => {
    console.warn(date.getDay())
    setEnteryDate(date)
    hideDatePicker();
  };


  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Booking</Text>
      <View style={styles.label}>

        <View style={{ height: 10 }}></View>

        <Button title="Entry date" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={flag}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker} />
        <View style={{ height: 20 }}></View>

        <Button title="Entry date" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={flag}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker} />
        <View style={{ height: 20 }}></View>

        <TextInput placeholder='Amount of people: ' style={styles.TextInput}></TextInput>
        <View style={{ height: 10 }}></View>
        {/* <Text>{enteryDate.getDay()}</Text>
        <Text>{enteryDate.getMonth()+1}</Text>
        <Text>{enteryDate.getFullYear()}</Text> */}
        {/* <Text>{formattedDate}</Text> */}

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
  label: {
    padding: 20,
  },
  TextInput: {
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    padding: 10,

  },
  Text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 20
  },

});