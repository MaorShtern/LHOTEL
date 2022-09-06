import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  Animated,
  ScrollView,
  StatusBar,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../images";
import { Ionicons } from "@expo/vector-icons";
import { CustomCard } from "./CustomCard";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Checkbox, TextInput } from "react-native-paper";
import moment from "moment";
export default function NewReservation({ route, navigation }) {
  const nav = useNavigation();
  const DATA = [
    {
      id: 1,
      name: "Save",
      backgroundColor: "#6BC5E8",
      imagesrc: images.save,
      onPressHandler: () => {
        nav.navigate("schedule", {
          title: "Save",
          imagesrc: images.save,
          backgroundColor: "#6BC5E8",
        });
      },
    },
    {
      id: 2,
      name: "trashCan",
      backgroundColor: "#3A9EC2",
      imagesrc: images.trashCan,
      onPressHandler: () => {
        nav.navigate("schedule", {
          title: "trashCan",
          imagesrc: images.trashCan,
          backgroundColor: "#3A9EC2",
        });
      },
    },
  ];

  const [text, setText] = useState("");
  const [totalSum, SetTotalSum] = useState(0);
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardDate, SetCardData] = useState("");
  const [cardCVC, SetCardCVC] = useState("");

  const [user, SetUser] = useState([]);
  const [userDB, SetUserDB] = useState([]);

  const [flagEnrty, setFlagEntry] = useState(false);
  const [flagExit, setFlagExit] = useState(false);

  const [entryDate, setEntryDate] = useState(new Date());
  const [exitDate, setExitDate] = useState(new Date());

  const [singleFlag, setSingle] = useState(false);
  const [doubleFlag, setDouble] = useState(false);
  const [suiteFlag, setSuite] = useState(false);
  const [number_Of_Nights, setNumber_Of_Nights] = useState(0);
  const [breakfast, setreakfast] = useState(false);

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
    setEntryDate(date);
    hideDatePickerEntry();
  };

  const handleConfirmExitDate = (date) => {
    setExitDate(date);
    hideDatePickerExit();
  };

  const entry = moment(entryDate).format("DD/MM/YYYY");
  const exit = moment(exitDate).format("DD/MM/YYYY");

  useEffect(() => {
    let tomorrow = new Date(entryDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (exitDate.toDateString() === tomorrow.toDateString()) {
      setNumber_Of_Nights(1);
      return;
    }
    if (moment(exitDate).diff(moment(tomorrow), "days") <= 0) {
      setNumber_Of_Nights(0);
    } else {
      setNumber_Of_Nights(moment(exitDate).diff(moment(entryDate), "days"));
    }
  });

  const ChaeckRoomsMarks = () => {
    return singleFlag || doubleFlag || suiteFlag;
  };

  const CheackDates = (date) => {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  };

  const ChaeckAll = () => {
    // navigation.navigate('SaveRoom')
    if (
      CheackDates(entryDate) ||
      CheackDates(exitDate) ||
      number_Of_Nights === 0
    ) {
      Alert.alert("Error selecting dates");
      return;
    }
    if (ChaeckRoomsMarks()) {
      let rooms_flags = {
        "Single room": singleFlag,
        "Double room": doubleFlag,
        Suite: suiteFlag,
      };
      navigation.navigate("SaveRoom", {
        rooms_flags: rooms_flags,
        number_Of_Nights: number_Of_Nights,
        breakfast: breakfast,
        entryDate: entry,
        exitDate: exit,
      });
    } else Alert.alert("Some fields are not filled in Properly");
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     readData();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // const Calculate_Final_Amount = () => {
  //   let sum = 0
  //   // console.log("sum: "+sum);
  //   // console.log("the_data: " + the_data);
  //   for (let i = 0; i < the_data.length; i++) {
  //     let pricePerNight = the_data[i].pricePerNight;
  //     let count = the_data[i].count;
  //     let tempToatal = pricePerNight * count

  //     sum += tempToatal;
  //   }
  //   SetTotalSum(sum)
  // }

  const Delete = () => {
    setName("");
    setCardNum("");
    SetCardData("");
    SetCardCVC("");
    setNumber_Of_Nights(0);
    setreakfast(false);
    setSingle(false);
    setDouble(false);
    setSuite(false);
    setEntryDate(new Date());
    setExitDate(new Date());
  };

  const fixCardDate = (text) => {
    if (text.length == 2 && cardDate.length == 1) {
      text += "/";
    } else if (text.length == 2 && cardDate.length == 3) {
      text = text.substring(0, text.length - 1);
    }
    SetCardData(text);
  };

  const CheackDate = () => {
    let courentYear = new Date().getFullYear();
    let courentMonth = new Date().getMonth() + 1;
    let month = cardDate.substring(0, 2);
    let year = "20" + cardDate.substring(3, 5);

    if (
      cardDate.length === 5 &&
      year >= courentYear &&
      month > courentMonth &&
      month >= "01" &&
      month <= "12"
    ) {
      return true;
    } else return false;
  };
  // !CheackDate()
  const isValidCardDetails = () => {
    return cardNum.length !== 16 || cardCVC.length !== 3 ? false : true;
  };

  // const readData = async () => {
  //   try {
  //     const user = await AsyncStorage.getItem('@user');
  //     // const arrUsers = await AsyncStorage.getItem('@storage_Key_0');
  //     // console.log("user: " + user !== null);

  //     if (user !== null) {
  //       // console.log("user: " + user);
  //       SetUser(JSON.parse(user))
  //       Calculate_Final_Amount()
  //     }
  //     //   let email = JSON.parse(user)
  //     //   let arr = JSON.parse(arrUsers)
  //     //   let userDetails = arr.filter((per) => per.email === email)
  //     //   id = userDetails[0].id
  //     //   cheackForUser(id)
  //     //   SetUser(userDetails[0])
  //     // }
  //     // Calculate_Final_Amount()
  //   } catch (e) {
  //     alert('Failed to fetch the input from storage');
  //   }
  // };

  const CustomerToDataBS = async (value) => {
    console.log(value);
    // const requestOptions = {
    //   method: 'POST',
    //   body: JSON.stringify(value),
    //   headers: { 'Content-Type': 'application/json' }
    // };
    // let result = await fetch('http://proj13.ruppin-tech.co.il/api/Customers', requestOptions);
    // let customerResult = await result.json();

    // if (customerResult)
    //   navigation.navigate('ConfirmationPage', {
    //     id: value.customerID, the_data: the_data,
    //     number_Of_Nights: number_Of_Nights, breakfast: breakfast, entryDate: entryDate, exitDate: exitDate,
    //     total: totalSum, Name: name, CardNum: cardNum
    //   })
    // else
    //   alert("CustomerToDataBS")
  };

  const cheackForUser = async (value) => {
    console.log(value);

    // const requestOptions = {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' }
    // };
    // let result = await fetch('http://proj13.ruppin-tech.co.il/api/Customers/' + value, requestOptions);
    // let deleteResult = await result.json();

    // if (deleteResult !== null) {

    //   SetUserDB(deleteResult)
    //   return
    // }
    // else {
    //   cheackForUser(value)
    // }
  };

  const AlterCustomer = async (value) => {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(value),
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch(
      "http://proj13.ruppin-tech.co.il/api/Customers",
      requestOptions
    );
    let customerResult = await result.json();
    if (customerResult)
      navigation.navigate("ConfirmationPage", {
        id: value.customerID,
        the_data: the_data,
        number_Of_Nights: number_Of_Nights,
        breakfast: breakfast,
        entryDate: entryDate,
        exitDate: exitDate,
        total: totalSum,
        Name: name,
        CardNum: cardNum,
      });
    else alert("AlterCustomer");
  };

  const ConfirmInformation = () => {
    if (name.length > 1 && isValidCardDetails()) {
      // console.log(user);
      let newCustomer = {
        calssName: Customer,
        fields: {
          customerID: user.customerID,
          customerType: 1,
          firstName: user.firstName,
          lastName: user.lastName,
          mail: user.mail,
          phoneNumber: user.phoneNumber,
          cardHolderName: name,
          creditCardDate: cardDate,
          threeDigit: cardCVC,
        },
      };

      // // console.log(newCustomer);
      // navigation.navigate("ConfirmationPage", {
      //   id: newCustomer.customerID,
      //   the_data: the_data,
      //   number_Of_Nights: number_Of_Nights,
      //   breakfast: breakfast,
      //   entryDate: entryDate,
      //   exitDate: exitDate,
      //   total: totalSum,
      //   Name: name,
      //   CardNum: cardNum,
      // });

      if (userDB !== null && userDB.length !== 0) {
        AlterCustomer(newCustomer.fields);
      } else {
        CustomerToDataBS(newCustomer.fields);
      }
    } else Alert.alert("The card details are incorrect");
  };

  const transportItem = ({ item }) => {
    return (
      <CustomCard>
        <View
          style={{
            flexDirection: "row",
            overflow: "hidden",
            justifyContent: "space-between",
            padding: 15,
            backgroundColor: item.backgroundColor,
            marginHorizontal: 26,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <View style={{ justifyContent: "space-between" }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
              {item.name}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                width: 70,
                padding: 5,
                borderRadius: 6,
                marginTop: 50,
              }}
              onPress={item.onPressHandler}
            >
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Select
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={{ position: "absolute", right: -15, bottom: 2 }}
              source={item.imagesrc}
            ></Image>
          </View>
        </View>
      </CustomCard>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.hotelback}
        resizeMode="cover"
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      />

      <View style={styles.bottomview}>
        <Text
          style={{
            paddingTop: 40,
            paddingLeft: 35,
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          New reservation
        </Text>

        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 20,
            paddingTop: 10,
          }}
        >
          <ScrollView>
            <TouchableOpacity
              style={styles.input}
              onPress={showDatePickerEntry}
            >
              <View style={styles.ButtonContainer}>
                <Text style={styles.text}>{"Entry date: " + entry}</Text>

                <Image style={styles.icon} source={images.calendar} />
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

                <Image style={styles.icon} source={images.calendar} />
              </View>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={flagExit}
              mode="date"
              onConfirm={handleConfirmExitDate}
              onCancel={hideDatePickerExit}
            />
            <View>
              {CheackDates(entryDate) ||
              CheackDates(exitDate) ||
              number_Of_Nights === 0 ? (
                <Text style={styles.alerts}>*The dates are incorrect* </Text>
              ) : null}
            </View>
            <View>
              {CheackDates(entryDate) ||
              CheackDates(exitDate) ||
              number_Of_Nights === 0 ? null : (
                <Text> Number of nights: {number_Of_Nights} </Text>
              )}
            </View>

            <View style={{ paddingVertical: 25 }}>
              <Text style={styles.Text}>Room Type</Text>
              <View style={styles.RadioCheckbox}>
                <View style={styles.Checkbox}>
                  <Checkbox
                    label="Item"
                    status={singleFlag ? "checked" : "unchecked"}
                    onPress={() => {
                      setSingle(!singleFlag);
                    }}
                  />
                  <Text>Single</Text>
                </View>
                <View style={styles.Checkbox}>
                  <Checkbox
                    label="Item"
                    status={doubleFlag ? "checked" : "unchecked"}
                    onPress={() => {
                      setDouble(!doubleFlag);
                    }}
                  />
                  <Text>Double</Text>
                </View>
                <View style={styles.Checkbox}>
                  <Checkbox
                    label="Item"
                    status={suiteFlag ? "checked" : "unchecked"}
                    onPress={() => {
                      setSuite(!suiteFlag);
                    }}
                  />
                  <Text>Suite</Text>
                </View>
              </View>
              <View style={{ paddingVertical: 10 }}>
                {!ChaeckRoomsMarks() ? (
                  <Text style={styles.alerts}>
                    *Must select at least one room type*{" "}
                  </Text>
                ) : null}
              </View>
            </View>

            <View style={styles.switchContainer}>
              <Switch
                onValueChange={() => {
                  setreakfast(!breakfast);
                }}
                value={breakfast}
              />
              <Text>Include breakfast?</Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.sectionTitle}>Customer Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Customer ID "
                autoCapitalize="none"
                onChangeText={(text) => setText(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="First Name "
                autoCapitalize="none"
                onChangeText={(text) => setText(text)}
              />
 
                <TextInput
                style={styles.input}
                placeholder="Last Name "
                autoCapitalize="none"
                onChangeText={(text) => setText(text)}
              />
            
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setText(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                autoCapitalize="none"
                onChangeText={(text) => setText(text)}
              />

              <Text style={styles.SubHeadLine}>Enter payment information</Text>
              <TextInput
                style={styles.input}
                placeholder="Cardholder's name"
                autoCapitalize="none"
                onChangeText={(name) => setName(name)}
              />
              <TextInput
                style={styles.input}
                placeholder="Card's Number"
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={(cardNum) => setCardNum(cardNum)}
              />
              <TextInput
                style={styles.input}
                placeholder={"Card's Date " || cardDate}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={(text) => {
                  fixCardDate(text);
                }}
              />
              <View>
                {!CheackDate() ? (
                  <Text style={styles.alerts}>
                    *The card DATE is incorrect*
                  </Text>
                ) : null}
              </View>
              <TextInput
                style={styles.input}
                placeholder="cvv"
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={(cvv) => SetCardCVC(cvv)}
              />

              <View style={styles.footerStyle}>
                <TouchableOpacity
                  style={styles.footerButtonOne}
                  onPress={Delete}
                >
                  <Text
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    DELETE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.footerButtonTwo}
                  onPress={ConfirmInformation}
                >
                  <Text
                    style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
                  >
                    SUBMIT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topview: {
    marginTop: 60,
    marginHorizontal: 24,
    backgroundColor: "gray",
    flex: 1,
    justifyContent: "space-between",
  },
  welcomemessage: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  searchbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderRadius: 10,
    marginBottom: 65,
  },
  circle: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: "#fff",
  },
  welcomecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomview: {
    flex: 11,
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -40,
  },
  container: {
    flex: 1,
    // backgroundColor: "#000",
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 50,
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
  //   container: {
  //     flex: 1,
  //     marginHorizontal: 20,
  //     marginVertical: 20,
  //     paddingTop: 60,
  //   },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 35,
    // alignSelf: "flex-end",
  },
  sectionTitleV1: {
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    textDecorationLine: "underline",
  },

  SubHeadLine: {
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },

  TextInputContainer: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },

  TextInput: {
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
  },

  Sum: {
    fontSize: 25,
    alignSelf: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 20,
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
  },
  alerts: {
    color: "red",
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
  },

  label: {
    padding: 20,
  },

  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
  },

  RadioCheckbox: {
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
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

  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 10,
  },

  Text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
  },
  icon: {
    width: 30,
    height: 30,

    padding: 20,
  },
  text: {
    height: 50,

    // margin: 3,
    paddingTop: 17,
    paddingLeft: 10,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  footerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
  },
  footerButtonOne: {
    backgroundColor: "#656255",

    padding: 15,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },

  footerButtonTwo: {
    backgroundColor: "#556B2F",

    padding: 15,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

// import * as React from "react";
// import {
//   ImageBackground,
//   View,
//   StyleSheet,
//   Image,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   FlatList,

// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import { images } from "../../images";
// import { Ionicons } from "@expo/vector-icons";
// import { CustomCard } from "./CustomCard";

// export default function Temp({ route, navigation }) {
//   const nav = useNavigation();
//   const DATA = [
//     {
//       id: 1,
//       name: "Save",
//       backgroundColor: "#6BC5E8",
//       imagesrc: images.save,
//       onPressHandler: () => {
//         nav.navigate("schedule", {
//           title: "Save",
//           imagesrc: images.save,
//           backgroundColor: "#6BC5E8",
//         });
//       },
//     },
//     {
//       id: 2,
//       name: "trashCan",
//       backgroundColor: "#3A9EC2",
//       imagesrc: images.trashCan,
//       onPressHandler: () => {
//         nav.navigate("schedule", {
//           title: "trashCan",
//           imagesrc: images.trashCan,
//           backgroundColor: "#3A9EC2",
//         });
//       },
//     },
//   ];
//   const transportItem = ({ item }) => {
//     return (
//       <CustomCard>
//         <View
//           style={{
//             flexDirection: "row",
//             overflow: "hidden",
//             justifyContent: "space-between",
//             padding: 15,
//             backgroundColor: item.backgroundColor,
//             marginHorizontal: 26,
//             marginBottom: 10,
//             borderRadius: 10,
//           }}
//         >
//           <View style={{ justifyContent: "space-between" }}>
//             <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
//               {item.name}
//             </Text>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#fff",
//                 width: 70,
//                 padding: 5,
//                 borderRadius: 6,
//                 marginTop: 50,
//               }}
//               onPress={item.onPressHandler}
//             >
//               <Text style={{ textAlign: "center", fontWeight: "bold" }}>
//                 Select
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <Image
//               style={{ position: "absolute", right: -15, bottom: 2 }}
//               source={item.imagesrc}
//             ></Image>
//           </View>
//         </View>
//       </CustomCard>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={images.hotelloby}
//         resizeMode="cover"
//         style={{

//           flex: 2,
//           justifyContent: "center",
//         }}
//       />

//       <View style={styles.bottomview}>

//         <View style ={{paddingTop:80}}>
//         <TouchableOpacity

//             style={{
//               width: "80%",
//               height: 60,
//               marginHorizontal: 10,
//               marginVertical: 20,
//               alignSelf: "center",
//             }}
//           >
//             <LinearGradient
//               style={[
//                 {
//                   flex: 1,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: 10,
//                 },
//               ]}
//               colors={["#5884ff", "#d3dfff"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//             >
//               <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
//                 New reservation
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//           <TouchableOpacity

//             style={{
//               width: "80%",
//               height: 60,
//               marginHorizontal: 10,
//               marginVertical: 20,
//               alignSelf: "center",
//             }}
//           >
//             <LinearGradient
//               style={[
//                 {
//                   flex: 1,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: 10,
//                 },
//               ]}
//               colors={["#5884ff", "#d3dfff"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//             >
//               <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
//                 Existing reservation
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   topview: {
//     marginTop: 60,
//     marginHorizontal: 24,
//     backgroundColor: "gray",
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   welcomemessage: {
//     color: "#fff",
//     fontSize: 35,
//     fontWeight: "bold",
//   },
//   searchbar: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     alignItems: "center",
//     width: "100%",
//     height: 40,
//     borderRadius: 10,
//     marginBottom: 65,
//   },
//   circle: {
//     borderRadius: 25,
//     height: 50,
//     width: 50,
//     backgroundColor: "#fff",
//   },
//   welcomecontainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   bottomview: {
//     flex: 4,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 50,
//     borderTopRightRadius: 50,
//   marginTop: -40,

//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
// });
