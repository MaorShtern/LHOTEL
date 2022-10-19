import {
  ImageBackground,
  View,
  Text,
  StyleSheet,

  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useEffect, useContext, useReducer } from "react";
// import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-modern-datepicker";
import moment from "moment";
import { images } from "../../images";
import Products from "./Products";
import { ScrollView } from "react-native-virtualized-view";
import { useFocusEffect } from "@react-navigation/native";
import AppContext from "../../AppContext";


const RequestType = [
  { label: "Room Cleaning", value: "Room Cleaning" },
  { label: "Room Service", value: "Room Service" },
  { label: "Change of towels", value: "Change of towels" },
  { label: "Refill mini bar", value: "Refill mini bar" },
  { label: "Product purchase", value: "Product purchase" },
];

export default function RoomService({ navigation }) {
  const myContext = useContext(AppContext);
  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [date, setDate] = useState(moment());
  const [dropdown, setDropdown] = useState(null);
  const [request, SetRequest] = useState("");
  const [room, SetRoom] = useState(0);
  const [flagDate, setFlagDate] = useState(false);
  const [flagTime, setFlagTime] = useState(false);
  const [mode, setMode] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");

  const bill = myContext.bill;
  const user = myContext.user;
  const [isDisplayDate, setShow] = useState(false);

  const [task, SetTask] = useState({
    TaskCode: null,
    EmployeeID: -1,
    TaskName: "",
    RoomNumber: 0,
    StartDate: moment().format("YYYY-MM-DD"),
    StartTime: moment().format("HH:MM"),
    EndTime: null,
    TaskStatus: "Open",
    Description: "",
  });
  const Rooms = bill.rooms.map((room) => {
    return {
      label: JSON.stringify(room.RoomNumber),
      value: JSON.stringify(room.RoomNumber),
    };
  });

  const showMode = (currentMode) => {
    setShow(!isDisplayDate);
    //  setMode(currentMode);
  };
  const displayDatepicker = () => {
    showMode("calendar");
  };

  // useEffect(() => {
  //   SetRequest("");
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      SetRequest("");
      SetRoom(0);
      SetTask({
        TaskCode: null,
        EmployeeID: -1,
        TaskName: "",
        RoomNumber: 0,
        StartDate: moment().format("YYYY-MM-DD"),
        StartTime: moment().format("HH:MM"),
        EndTime: null,
        TaskStatus: "Open",
        Description: "",
      });
    }, [])
  );

  const hideDate = () => {
    setFlagDate(false);
  };

  const showDate = () => {
    setFlagDate(true);
  };

  const handleDate = (date) => {
    setDate(date);
    hideDate();
  };

  const hideTime = () => {
    setFlagTime(false);
  };

  const showTime = () => {
    setFlagTime(true);
  };

  const handleTime = (time) => {
    // let t = moment(time)
    // console.log(moment(time).format('HH:mm'));
    task.StartTime = moment(time).format("HH:mm");
    // let stringTime = "0";
    // if (time.getHours() <= 9) stringTime += time.getHours();
    // else stringTime = time.getHours();

    // stringTime += ":";

    // if (time.getMinutes() <= 9) stringTime += "0" + time.getMinutes();
    // else stringTime += time.getMinutes();

    setTime(task.StartTime);
    hideTime();
  };

  // const FetchCustomerReservationFromDB = async () => {
  //   if (user.CustomerID !== undefined) {
  //     try {
  //       const requestOptions = {
  //         method: "PUT",
  //         body: JSON.stringify({
  //           id: user.CustomerID,
  //         }),
  //         headers: { "Content-Type": "application/json" },
  //       };
  //       let result = await fetch(
  //         "http://proj13.ruppin-tech.co.il/GetOccupiedRoomsByCustomerId",
  //         requestOptions
  //       );
  //       let customerReservation = await result.json();
  //       // console.log(JSON.stringify(user))
  //       if (customerReservation !== null) {
  //         bill.CustomerType = customerReservation[0].CustomerType;
  //         bill.EntryDate = customerReservation[0].EntryDate;
  //         bill.ExitDate = customerReservation[0].ExitDate;
  //         bill.FirstName = customerReservation[0].FirstName;
  //         bill.LastName = customerReservation[0].LastName;
  //         bill.Mail = customerReservation[0].Mail;
  //         bill.PhoneNumber = customerReservation[0].PhoneNumber;
  //         bill.CustomerID = customerReservation[0].CustomerID;
  //         bill.BillNumber = customerReservation[0].BillNumber;
  //         bill.BillDate = customerReservation[0].BillDate;
  //         bill.AmountOfPeople = customerReservation[0].AmountOfPeople;
  //         bill.Breakfast = customerReservation[0].Breakfast;
  //         bill.NumberOfNights = customerReservation[0].NumberOfNights;
  //         bill.AmountOfPeople = customerReservation[0].AmountOfPeople;
  //         if (bill.rooms.length === 0)
  //           customerReservation.map((room) =>
  //             bill.rooms.push({
  //               RoomNumber: room.RoomNumber,
  //               PricePerNight: room.PricePerNight,
  //             })
  //           );
  //         forceUpdate();
  //         // console.log(JSON.stringify(customerReservation));
  //       }
  //       // else FetchCustomerReservationFromDB()
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  // };

  const CheckValues = () => {
    if (room !== 0 && request !== "")
      return true;
    else
      return false;
  };


  const SaveOrder = async () => {
    try {
      if (!CheckValues()) {
        alert("The fields are not filled correctly")
        return
      }
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      };
      // console.log(requestOptions.body);
      let result = await fetch("http://proj13.ruppin-tech.co.il/AddNewTask", requestOptions);
      // console.log(result);
      if (result) {
        alert("details successfully saved");
        navigation.goBack();
      }
    } catch (error) {
      alert(error);
    }
    // alert(
    //   "date: " +
    //   date.getFullYear() +
    //   "-" +
    //   (date.getMonth() + 1) +
    //   "-" +
    //   date.getDate()
    // );
    // alert("time: " + time);
    // navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>LHotel Room Service</Text>
      <View style={styles.label}>
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            data={Rooms}
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            placeholder="Room Number"
            value={task.RoomNumber}
            onChange={(room) => {
              task.RoomNumber = room.value;
              SetRoom(room.value);
            }}
          />
        </View>
        <View>
          {room === 0 ? (
            <Text style={styles.alerts}>*Must select room* </Text>
          ) : null}
        </View>

        {/* <View>
      {request === "" ? (
        <Text style={styles.alerts}>*Must select request type* </Text>
      ) : null}
    </View> */}
        <View style={styles.ProdutsStyle}>
          {request === "Product purchase" ? (
            <View>
              <Products
                navigation={navigation}
                RoomNumber={task.RoomNumber}
                SetRequest={SetRequest}
              />
            </View>
          ) : (
            <View>
              <View style={styles.container}>
                <Dropdown
                  style={styles.dropdown}
                  data={RequestType}
                  // search
                  labelField="label"
                  valueField="value"
                  placeholder="Request type"
                  value={task.TaskName}
                  onChange={(request) => { SetRequest(request.value), (task.TaskName = request.value); }}
                />
              </View>
              <View>
                {request === "" ? (
                  <Text style={styles.alerts}>*Must select request type* </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.input}
                onPress={displayDatepicker}
              >
                <View style={styles.ButtonContainer}>
                  <Text style={styles.text}>
                    {selectedDate === ""
                      ? "select date"
                      : moment(selectedDate).format("DD/MM/YYYY")}
                  </Text>
                  <Image style={styles.icon} source={images.calendar} />
                </View>
              </TouchableOpacity>

              {isDisplayDate && (
                <DatePicker
                  options={{
                    backgroundColor: "rgb(202, 232, 228)",
                    mainColor: "#000",
                  }}
                  mode="calendar"
                  minuteInterval={30}
                  style={{ borderRadius: 10 }}
                  current={moment(date).format("YYYY-MM-DD").toString()}
                  minimumDate={moment(bill.EntryDate)
                    .format("YYYY-MM-DD")
                    .toString()}
                  maximumDate={moment(bill.ExitDate)
                    .format("YYYY-MM-DD")
                    .toString()}
                  onSelectedChange={(date) => {
                    (task.StartDate = moment(date).format("YYYY-MM-DD")),
                      setSelectedDate(date),
                      setShow(!isDisplayDate);
                  }}
                />
              )}
              {/* setSelectedDate(date) */}
              <View style={styles.timeStyle}>
                <TouchableOpacity onPress={showTime} style={styles.Btn}>
                  <TextInput.Icon
                    name="clock"
                    size={25}
                    style={{ paddingRight: 5 }}
                  />
                  <Text style={{ fontSize: 18 }}>{"Time  " + time}</Text>

                  {/* <Text>{"To Do By: " + task.EndTime}</Text> */}
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.button} onPress={showTime}>
                  <Text>{"Time: " + time}</Text>
                </TouchableOpacity> */}
                <DateTimePickerModal
                  isVisible={flagTime}
                  mode="time"
                  onConfirm={handleTime}
                  onCancel={hideTime}
                />

              </View>
              <Text style={styles.Text}>Description </Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(desc) => (task.Description = desc)}
                />
              </View>

              <View style={styles.ButtonContainer}>
                <TouchableOpacity>
                  <Text style={styles.button} onPress={() => SaveOrder()}>
                    ORDER
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  textAreaContainer: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  Btn: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 40,
  },
  label: {
    flex: 2,
    padding: 20,
  },

  dropdown: {
    marginTop: 20,
  },
  alerts: {
    color: "red",
  },

  button: {
    backgroundColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    paddingRight: 60,
    paddingLeft: 60,
    marginRight: 60

  },
  input: {
    height: 50,
    marginTop: 15,
    margin: 5,
    borderWidth: 0.2,
  },
  icon: {
    width: 30,
    height: 30,

    padding: 20,
  },
  text: {
    height: 50,
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

  timeStyle: {
    alignSelf: 'flex-end',
    padding: 10,

  },
});


{/* <TextInput
style={styles.textArea}
underlineColorAndroid="transparent"
placeholder="Type something"
placeholderTextColor="grey"

// numberOfLines={10}
multiline={true}
onChangeText={(desc) => (task.Description = desc)}
/> */}


{
  /* <View>

{ bill.CustomerID === "" ?
  <View style={styles.container}>
    <ImageBackground
      source={images.hotelback}
      resizeMode="cover"
      style={{
        flex: 2,
        justifyContent: "flex-end",
      }}
    >
      <Text style={styles.header}>LHOTEL</Text>
    </ImageBackground>

    <View style={styles.bottomview}>
      <View style={{ paddingTop: 80 }}>
        <Text
          style={{ alignSelf: "center", fontWeight: "bold", fontSize: 25 }}
        >
          Did you check in? 
        </Text>
        <Text
          style={{ alignSelf: "center", fontWeight: "bold", fontSize: 25 ,paddingVertical:20}}
        >
         For Lhotel room service 
        </Text>
       
        <TouchableOpacity
          onPress={() => FetchCustomerReservationFromDB()}
          style={{
            width: "70%",
            height: 60,
            marginHorizontal: 10,
            marginVertical: 20,
            alignSelf: "center",
            borderRadius: 25,
            shadowOpacity: 0.3,
            shadowRadius: 25,
            elevation: 5,
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
            CLICK HERE
            </Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </View>
  </View>: */
}
//   <ScrollView>
// <Text style={styles.HeadLine}>LHotel Room Service</Text>
// <View style={styles.label}>
// <View style={styles.container}>
//   <Dropdown
//     style={styles.dropdown}
//     data={Rooms}
//     // search
//     searchPlaceholder="Search"
//     labelField="label"
//     valueField="value"
//     placeholder="Room Number"
//     value={task.RoomNumber}
//     onChange={(room) => {
//       task.RoomNumber = room.value;
//       // SetRoom(room.value);
//     }}
//   />
// </View>
// <View>
//   {task.RoomNumber === 0 ? (
//     <Text style={styles.alerts}>*Must select room* </Text>
//   ) : null}
// </View>

// {/* <View>
//   {request === "" ? (
//     <Text style={styles.alerts}>*Must select request type* </Text>
//   ) : null}
// </View> */}
// <View style={styles.ProdutsStyle}>
//   {request === "Product purchase" ? (
//     <View>
//       <Products navigation={navigation} RoomNumber={task.RoomNumber} SetRequest={SetRequest} />
//     </View>
//   ) : (
//     <View>
//       <View style={styles.container}>
//         <Dropdown
//           style={styles.dropdown}
//           data={RequestType}
//           // search
//           labelField="label"
//           valueField="value"
//           placeholder="Request type"
//           value={task.TaskName}
//           onChange={(request) => {
//             SetRequest(request.value), (task.TaskName = request.value);
//           }}
//         />
//       </View>
//       <View>
//         {request === "" ? (
//           <Text style={styles.alerts}>*Must select request type* </Text>
//         ) : null}
//       </View>
//       <TouchableOpacity
//         style={styles.input}
//         onPress={displayDatepicker}
//       >
//         <View style={styles.ButtonContainer}>
//           <Text style={styles.text}>
//             {selectedDate === ""
//               ? "select date"
//               : moment(new Date(selectedDate)).format("DD/MM/YYYY")}
//           </Text>
//           <Image style={styles.icon} source={images.calendar} />
//         </View>
//       </TouchableOpacity>

//       {isDisplayDate && (
//         <DatePicker
//           options={{
//             backgroundColor: "rgb(202, 232, 228)",
//             mainColor: "#000",
//           }}
//           mode="calendar"
//           minuteInterval={30}
//           style={{ borderRadius: 10 }}
//           current={moment(date).format("YYYY-MM-DD").toString()}
//           minimumDate={moment()
//             .weekday(-7)
//             .format("YYYY-MM-DD")
//             .toString()}
//           maximumDate={moment()
//             .weekday(7)
//             .format("YYYY-MM-DD")
//             .toString()}
//           onSelectedChange={(date) => {
//             setSelectedDate(date), setShow(!isDisplayDate);
//           }}
//         />
//       )}

//       <View>
//         <TouchableOpacity style={styles.button} onPress={showTime}>
//           <Text>{"Time: " + time}</Text>
//         </TouchableOpacity>
//         <DateTimePickerModal
//           isVisible={flagTime}
//           mode="time"
//           onConfirm={handleTime}
//           onCancel={hideTime}
//         />
//         <View style={{ height: 20 }}></View>
//       </View>

//       <Text style={styles.Text}>Description </Text>
//       <View style={styles.textAreaContainer}>
//         <TextInput
//           style={styles.textArea}
//           underlineColorAndroid="transparent"
//           placeholder="Type something"
//           placeholderTextColor="grey"
//           numberOfLines={10}
//           multiline={true}
//           onChangeText={(desc) => (task.Description = desc)}
//         />
//       </View>
//       <View style={styles.ButtonContainer}>
//         <TouchableOpacity>
//           <Text style={styles.button} onPress={() => SaveOrder()}>
//             ORDER
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )}
// </View>
// </View>
// </ScrollView>

// }

// </View>
