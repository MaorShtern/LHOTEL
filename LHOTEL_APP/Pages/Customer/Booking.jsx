import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from "react-native-paper";
import moment from "moment";
import AppContext from "../../AppContext";
import { images } from "../../images";
import { TextInput } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export default function Booking({ navigation }) {
  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation;
  const [flagEnrty, setFlagEntry] = useState(false);
  const [flagExit, setFlagExit] = useState(false);
  const [singleFlag, setSingle] = useState(false);
  const [doubleFlag, setDouble] = useState(false);
  const [suiteFlag, setSuite] = useState(false);


  const [isEntryModalOpened, SetIsEntryModalOpened] = useState(false);
  const [isExitModalOpened, SetIsExitModalOpened] = useState(false);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [breakfast, setBreakfast] = useState(false);

 

  const showDatePickerEntry = () => {
    setFlagEntry(true);
  };
  const hideDatePickerEntry = () => {
    setFlagEntry(false);
    SetIsEntryModalOpened(true);
  };
  const showDatePickerExit = () => {
    setFlagExit(true);
  };
  const hideDatePickerExit = () => {
    setFlagExit(false);
    SetIsExitModalOpened(true);
  };
  const handleConfirmEnteryDate = (date) => {
    roomsReservation.EntryDate = date
    /
    hideDatePickerEntry();
  };

  const handleConfirmExitDate = (date) => {
    roomsReservation.ExitDate = date
    
    hideDatePickerExit();
  };



  useEffect(() => {
    if (
      moment(roomsReservation.EntryDate).isBefore(moment(), "day") ||
      moment(roomsReservation.ExitDate).isSame(roomsReservation.EntryDate, "day") ||
      moment(roomsReservation.ExitDate).isBefore(roomsReservation.EntryDate, "day")
    ) {
      setNumberOfNights(0);
     
      return;
    }
    if (!isEntryModalOpened && isExitModalOpened) {
      setNumberOfNights(moment(roomsReservation.ExitDate).diff(moment(roomsReservation.EntryDate), "days") + 1);
     
      return;
    }
   
    setNumberOfNights(moment(roomsReservation.ExitDate).diff(moment(roomsReservation.EntryDate), "days"));
  });

  useFocusEffect(
    React.useCallback(() => {
      SetIsExitModalOpened(false);
      SetIsEntryModalOpened(false);

    }, [])
  );

  const CheckRoomsMarks = () => {
    return singleFlag || doubleFlag || suiteFlag;
  };
  const CheckAll = () => {
    if (numberOfNights === 0 || !(roomsReservation.AmountOfPeople > 0 && roomsReservation.AmountOfPeople <= 10)) {
      Alert.alert("Some fields are not filled in Properly");
      return;
    }
    if (CheckRoomsMarks()) {
      let rooms_flags = {
        "Single room": singleFlag,
        "Double room": doubleFlag,
        "Suite": suiteFlag,
      };
      roomsReservation.NumberOfNights = numberOfNights
      roomsReservation.Breakfast = breakfast
      navigation.navigate("SaveRoom", { rooms_flags: rooms_flags });
    } else Alert.alert("Some fields are not filled in Properly");
  };


  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Booking</Text>
      <View style={styles.label}>
        <TouchableOpacity style={styles.input} onPress={showDatePickerEntry}>
          <View style={styles.ButtonContainer}>
            <Text style={styles.text}>
              {"Entry date: " + moment(roomsReservation.EntryDate).format("DD/MM/YYYY")}
            </Text>
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
            <Text style={styles.text}>
              {"Exit date: " + moment(roomsReservation.ExitDate).format("DD/MM/YYYY")}
            </Text>
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
          {numberOfNights === 0 ? (
            <Text style={styles.alerts}>*The dates are incorrect* </Text>
          ) : (
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18 }}>
                Amount of nights : {numberOfNights}
              </Text>
            </View>
          )}
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
            {!CheckRoomsMarks() ? (
              <Text style={styles.alerts}>
                *Must select at least one room type*{" "}
              </Text>
            ) : null}
          </View>
        </View>

        <TextInput
          style={{
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
          label="Amount Of people"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(amount) => roomsReservation.AmountOfPeople = amount}
        />

        <View style={styles.switchContainer}>
          <Switch
            onValueChange={() => { setBreakfast(!breakfast); }}
            value={breakfast}
          />
          <Text>Include breakfast?</Text>
        </View>

        <View
          style={{
            alignItems: "center",
            padding: 10,
            marginTop: 20,
          }}
        >
          <TouchableOpacity style={styles.button2} onPress={CheckAll}>
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
 
  },
});
