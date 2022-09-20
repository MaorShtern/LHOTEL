import { View, Text, Alert, Image, StyleSheet, TextInput, ScrollView, Switch, TouchableOpacity } from 'react-native'
import React, { useState, useEffect ,useContext} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from 'react-native-paper';
import moment from 'moment';
import AppContext from '../../AppContext';
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../images";
export default function Booking({ navigation }) {
  const myContext = useContext(AppContext);


  const [flagEnrty, setFlagEntry] = useState(false)
  const [flagExit, setFlagExit] = useState(false)
  const [entryDate, setEntryDate] = useState(moment().toDate());
  const [exitDate, setExitDate] = useState(
    moment(entryDate).add(1, "days").toDate()
  );

  const [isEntryModalOpened, SetIsEntryModalOpened] = useState(false);
  const [isExitModalOpened, SetIsExitModalOpened] = useState(false);
  const [singleFlag, setSingle] = useState(false)
  const [doubleFlag, setDouble] = useState(false)
  const [suiteFlag, setSuite] = useState(false)
  const [number_Of_Nights, setNumber_Of_Nights] = useState(0)
  const [breakfast, setreakfast] = useState(false);

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

    setEntryDate(date)
    hideDatePickerEntry()
  };

  const handleConfirmExitDate = (date) => {
    setExitDate(date)
    hideDatePickerExit()
  };

  const entry = moment(entryDate).format("DD/MM/YYYY")
  const exit = moment(exitDate).format("DD/MM/YYYY")
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


  // useEffect(() => {
  //   let tomorrow = new Date(entryDate);
  //   tomorrow.setDate(tomorrow.getDate() + 1)
  //   if (exitDate.toDateString() === tomorrow.toDateString()) {
  //     setNumber_Of_Nights(1)
  //     return;
  //   }
  //   if (moment(exitDate).diff(moment(tomorrow), "days") <= 0) {
  //     setNumber_Of_Nights(0)
  //   } else {
  //     setNumber_Of_Nights(moment(exitDate).diff(moment(entryDate), "days"))
  //   }
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setSingle(false)
  //     setDouble(false)
  //     setSuite(false)
      
  //   });
  // })


  const Delete = () => {
    setNumber_Of_Nights(0)
    setreakfast(false);
    setSingle(false)
    setDouble(false)
    setSuite(false)
    setEntryDate(new Date())
    setExitDate(new Date())
  }

  const ChaeckRoomsMarks = () => {
    return singleFlag || doubleFlag || suiteFlag;
  }




  const CheackDates = (date) => {

   // return new Date(date.toDateString()) < new Date(new Date().toDateString());

  }



  const ChaeckAll = () => {

    if (CheackDates(entryDate) || CheackDates(exitDate) || number_Of_Nights === 0) {
      Alert.alert('Error selecting dates')
      return;

    }
    if (ChaeckRoomsMarks()) {
      let rooms_flags = {
        'Single room': singleFlag,
        'Double room': doubleFlag,
        'Suite': suiteFlag
      }
     
      myContext.setRoomsFlags(rooms_flags)
      navigation.navigate('SaveRoom', {
        number_Of_Nights: number_Of_Nights, breakfast: breakfast,
        entryDate: entry, exitDate: exit,amountOfPeople:AmountOfPeople
      })
    }
    else
      Alert.alert('Some fields are not filled in Properly')
  }


  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Booking</Text>
      <View style={styles.label}>
      <TouchableOpacity
               style={styles.input}
              onPress={showDatePickerEntry}
            >
              <View style={styles.ButtonContainer}>
                <Text style={styles.text}>{"Entry date: " + entry}</Text>

                <Image style={{width:50,height:50}} source={images.calendar} />
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={flagEnrty}
              mode="date"
              onConfirm={handleConfirmEnteryDate}
              onCancel={hideDatePickerEntry}
            />

            <TouchableOpacity  style={styles.input} onPress={showDatePickerExit}>
              <View style={styles.ButtonContainer}>
                <Text style={styles.text}>{"Exit date: " + exit}</Text>

                <Image style={{width:50,height:50}} source={images.calendar} />
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

            <TextInput
              style={{
                paddingHorizontal: 20,
                marginHorizontal: 10,
                marginVertical: 10,
              }}
              label="Amount Of people"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(amount) => setAmountOfPeople(amount)}
            />

        {/* <View style={{ height: 10 }}></View>
        <TouchableOpacity style={styles.button} onPress={showDatePickerEntry} >
          <Text>{"Entry date: " + entry}</Text>
        </TouchableOpacity> */}

        {/* <DateTimePickerModal
          isVisible={flagEnrty}
          mode="date"
          onConfirm={handleConfirmEnteryDate}
          onCancel={hideDatePickerEntry} />
        <View style={{ height: 20 }}></View> */}
{/* 
        <TouchableOpacity style={styles.button} onPress={showDatePickerExit} >
          <Text>{"Exit date: " + exit}</Text>
        </TouchableOpacity> */}
{/* 
        <DateTimePickerModal
          isVisible={flagExit}
          mode="date"
          onConfirm={handleConfirmExitDate}
          onCancel={hideDatePickerExit} /> */}
        {/* <View>
          {CheackDates(entryDate) || CheackDates(exitDate) || number_Of_Nights === 0 ? (
            <Text style={styles.alerts}>*The dates are incorrect* </Text>)
            : null}
        </View> */}
        {/* <View>
          <View style={{ height: 10 }}></View>
          {CheackDates(entryDate) || CheackDates(exitDate) || number_Of_Nights === 0 ? null : <Text > Number of nights: {number_Of_Nights} </Text>}
        </View>
        <View style={{ height: 10 }}></View> */}
        {/* <View>
        <TextInput keyboardType='numeric' placeholder="Card's Number" style={styles.TextInput} onChangeText={(number) => SetAmount_Of_People(number)}>{amount_Of_People}</TextInput>
          <View style={{ height: 10 }}></View>
        </View> */}
        <View>
          <Text style={styles.Text}>Room Type</Text>
          <View style={styles.RadioCheckbox}>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={singleFlag ? 'checked' : 'unchecked'} onPress={() => setSingle(!singleFlag)} />
              <Text>Single</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={doubleFlag ? 'checked' : 'unchecked'} onPress={() => setDouble(!doubleFlag)} />
              <Text>Double</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox label="Item" status={suiteFlag ? 'checked' : 'unchecked'} onPress={() => setSuite(!suiteFlag)} />
              <Text>Suite</Text>
            </View>
          </View>
          <View>
            {!ChaeckRoomsMarks() ? (
              <Text style={styles.alerts}>*Must select at least one room type* </Text>)
              : null}
          </View>

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
  text: {
    height: 50,

    // margin: 3,
    paddingTop: 17,
    paddingLeft: 10,
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
,
input: {
  height: 50,
  margin: 12,
  paddingVertical:30,
  paddingHorizontal:10,
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