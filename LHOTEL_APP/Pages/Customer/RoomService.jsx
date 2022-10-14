import {  View,  Text,  StyleSheet,  TextInput,  TouchableOpacity,  Button,  Image,} from "react-native";
import React, { useState, useEffect, useContext } from "react";
// import { ScrollView } from "react-native-gesture-handler";
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

  const [date, setDate] = useState(new Date());
  const [dropdown, setDropdown] = useState(null);
  const [request, SetRequest] = useState("");
  const [room, SetRoom] = useState("");
  const [flagDate, setFlagDate] = useState(false);
  const [flagTime, setFlagTime] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");

  const bill = myContext.bill;
  const [isDisplayDate, setShow] = useState(false);
  const [task, SetTask] = useState({
    EmployeeID: null,
    TaskName: "",
    RoomNumber: 0,
    StartTime: moment(new Date()).format("HH:MM"),
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
    setMode(currentMode);
  };
  const displayDatepicker = () => {
    showMode("calendar");
  };

  useEffect(() => {
    SetRequest("");
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      SetTask({
        EmployeeID: null,
        TaskName: "",
        RoomNumber: 0,
        StartTime: moment(new Date()).format("HH:mm"),
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

  const CheckValues = () => {
   
    if (room !== "") return true;
    else return false;
  };
  const SaveOrder = async () => {
    try {
      // if(!CheckValues())
      // {
      //     alert("The fields are not filled correctly")
      //     return
      // }
      console.log(task);
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      };
      // console.log(requestOptions.body);
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/AddNewTask",
        requestOptions
      );
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
            // search
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            placeholder="Room Number"
            value={task.RoomNumber}
            onChange={(room) => {
              task.RoomNumber = room.value;
              // SetRoom(room.value);
            }}
          />
        </View>
        <View>
          {task.RoomNumber === 0 ? (
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
              <Products navigation={navigation} RoomNumber={task.RoomNumber} SetRequest={SetRequest} />
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
                  onChange={(request) => {
                    SetRequest(request.value), (task.TaskName = request.value);
                  }}
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
                      : moment(new Date(selectedDate)).format("DD/MM/YYYY")}
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
                  minimumDate={moment()
                    .weekday(-7)
                    .format("YYYY-MM-DD")
                    .toString()}
                  maximumDate={moment()
                    .weekday(7)
                    .format("YYYY-MM-DD")
                    .toString()}
                  onSelectedChange={(date) => {
                    setSelectedDate(date), setShow(!isDisplayDate);
                  }}
                />
              )}

              <View>
                <TouchableOpacity style={styles.button} onPress={showTime}>
                  <Text>{"Time: " + time}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={flagTime}
                  mode="time"
                  onConfirm={handleTime}
                  onCancel={hideTime}
                />
                <View style={{ height: 20 }}></View>
              </View>

              <Text style={styles.Text}>Description </Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
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
  label: {
    flex: 2,
    padding: 20,
  },

  dropdown: {
    backgroundColor: "white",

    // borderBottomColor: "gray",
    // borderBottomWidth: 0.5,
    marginTop: 20,
  },
  alerts: {
    color: "red",
  },
  ButtonContainer: {
    alignItems: "center",
    paddingTop: 10,
  },

  button: {
    backgroundColor: "gray",
    // padding: 10,
    // borderRadius: 10,

    padding: 10,
    paddingRight: 60,
    paddingLeft: 60,
    borderRadius: 3,
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
  ProdutsStyle: {
    // paddingTop:17,
  },
});
{
  /* <View>
                <TouchableOpacity style={styles.button} onPress={showDate} >
                    <Text>{"Date: " + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={flagDate}
                    mode="date"
                    onConfirm={handleDate}
                    onCancel={hideDate} />
                <View style={{ height: 20 }}></View>
            </View> */
}

{
  /* <TouchableOpacity style={styles.input} onPress={displayDatepicker}>
            <Text style={styles.text}>
            {selectedDate===""? "select date":moment(new Date(selectedDate)).format("DD/MM/YYYY")}
            {"  "}
            <Image style={styles.icon} source={images.calendar} /> 
            <View></View>
          
             
             
            </Text>
          </TouchableOpacity> */
}
