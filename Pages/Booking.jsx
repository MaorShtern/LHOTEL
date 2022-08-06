import { View, Text, Alert, StyleSheet, TextInput, ScrollView, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from 'react-native-paper';



export default function Booking({ navigation }) {

  const [flagEnrty, setFlagEntry] = useState(false)
  const [flagExit, setFlagExit] = useState(false)
  const [enteryDate, setEnteryDate] = useState(new Date())
  const [exitDate, setExitDate] = useState(new Date())

  const [singleFlag, setSingle] = useState(false)
  const [doubleFlag, setDouble] = useState(false)
  const [svitFlag, setSvit] = useState(false)


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


  // const [amount_Of_People, setAmount_Of_People] = useState(0)
  const [number_Of_Nights, setNumber_Of_Nights] = useState(0)
  const [breakfast, setreakfast] = useState(false);



  const Delete = () => {
    // setAmount_Of_People(0)
    setNumber_Of_Nights(0)
    setreakfast(false);
    setSingle(false)
    setDouble(false)
    setSvit(false)
    setEnteryDate(new Date())
    setExitDate(new Date())
  }

  const ChaeckRoomsMarks = () => {
    if (singleFlag === false && doubleFlag === false && svitFlag === false)
      return false
    else
      return true
  }

  const CheackAmountOfPeople = () => {
    if (amount_Of_People <= 0)
      return false
    else
      return true
  }

  const CheackNumOfNights = () => {
    if (number_Of_Nights <= 0)
      return false
    else
      return true
  }

  const CheackDates = () => {
    if (enteryDate.getFullYear() != exitDate.getFullYear() ||
      (exitDate.getMonth() + 1) < (enteryDate.getMonth() + 1)) {

      if ((exitDate.getMonth() + 1) === (enteryDate.getMonth() + 1) &&
        enteryDate.getDate() > exitDate.getDate()) {
        return false
      }
    }
    else
      return true
  }

  const ChaeckAll = () => {
    if (ChaeckRoomsMarks && CheackAmountOfPeople && CheackNumOfNights) {
      navigation.navigate('SaveRoom' , {singleFlag, doubleFlag, svitFlag, number_Of_Nights, breakfast})
    }
    else
      Alert.alert('Some fields are not filled in Properly')
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
        <View>
          {!CheackDates() ? (
            <Text style={styles.alerts}>*The dates are incorrect* </Text>)
            : null}
        </View>
        <View style={{ height: 10 }}></View>

        {/* <TextInput value={amount_Of_People} placeholder='Amount of people: ' style={styles.TextInput} keyboardType="number-pad" onChangeText={(number) => setAmount_Of_People(number)}></TextInput>
        <View>
          {!CheackAmountOfPeople() ? (
            <Text style={styles.alerts}>*Must specify the number of people* </Text>)
            : null}
        </View> */}
        <View>
          <Text style={styles.Text}>Room Type</Text>
          <View style={styles.RadioCheckbox}>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={singleFlag ? 'checked' : 'unchecked'} onPress={() => { setSingle(!singleFlag) }} />
              <Text>Single</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={doubleFlag ? 'checked' : 'unchecked'} onPress={() => { setDouble(!doubleFlag) }} />
              <Text>Double</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={svitFlag ? 'checked' : 'unchecked'} onPress={() => { setSvit(!svitFlag) }} />
              <Text>Suit</Text>
            </View>
          </View>
          <View>
            {!ChaeckRoomsMarks() ? (
              <Text style={styles.alerts}>*Must select at least one room type* </Text>)
              : null}
          </View>

        </View>
        <View style={{ height: 10 }}></View>
        <TextInput value={number_Of_Nights} placeholder='Number of nights: ' style={styles.TextInput} keyboardType="number-pad" onChangeText={(number) => setNumber_Of_Nights(number)}></TextInput>
        <View>
          {!CheackNumOfNights() ? (
            <Text style={styles.alerts}>*Must specify the number of nights* </Text>)
            : null}
        </View>
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
          <TouchableOpacity style={styles.button} onPress={ChaeckAll} >
            <Text>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 30 }}></View>
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
  alerts: {
    color: 'red'
  }

});



// {/* <Button
//   title="Hide/Show Component"
//   onPress={() => setShouldShow(!shouldShow)}
// />
// {/*Here we will return the view when state is true
// and will return false if state is false*/}
// {
//   shouldShow ?
//     (
//       <Iframe width="560" height="315" src="https://www.youtube.com/embed/bdFJ4H3WL3Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe>
//     ) : null
// } */}