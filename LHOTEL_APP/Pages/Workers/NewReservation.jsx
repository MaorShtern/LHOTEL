import React, { useEffect, useState, useContext } from "react";
import Room from "../Class/Room";
import AppContext from "../../AppContext";
import CardRoom from "../Customer/CardRoom";
import { useFocusEffect } from "@react-navigation/native";
import { ImageBackground, View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, StatusBar, Switch, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
import { TextInput } from "react-native-paper";
import moment from "moment";
// import { loadAsync } from "expo-font";

export default function NewReservation({ navigation }) {
  const [visible, setVisible] = useState(false);

  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation;
  const [arrRoomsData, SetArrRoomsData] = useState([]);
  const [IDCheck, setIDCheck] = useState("");
  const [flagEnrty, setFlagEntry] = useState(false);
  const [flagExit, setFlagExit] = useState(false);


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
    // setEntryDate(date);
    hideDatePickerEntry();
  };

  const handleConfirmExitDate = (date) => {
    roomsReservation.ExitDate = date
    // setExitDate(date);
    hideDatePickerExit();
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    SetIsExitModalOpened(false);
  };

  const handleOk = () => {
    setVisible(false);
    GetDBCustomerById();
  };

  useEffect(() => {
    if (
      moment(roomsReservation.EntryDate).isBefore(moment(), "day") ||
      moment(roomsReservation.ExitDate).isSame(roomsReservation.EntryDate, "day") ||
      moment(roomsReservation.ExitDate).isBefore(roomsReservation.EntryDate, "day")
    ) {
      setNumberOfNights(0);
      // roomsReservation.NumberOfNights = 0
      return;
    }
    if (!isEntryModalOpened && isExitModalOpened) {
      setNumberOfNights(moment(roomsReservation.ExitDate).diff(moment(roomsReservation.EntryDate), "days") + 1);
      // roomsReservation.NumberOfNights = moment(roomsReservation.ExitDate).diff(moment(roomsReservation.EntryDate), "days") + 1;
      return;
    }
    // roomsReservation.NumberOfNights =moment(roomsReservation.ExitDate).diff(moment(roomsReservation.EntryDate), "days");
    setNumberOfNights(moment(roomsReservation.ExitDate).diff(moment(roomsReservation.EntryDate), "days"));
  });
  useFocusEffect(
    React.useCallback(() => {
      FetchData();
      SetIsExitModalOpened(false);
      SetIsEntryModalOpened(false);
    }, [])
  );


  const GetDBCustomerById = async () => {
    // פונקציה אסינכרונית לטובת קבלת נתוני משתמש לפי ת.ז המתקבל במידה וקיים
    //  ומילוי אוטומטי שלהם בטופס הזמנה חדשה

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        Customer_ID: IDCheck,
      }),
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch("http://proj13.ruppin-tech.co.il/GetDBCustomerById", requestOptions);
    let user = await result.json();
    if (user !== null) {
      roomsReservation.CustomerID = IDCheck;
      roomsReservation.Mail = user.Mail;
      roomsReservation.FirstName = user.FirstName;
      roomsReservation.LastName = user.LastName;
      roomsReservation.PhoneNumber = user.PhoneNumber;
      myContext.setIsUserExist(true); //עדכון סטטוס משתמש אם קיים בסטייט הגלובאלי
    }
  };


  const CheckRooms = () => {
    if (roomsReservation.CounterSingle === 0 && roomsReservation.CounterDouble === 0 &&
      roomsReservation.CounterSuite === 0) {
      return true
    }
    return false
  }


  const CheckParams = () => {
    if ((roomsReservation.CustomerID === "" && roomsReservation.CustomerID.length) &&
      roomsReservation.FirstName === "" &&
      roomsReservation.LastName === "" &&
      (roomsReservation.Mail === "" && roomsReservation.Mail.includes("@gmail.com")) &&
      (roomsReservation.PhoneNumber === "" && roomsReservation.PhoneNumber.length === 10)) {
      return true;
    }
    return false

  }

  // console.log(roomsReservation);

  const ConfirmInformation = () => {


    if (CheckRooms()) {
      alert("You must choose at least one room")
      return
    }

    if (CheckParams()) {
      alert("Not all customer details are filled in properly")
      return
    }

    // console.log(roomsReservation);

    roomsReservation.NumberOfNights = numberOfNights
    roomsReservation.Breakfast = breakfast
    let rooms_amounts = {
      "Single room": roomsReservation.CounterSingle,
      "Double room": roomsReservation.CounterDouble,
      "Suite": roomsReservation.CounterSuite,
    };


    let sum = 0
    for (const [key, value] of Object.entries(rooms_amounts)) {
      for (let i = 0; i < arrRoomsData.length; i++) {
        if (arrRoomsData[i].RoomType === key) {
          if (arrRoomsData[i].count < value) {
            Alert.alert("Some fields are not filled in Properly");
            return;
          }
          let pricePerNight = arrRoomsData[i].PricePerNight;
          let count = value;
          let tempToatal = pricePerNight * count
          sum += tempToatal;
          if (roomsReservation.Breakfast) sum += 70 * count
        }
      }
    }

    roomsReservation.totalSum = sum
    navigation.navigate("Credit");
  };

  const FetchData = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch("http://proj13.ruppin-tech.co.il/GetAvailableRooms", requestOptions);
    let rooms = await result.json();
    if (rooms !== null) {
      // console.log("rooms: " + JSON.stringify(rooms));
      BilldData(rooms);

      return;
    }
    FetchData();
  };

  const SetCount = (number, roomType) => {
    switch (roomType) {
      case "Single room":
        roomsReservation.CounterSingle = number
        break;
      case "Double room":
        roomsReservation.CounterDouble = number
        break;
      case "Suite":
        roomsReservation.CounterSuite = number
        break;
    }
  };

  const BilldData = (rooms) => {
    // console.log(rooms);
    let temp = [];
    rooms.map((room) => {
      let tempRoom = {
        className: Room,
        fields: {
          Details: room.Details,
          PricePerNight: room.PricePerNight,
          RoomNumber: room.RoomNumber,
          RoomType: room.RoomType,
          count: rooms.filter((item) => room.RoomType === item.RoomType).length,
        },
      };

      // temp.push(tempRoom.fields,{count :  rooms.filter((item) => room.RoomType === item.RoomType).length})

      temp.push(tempRoom.fields);
    });
    let list = temp.filter(
      (ele, ind) =>
        ind ===
        temp.findIndex(
          (elem) =>
            elem.RoomType === ele.RoomType && elem.RoomType === ele.RoomType
        )
    );

    SetArrRoomsData(list);
  };
  let roomsList = arrRoomsData.map((room, index) => {
    return (
      <CardRoom
        key={index}
        SetCount={SetCount}
        roomType={room.RoomType}
        details={room.Details}
        count={room.count}
        pricePerNight={room.PricePerNight}
      />
    );
  });



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
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
        <TouchableOpacity onPress={() => showDialog()}>
          <Text style={styles.underLineText}>User exists ?</Text>
        </TouchableOpacity>

        <Dialog.Container visible={visible}>
          <Dialog.Description>Enter customer's ID</Dialog.Description>
          <Dialog.Input
            keyboardType="numeric"
            onChangeText={(id) => setIDCheck(id)}
          />
          <View style={{ flexDirection: "row" }}>
            <Dialog.Button
              style={{ paddingHorizontal: 20 }}
              label="Ok"
              onPress={handleOk}
            />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
          </View>
        </Dialog.Container>

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
                <Text style={styles.text}>{"Entry date: " + moment(roomsReservation.EntryDate).format("DD/MM/YYYY")}</Text>

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
                <Text style={styles.text}>{"Exit date: " + moment(roomsReservation.ExitDate).format("DD/MM/YYYY")}</Text>

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

            <TextInput
              style={{
                paddingHorizontal: 20,
                marginHorizontal: 10,
                marginVertical: 10,
              }}
              label={"Amount Of people: " + roomsReservation.AmountOfPeople}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(amount) => roomsReservation.AmountOfPeople = amount}
            />

            <Text style={styles.HeadLine}>Choose a room</Text>
            <View>{roomsList}</View>

            <View style={styles.switchContainer}>
              <Switch
                onValueChange={() => { setBreakfast(!breakfast); }}
                value={breakfast}
              />
              <Text style={{ fontSize: 18 }}>Include breakfast?</Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.sectionTitle}>Customer Details</Text>
              <TextInput
                style={styles.input}
                placeholder={roomsReservation.CustomerID === undefined?
                "Customer ID: " : "Customer ID: " + roomsReservation.CustomerID}
                // placeholder={"Customer ID: " + roomsReservation.CustomerID}
                keyboardType="numeric"
                onChangeText={(text) => roomsReservation.CustomerID = text}
              />

              <TextInput
                style={styles.input}
                placeholder={roomsReservation.FirstName === undefined?
                  "First Name " : "First Name " + roomsReservation.FirstName}
                // placeholder={"First Name " + roomsReservation.FirstName}
                // value={roomsReservation.FirstName}
                onChangeText={(text) => roomsReservation.FirstName = text}
              />

              <TextInput
                style={styles.input}
                placeholder={roomsReservation.LastName === undefined?
                  "Last Name: " : "Last Name: " + roomsReservation.LastName}
                // placeholder={"Last Name: " + roomsReservation.LastName}
                // value={roomsReservation.LastName}
                onChangeText={(text) => roomsReservation.LastName = text}
              />

              <TextInput
                style={styles.input}
                placeholder={roomsReservation.Mail === undefined?
                  "Email: " : "Email: " + roomsReservation.Mail}

                // placeholder={"Email: " + roomsReservation.Mail}
                autoCapitalize="none"
                // value={roomsReservation.Mail}
                onChangeText={(text) => roomsReservation.Mail = text}
              />
              <TextInput
                style={styles.input}
                placeholder={roomsReservation.PhoneNumber === undefined?
                  "Phone Number: " : "Phone Number: " + roomsReservation.PhoneNumber}
                // placeholder={"Phone Number: " + roomsReservation.PhoneNumber}
                // value={roomsReservation.PhoneNumber}
                keyboardType="numeric"
                onChangeText={(text) => roomsReservation.PhoneNumber = text}
              />
              <TouchableOpacity
                onPress={() => ConfirmInformation()}
                style={{
                  width: "80%",
                  height: 60,
                  marginHorizontal: 10,
                  marginVertical: 20,
                  alignSelf: "center",
                }}
              >
                <LinearGradient
                  style={[
                    {
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    },
                  ]}
                  colors={["#926F34", "#DFBD69"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={{ color: "#000", fontSize: 25, fontWeight: "bold" }}>
                    CONTINUE
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

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
    // textDecorationLine: "underline",
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
    borderRadius: 8,
    borderWidth: 0.2,
    padding: 15,
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
  underLineText: {
    paddingLeft: 40,
    paddingTop: 20,
    fontSize: 22,
    textDecorationLine: "underline",
    color: "black",
    fontWeight: "bold",
  },
  dialogContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
