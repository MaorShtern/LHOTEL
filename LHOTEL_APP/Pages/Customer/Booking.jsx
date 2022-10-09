import { View, Text, Alert, Image, StyleSheet, ScrollView, Switch, TouchableOpacity, } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from "react-native-paper";
import moment from "moment";
import AppContext from "../../AppContext";
import { images } from "../../images";
import { TextInput } from "react-native-paper";

export default function Booking({ navigation }) {

  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation
  const [flagEnrty, setFlagEntry] = useState(false);
  const [flagExit, setFlagExit] = useState(false);
  const [singleFlag, setSingle] = useState(false);
  const [doubleFlag, setDouble] = useState(false);
  const [suiteFlag, setSuite] = useState(false);
  const [number_Of_Nights, setNumber_Of_Nights] = useState(false);
  const [breakfast, setBreakfast] = useState(false);


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
    let entry = moment(date).format("YYYY-MM-DD");
    roomsReservation.EntryDate = entry
    hideDatePickerEntry();
  };

  const handleConfirmExitDate = (date) => {
    let exit = moment(date).format("YYYY-MM-DD");
    roomsReservation.ExitDate = exit
    hideDatePickerExit();
  };





  useEffect(() => {
    let date = moment().format("DD/MM/YYYY")

    if (
      moment(roomsReservation.EntryDate).isBefore(date) ||
      moment(roomsReservation.EntryDate).isSame(date) ||
      moment(roomsReservation.ExitDate).isSame(roomsReservation.EntryDate, "day") ||
      moment(roomsReservation.ExitDate).isBefore(roomsReservation.EntryDate, "day")
    ) {
      setNumber_Of_Nights(false);
      return;
    }
    // let number = moment(roomsReservation.EntryDate).diff( moment(roomsReservation.ExitDate), 'days') * -1  // =1
    // console.log(number);
    setNumber_Of_Nights(true)
  });


  const ChaeckRoomsMarks = () => {
    return singleFlag || doubleFlag || suiteFlag;
  };

  const ChaeckAll = () => {
    if (number_Of_Nights !== true || !(roomsReservation.AmountOfPeople > 0
      && roomsReservation.AmountOfPeople <= 10)) {
      Alert.alert("Some fields are not filled in Properly");
      return;
    }

    let rooms_flags = {}
    if (ChaeckRoomsMarks()) {
      rooms_flags = {
        "Single room": singleFlag,
        "Double room": doubleFlag,
        "Suite": suiteFlag,
      }
    }

    // console.log(rooms_flags);

    navigation.navigate("SaveRoom", { rooms_flags: rooms_flags, });
  };


  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Booking</Text>
      <View style={styles.label}>
        <TouchableOpacity style={styles.input} onPress={showDatePickerEntry}>
          <View style={styles.ButtonContainer}>
            <Text style={styles.text}>{"Entry date: " + moment(roomsReservation.EntryDate).format("DD-MM-YYYY")}</Text>

            <Image style={{ width: 50, height: 50 }} source={images.calendar} />
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={flagEnrty}
          mode="date"
          onConfirm={handleConfirmEnteryDate}
          onCancel={hideDatePickerEntry}
        />

        <TouchableOpacity style={styles.input} onPress={showDatePickerExit}>
          <View style={styles.ButtonContainer}>
            <Text style={styles.text}>{"Exit date: " +  moment(roomsReservation.ExitDate).format("DD-MM-YYYY")}</Text>

            <Image style={{ width: 50, height: 50 }} source={images.calendar} />
          </View>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={flagExit}
          mode="date"
          onConfirm={handleConfirmExitDate}
          onCancel={hideDatePickerExit}
        />
        <View>
          {!number_Of_Nights ? (
            <Text style={styles.alerts}>*The dates are incorrect* </Text>
          ) : (null)}
        </View>

        <View>
          <Text style={styles.Text}>Room Type</Text>
          <View style={styles.RadioCheckbox}>
            <View style={styles.Checkbox}>
              <Checkbox
                label="Item"
                status={singleFlag ? "checked" : "unchecked"}
                onPress={() => setSingle(!singleFlag)}
              />
              <Text>Single</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox
                label="Item"
                status={doubleFlag ? "checked" : "unchecked"}
                onPress={() => setDouble(!doubleFlag)}
              />
              <Text>Double</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox
                label="Item"
                status={suiteFlag ? "checked" : "unchecked"}
                onPress={() => setSuite(!suiteFlag)}
              />
              <Text>Suite</Text>
            </View>
          </View>
          <View>
            {!ChaeckRoomsMarks() ? (
              <Text style={styles.alerts}>
                *Must select at least one room type*{" "}
              </Text>
            ) : null}
          </View>
        </View>

        <TextInput
          style={{ paddingHorizontal: 20, marginVertical: 20, }}
          label="Amount Of people"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(amount) => roomsReservation.AmountOfPeople = amount}
        />

        <View style={styles.switchContainer}>
          <Switch
            onValueChange={() => {
              setBreakfast(!breakfast); roomsReservation.Breakfast = !breakfast
            }} value={breakfast}
          />
          <Text>Include breakfast?</Text>
        </View>


        <View style={{
          alignItems: "center",
          padding: 10,
          marginTop: 20
        }}>
          <TouchableOpacity style={styles.button2} onPress={ChaeckAll}>
            <Text>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  text: {
    height: 50,

    // margin: 3,
    paddingTop: 17,
    paddingLeft: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },

  label: {
    padding: 20,
  },

  button:
  {
    backgroundColor: '#C0C0C0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,

  },
  button2:
  {
    backgroundColor: 'rgba(35,100,168, 0.4)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,

    fontWeight: '500'
  },
  RadioCheckbox: {
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },

  Checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  TextInput: {
    flexDirection: "row",
    borderColor: "black",
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
  alerts: {
    color: "red",
  },
  input: {
    height: 50,
    margin: 12,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // paddingHorizontal:70,
    // paddingVertical:90,
  },
});
