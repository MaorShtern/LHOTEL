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
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../images";
import { TextInput } from "react-native-paper";

export default function Booking({ navigation }) {

  const myContext = useContext(AppContext);
  // const [showDropDown, setShowDropDown] = useState(false);

  const [flagEnrty, setFlagEntry] = useState(false);
  const [flagExit, setFlagExit] = useState(false);
  const [entryDate, setEntryDate] = useState(moment().toDate());
  const [exitDate, setExitDate] = useState(
    moment(entryDate).add(1, "days").toDate()
  );

  const [isEntryModalOpened, SetIsEntryModalOpened] = useState(false);
  const [isExitModalOpened, SetIsExitModalOpened] = useState(false);
  const [singleFlag, setSingle] = useState(false);
  const [doubleFlag, setDouble] = useState(false);
  const [suiteFlag, setSuite] = useState(false);
  const [number_Of_Nights, setNumber_Of_Nights] = useState(0);
  const [breakfast, setBreakfast] = useState(false);

  const [AmountOfPeople, setAmountOfPeople] = useState(0);

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
    setEntryDate(date);
    hideDatePickerEntry();
  };

  const handleConfirmExitDate = (date) => {
    setExitDate(date);
    hideDatePickerExit();
  };

  const entry = moment(entryDate).format("DD/MM/YYYY");
  const exit = moment(exitDate).format("DD/MM/YYYY");
  // useEffect(() => {

  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setSingle(false)
  //     setDouble(false)
  //     setSuite(false)
  //     console.log();
  //   });
  //   return unsubscribe;
  // }, [navigation]);
  useEffect(() => {

    if (
      moment(entryDate).isBefore(moment(), "day") ||
      moment(exitDate).isSame(entryDate, "day") ||
      moment(exitDate).isBefore(entryDate, "day")
    ) {
      setNumber_Of_Nights(0);
      return;
    }
    if (!isEntryModalOpened && isExitModalOpened) {
      setNumber_Of_Nights(moment(exitDate).diff(moment(entryDate), "days") + 1);

      return;
    }

    setNumber_Of_Nights(moment(exitDate).diff(moment(entryDate), "days"));
  });

  useFocusEffect(
    React.useCallback(() => {
      SetIsExitModalOpened(false);
      SetIsEntryModalOpened(false);
     
    }, [])
  );

  const Delete = () => {
    setNumber_Of_Nights(0);
    setBreakfast(false);
    setSingle(false);
    setDouble(false);
    setSuite(false);
    setEntryDate(new Date());
    setExitDate(new Date());
  };

  const ChaeckRoomsMarks = () => {
    return singleFlag || doubleFlag || suiteFlag;
  };

  const ChaeckAll = () => {
    if (number_Of_Nights === 0 || !(AmountOfPeople > 0 && AmountOfPeople <= 10)) {
      Alert.alert("Some fields are not filled in Properly");
      return;
    }
    if (ChaeckRoomsMarks()) {
      let rooms_flags = {
        "Single room": singleFlag,
        "Double room": doubleFlag,
        "Suite": suiteFlag,
      };

      // myContext.setRoomsFlags(rooms_flags);
      navigation.navigate("SaveRoom", {
        rooms_flags: rooms_flags,
        number_Of_Nights: number_Of_Nights,
        breakfast: breakfast,
        entryDate: entryDate,
        exitDate: exitDate,
        amountOfPeople: AmountOfPeople,
      });
    } else Alert.alert("Some fields are not filled in Properly");
  };

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Booking</Text>
      <View style={styles.label}>
        <TouchableOpacity style={styles.input} onPress={showDatePickerEntry}>
          <View style={styles.ButtonContainer}>
            <Text style={styles.text}>{"Entry date: " + entry}</Text>

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
            <Text style={styles.text}>{"Exit date: " + exit}</Text>

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
          {number_Of_Nights === 0 ? (
            <Text style={styles.alerts}>*The dates are incorrect* </Text>
          ) : (
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18 }}>
                Amount of nights : {number_Of_Nights}
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
            {!ChaeckRoomsMarks() ? (
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
          onChangeText={(amount) => setAmountOfPeople(amount)}
        />

        <View style={styles.switchContainer}>
          <Switch
            onValueChange={() => {
              setBreakfast(!breakfast);
            }}
            value={breakfast}
          />
          <Text>Include breakfast?</Text>
        </View>
   

        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding:10,
          marginTop:20
        }}>
          <TouchableOpacity style={styles.button} onPress={Delete}>
            <Text>DELETE</Text>
          </TouchableOpacity>
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
      
      fontWeight:'500'
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
