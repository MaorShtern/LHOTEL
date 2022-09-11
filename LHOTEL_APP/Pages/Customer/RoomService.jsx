import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native-virtualized-view';
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-modern-datepicker";
import moment from "moment";
import { images } from "../../images";
import Produts from "./Produts";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from "../Class/Tasks";


const imagesArray = [
  { name: "", image: images.choclatebar }
]

const RequestType = [
  { label: "Room Cleaning", value: "Room Cleaning" },
  { label: "Room Service", value: "Room Service" },
  { label: "Change of towels", value: "Change of towels" },
  { label: "Refill mini bar", value: "Refill mini bar" },
  { label: "Product purchase", value: "Product purchase" },
];

const Rooms = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

export default function RoomService({ navigation }) {


  const [date, setDate] = useState(new Date());

  const [displaymode, setMode] = useState("date");
  const [isDisplayDate, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(!isDisplayDate);
    setMode(currentMode);
  };
  const displayDatepicker = () => {
    showMode("calendar");
  };

  const [dropdown, setDropdown] = useState(null);
  const [request, SetRequest] = useState("");
  const [room, SetRoom] = useState("");

  const [flagDate, setFlagDate] = useState(false);
  const [flagTime, setFlagTime] = useState(false);
  const [description, SetDescription] = useState("")
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");
  const [products, SetProducts] = useState([])
  const [cart, SetCart] = useState([])

  const [totalSum, SetTotalSum] = useState(0);
  const [goodsCount, SetGoodsCount] = useState(0);

  const [user, SetUser] = useState("")

  useEffect(() => { getDBProducts(), GetConnectedUser() }, []);


  const getDBProducts = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      let result = await fetch('http://proj13.ruppin-tech.co.il/GetProducts', requestOptions);
      let temp = await result.json();
      if (temp !== null) {
        let arrayTemp = temp.filter((proc) => proc.Description !== "Room")
        SetProducts(arrayTemp)
        return
      }
      else
        getDBProducts()

    } catch (error) {
      alert(error)
    }
  }


  const AddNewTask = async (value) => {
    // console.log("value: "+ JSON.stringify(value));
    try {
      const requestOptions = {
        method: 'POST',
        body: value,
        headers: { 'Content-Type': 'application/json' }
      };
      let result = await fetch('http://proj13.ruppin-tech.co.il/AddNewTask', requestOptions);
      if (result) {
        alert("The task was successfully saved")
        navigation.navigate("Home")
      }
    } catch (error) {
      alert(error)
    }
  }


  //  עדין לא רשמנו שרת שיכול לבצא את שמירת החיוב אז יש להוסיף אותו
  const Save_Purchase = async (value) => {
    console.log(value);

    try {
      // const requestOptions = {
      //   method: 'GET',
      //   body: value,
      //   headers: { 'Content-Type': 'application/json' }
      // };
      // let result = await fetch('http://proj13.ruppin-tech.co.il/GetProducts', requestOptions);
      // if (result) {
      //   alert("The purchase was made successfully")
      //   navigation.navigate("Home")
      //   // let arrayTemp = temp.filter((proc) => proc.Description !== "Room")
      //   // SetProducts(arrayTemp)
      //   return
      // }
      //   // getDBProducts()

    } catch (error) {
      alert(error)
    }
  }



  const GetConnectedUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      if (value !== null) {
        SetUser(JSON.parse(value).customerID)
      }
    }
    catch (e) {
      alert(e)
    }
  }


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
    let stringTime = "0";
    if (time.getHours() <= 9) stringTime += time.getHours();
    else stringTime = time.getHours();
    stringTime += ":";
    if (time.getMinutes() <= 9) stringTime += "0" + time.getMinutes();
    else stringTime += time.getMinutes();
    setTime(stringTime);
    hideTime();
  };


  const Cal_Price = () => {
    let total = 0;
    // console.log("cart:  " + JSON.stringify(cart));
    for (let index = 0; index < cart.length; index++) {
      let price = cart[index].Price_Per_Unit;
      let count = cart[index].count;
      total += price * count
    }
    return total
  }

  const Cal_Amount = () => {
    let counter = 0;
    // console.log("cart:  " + JSON.stringify(cart));
    for (let index = 0; index < cart.length; index++) {
      let count = cart[index].count;
      counter += count
    }
    return counter
  }

  const Calculate_Final_Amount = () => {
    let total = 0;
    let counter = 0;
    // console.log("cart:  " + JSON.stringify(cart));
    for (let index = 0; index < cart.length; index++) {
      let price = cart[index].Price_Per_Unit;
      let count = cart[index].count;
      total += price * count
      counter += count
    }

    // console.log(total + " " + counter);
    // SetTotalSum(total);
    // SetGoodsCount(counter);

  };

  const AddToCart = (code, count) => {
    let prod = cart.filter((proc) => proc.Product_Code === code)[0]
    if (prod === undefined) {
      prod = products.filter((prod) => prod.Product_Code === code)[0]
      prod.count = count
      cart.push(prod)
    }
    else {
      prod.count = count
    }
  }



  const CheckValues = () => {
    if (room !== "" && request !== "" && time !== "")
      return true
    else
      return false
  }


  const SaveOrder = async () => {

    if (CheckValues) {
      if (request === "Product purchase") {
        return Alert.alert(
          "Order",
          "The amount to be paid is: " + Cal_Price() + " Confirm the purchase?",
          [
            {
              text: "Yes",
              onPress: () => {
                // console.log("cart: " + JSON.stringify(cart));
                // console.log("user: " + JSON.stringify(user));
                let array = []
                for (let index = 0; index < cart.length; index++) {
                  array.push({
                    id: user,
                    room: room,
                    Product_Code: cart[index].Product_Code,
                    amount: cart[index].count,
                    payment_Method: "Credit"
                  })
                }
                // console.log("array: " + JSON.stringify(array));
                Save_Purchase(JSON.stringify(array))
              },
            },
            {
              text: "No",
            },]);
      }
      else {
        let task = {
          className: Task,
          fields: {
            Employee_ID: null, 
            Task_Name: request,
            Description: description,
            Start_Date: date, 
            Start_Time: time, 
            Room_Number: room
          }
        }
        // console.log("task: " +task.fields);
        // console.log("task: " + JSON.parse(task));
        AddNewTask(task)
      }
    }
    else {
      alert("One of the details is incorrect")
    }
  };


  // console.log(products);
  let listProducts = products.map((product) => <Produts key={product.Product_Code}
    item={product} AddToCart={AddToCart} />)


  // console.log("totalSum: " + totalSum + " goodsCount: " + goodsCount);


  // console.log("cart: " + JSON.stringify(cart));


  return (
    <ScrollView>
      <Text style={styles.HeadLine}>LHotel Room Service Order Form</Text>
      <View style={styles.label}>
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            data={Rooms}
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            placeholder={room === "" ? "Room Number" : room}
            value={dropdown}
            onChange={(room) => { SetRoom(room.value) }}
          />
          <View>
            {room === "" ? (<Text style={styles.alerts}>*Must select room* </Text>) : null}
          </View>

        </View>
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            data={RequestType}
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            placeholder={request === "" ? "Request type" : request}
            value={dropdown}
            onChange={(request) => SetRequest(request.value)}
          />
        </View>
        <View>
          {request === "" ? (<Text style={styles.alerts}>*Must select request type* </Text>) : null}
        </View>


        <View style={styles.ProdutsStyle}>
          {request === "Product purchase" ?
            (<View>
              <View>
                {listProducts}
              </View>
              {/* <View>
                <View style={styles.footerContainerStyle}>
                  <View style={styles.totalContainerStyle}>
                    <View style={styles.goodsStyle}>
                      <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
                      <Text>{goodsCount} goods</Text>
                    </View>
                    <View style={styles.totalContainerStyle}>
                      <Text>Total - ${totalSum} </Text>
                    </View>
                  </View>
                </View>
              </View> */}
            </View>) : (
              <View>
                <View>
                  <TouchableOpacity style={styles.input} onPress={displayDatepicker}>
                    <View style={styles.ButtonContainer}>
                      <Text style={styles.text}>
                        {selectedDate === ""
                          ? "select date"
                          : moment(new Date(selectedDate)).format("DD/MM/YYYY")}
                      </Text>
                      <Image style={styles.icon} source={images.calendar} />
                    </View>
                  </TouchableOpacity>
                </View>
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
                    minimumDate={moment().weekday(-7).format("YYYY-MM-DD").toString()}
                    maximumDate={moment().weekday(7).format("YYYY-MM-DD").toString()}
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

                <Text >Description </Text>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles.textArea}
                    // underlineColorAndroid="transparent"
                    // placeholder="Type something"
                    // placeholderTextColor="grey"
                    // numberOfLines={5}
                    multiline={true}
                    onChange={(text) => SetDescription(text)}
                  />
                </View>
              </View>)}
        </View>
        {/* <View style={styles.ProdutsStyle}>
          {request === "Product purchase" ?
            (<View>{listProducts}</View>) : (
              <View>
                <View style={styles.container}>
                  <Dropdown
                    style={styles.dropdown}
                    data={RequestType}
                    searchPlaceholder="Search"
                    labelField="label"
                    valueField="value"
                    placeholder={request === "" ? "Request type" : request}
                    value={dropdown}
                    onChange={(request) => SetRequest(request.value)}
                  />
                </View>
                <View>
                  {request === "" ? (
                    <Text style={styles.alerts}>*Must select request type* </Text>
                  ) : null}
                </View>
                <TouchableOpacity style={styles.input} onPress={displayDatepicker}>
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
                    minimumDate={moment().weekday(-7).format("YYYY-MM-DD").toString()}
                    maximumDate={moment().weekday(7).format("YYYY-MM-DD").toString()}
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
                  />
                </View>
              </View>
            )} */}
      </View>

      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <TouchableOpacity>
          <Text style={styles.button} onPress={SaveOrder}>
            ORDER
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView >
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
  // textArea: {
  //   height: 150,
  //   justifyContent: "flex-start",
  // },
  label: {
    flex: 2,
    padding: 20,
  },

  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
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
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  textStyle: {
    flex: 2,
    justifyContent: "center",
  },
  priceStyle: {
    backgroundColor: "#ddd",
    width: 40,
    alignItems: "center",
    marginTop: 13,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  footerContainerStyle: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  buttonContainerStyle: {
    // flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
  },
  checkoutButtonStyle: {
    backgroundColor: "#f39c12",
    padding: 10,
    // textAlign:'center',
    // paddingRight: 60,
    // paddingLeft: 60,
    // justifyContent: "center",
    borderRadius: 3,
  },
  totalContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
});