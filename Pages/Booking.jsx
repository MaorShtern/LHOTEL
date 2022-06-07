import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton, Checkbox } from 'react-native-paper';



export default function Booking({ navigation }) {

  const [flagEnrty, setFlagEntry] = useState(false)
  const [flagExit, setFlagExit] = useState(false)
  const [enteryDate, setEnteryDate] = useState(new Date())
  const [exitDate, setExitDate] = useState(new Date())

  let enteryDay = enteryDate.getDate();
  let enteryMonth = enteryDate.getMonth() + 1;
  let enteryYear = enteryDate.getFullYear();
  let exitDay = exitDate.getDate();
  let exitMonth = exitDate.getMonth() + 1;
  let exitYear = exitDate.getFullYear();

  const [amount_Of_People, setAmount_Of_People] = useState(0)
  const [single, setSingle] = useState(false)
  const [double, setDouble] = useState(false)
  const [svit, setSvit] = useState(false)





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




  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Booking</Text>
      <View style={styles.label}>

        <View style={{ height: 10 }}></View>


        <Button title={"Entry date: " + enteryDay + " " + enteryMonth + " " + enteryYear} onPress={showDatePickerEntry} />
        <DateTimePickerModal
          isVisible={flagEnrty}
          mode="date"
          onConfirm={handleConfirmEnteryDate}
          onCancel={hideDatePickerEntry} />
        <View style={{ height: 20 }}></View>

        <Button title={"Exit date: " + exitDay + " " + exitMonth + " " + exitYear} onPress={showDatePickerExit} />
        <DateTimePickerModal
          isVisible={flagExit}
          mode="date"
          onConfirm={handleConfirmExitDate}
          onCancel={hideDatePickerExit} />
        <View style={{ height: 20 }}></View>

        <TextInput placeholder='Amount of people: ' style={styles.TextInput} keyboardType="number-pad" onChangeText={(number) => setAmount_Of_People(number)}></TextInput>
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
              <Text>Svit</Text>
            </View>
            {/* <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
              <RadioButton.Item label="Single" value='Single'/>
              <RadioButton.Item label="Double" value='Double' />
              <RadioButton.Item label="Svit" value='Svit'/>
            </RadioButton.Group> */}
          </View>
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
  label: {
    padding: 20,
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
  Text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
 

});