import React, { useEffect, useState, useContext } from "react";
import Room from "../Class/Room";
import AppContext from "../../AppContext";
import CardRoom from "../Customer/CardRoom";
import { useFocusEffect } from "@react-navigation/native";
import {ImageBackground,View,StyleSheet,Image,Text,TouchableOpacity,ScrollView,StatusBar,Switch,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";

// import { Dropdown } from "react-native-element-dropdown";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
import { TextInput } from "react-native-paper";
import moment from "moment";

export default function NewReservation({ navigation }) {
  const [visible, setVisible] = useState(false);

  const myContext = useContext(AppContext);

  const [single, SetSingle] = useState(0);
  const [double, SetDouble] = useState(0);
  const [suite, SetSuite] = useState(0);
  const [arrRoomsData, SetArrRoomsData] = useState([]);
  const [IDCheck, setIDCheck] = useState("");
  const [CustomerID, setCustomerID] = useState("");
  const [Mail, setMail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [flagEnrty, setFlagEntry] = useState(false);
  const [flagExit, setFlagExit] = useState(false);
  const [entryDate, setEntryDate] = useState(moment().toDate());
  const [exitDate, setExitDate] = useState(
    moment(entryDate).add(1, "days").toDate()
  );

  const [isEntryModalOpened, SetIsEntryModalOpened] = useState(false);
  const [isExitModalOpened, SetIsExitModalOpened] = useState(false);
  const [number_Of_Nights, setNumber_Of_Nights] = useState(0);
  const [AmountOfPeople, setAmountOfPeople] = useState(0);
  const [breakfast, setreakfast] = useState(false);

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
  const entry = moment(entryDate).format("DD/MM/YYYY");
  const exit = moment(exitDate).format("DD/MM/YYYY");

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
      FetchData();
      SetIsExitModalOpened(false);
      SetIsEntryModalOpened(false);
    }, [])
  );

  const CheackDates = (date) => {
    // return new Date(date.toDateString()) < new Date(new Date().toDateString());
  };

  const Delete = () => {
    SetIsExitModalOpened(false);
    SetIsEntryModalOpened(false);
    setNumber_Of_Nights(0);
    setEntryDate(moment().toDate());
    setExitDate(moment(entryDate).add(1, "days").toDate());
  };

  // const CheckCardDate = () => {
  //   const CardDateRegex = /^(0[1-9]|1[0-2])\/([2][2-9])$/;
  //   return CardDateRegex.test(CreditCardDate);
  // };

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
    let result = await fetch("http://proj13.ruppin-tech.co.il/GetDBCustomerById",requestOptions);
    let user = await result.json();
    if (user !== null) {
      setCustomerID(IDCheck);
      setMail(user.Mail);
      setFirstName(user.FirstName);
      setLastName(user.LastName);
      setPhoneNumber(user.PhoneNumber);
      myContext.setIsUserExist(true); //עדכון סטטוס משתמש אם קיים בסטייט הגלובאלי
    }
  };


  const ConfirmInformation = () => {
   
    let newReservation = {
      CustomerID: CustomerID,
      EmployeeID: myContext.employee.EmployeeID,
      CustomerType: 1,
      FirstName: FirstName,
      LastName: LastName,
      Mail: Mail,
      PhoneNumber: PhoneNumber,
      EntryDate: entryDate,
      ExitDate: exitDate,
      CounterSingle: single,
      CounterDouble: double,
      CounterSuite: suite,
      AmountOfPeople: AmountOfPeople,
      Breakfast : breakfast,
      NumberOfNights :number_Of_Nights
    };
  
    navigation.navigate("Credit", { ReservationDetails: newReservation });
  };

  const FetchData = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch("http://proj13.ruppin-tech.co.il/GetAvailableRooms",requestOptions);
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
        SetSingle(number);
        break;
      case "Double room":
        SetDouble(number);
        break;
      case "Suite":
        SetSuite(number);
        break;
    }
  };
  
  const BilldData = (rooms) => {
    console.log(rooms);
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

            <Text style={styles.HeadLine}>Choose a room</Text>
            <View>{roomsList}</View>

            <View style={styles.switchContainer}>
              <Switch
                onValueChange={() => {
                  setreakfast(!breakfast);
                }}
                value={breakfast}
              />
              <Text style={{ fontSize: 18 }}>Include breakfast?</Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.sectionTitle}>Customer Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Customer ID "
                keyboardType="numeric"
                value={CustomerID}
                onChangeText={(text) => setCustomerID(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="First Name "
                value={FirstName}
                onChangeText={(text) => setFirstName(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Last Name "
                value={LastName}
                onChangeText={(text) => setLastName(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                value={Mail}
                onChangeText={(text) => setMail(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={PhoneNumber}
                keyboardType="numeric"
                onChangeText={(text) => setPhoneNumber(text)}
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
                  <Text
                    style={{ color: "#000", fontSize: 25, fontWeight: "bold" }}
                  >
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
