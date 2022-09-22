import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Dimensions, Animated, ScrollView, StatusBar, } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { images } from "../../images";
import moment from "moment/moment";
import AppContext from "../../AppContext";



const workerCardsArr = [
  { code: 999, Description: "General", title: "Exit shift", pic: images.exit_shift, routeNavigation: "" },
  { code: 999, Description: "General", title: "Enter shift", pic: images.enter_shift, routeNavigation: "" },
  { code: 1, Description: "Manager", title: "Employees Management", pic: images.workers_management, routeNavigation: "EmployeesManagement" },
  { code: 1, Description: "Manager", title: "Current Shift", pic: images.shift, routeNavigation: "Shift", },
  { code: 1, Description: "Manager", title: "Reports", pic: images.reports, routeNavigation: "Reports", },
  { code: 2, Description: "Receptionist", title: "Add charge", pic: images.add_charge, routeNavigation: "AddCharge", },
  { code: 2, Description: "Receptionist", title: "Check In", pic: images.checkIn, routeNavigation: "CheckIn", },
  { code: 2, Description: "Receptionist", title: "Check Out", pic: images.checkOut, routeNavigation: "CheckOut", },
  { code: 3, Description: "Room service", title: "Tasks", pic: images.tasks, routeNavigation: "Tasks", },
];


const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function WorkerMenu({ navigation }) {

  //  const { UserArr,HandelNavigation } = route.params;

  const myContext = useContext(AppContext);
  const myEmployee = myContext.employee
  const [currentUserArr, SetCurrentUserArr] = useState([]);

  useEffect(() => { GetCardsByRole(); 
  }, []);


  const GetCardsByRole = () => {
    let arrayTempCards = [];
    // console.log(myEmployee);
    try {
      if (myEmployee.Description === "Manager") {
        arrayTempCards = workerCardsArr;
        // console.log("Manager");
      }
      else {
        arrayTempCards = workerCardsArr.filter(
          (workerCard) =>
            workerCard.Description === myEmployee.Description ||
            workerCard.Description === "General"
        );
      }
    } catch (error) {
      Alert.alert("error");
    }
    // console.log(arrayTempCards);
    SetCurrentUserArr(arrayTempCards);
  };

  // console.log(employee);


  const ClockIn = async (today) => {
    try {
      // let user = CreateUser()
      //       user = JSON.stringify(user.fields)
      //       console.log(user)
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
          id: myEmployee.EmployeeID,
          time: today
        }),
        headers: { 'Content-Type': 'application/json' }
      };
      let result = await fetch('http://proj13.ruppin-tech.co.il/ClockIn', requestOptions);
      if (result) {
        alert("ClockIn at : " + today);
        // navigation.navigate('Login')
      }
    } catch (error) {
      alert(error)
    }
  }

  const ClockOut = async (today) => {
    try {
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
          id: myEmployee.EmployeeID,
          time: today
        }),
        headers: { 'Content-Type': 'application/json' }
      };

      // console.log(requestOptions.body);
      let result = await fetch('http://proj13.ruppin-tech.co.il/ClockOut', requestOptions);
      if (result) {
        alert("ClockOut at : " + today);
        // navigation.navigate('Login')
      }
    } catch (error) {
      alert(error)
    }
  }

  const HandelCardClick = (title) => {
    let today = new Date();
    let dateString = moment(today).format('HH:mm')
    if (title === "Enter shift")
      ClockIn(dateString)
    else if (title === "Exit shift")
      ClockOut(dateString)
    // alert("end shift at : " + today.getHours() + ":" + today.getMinutes());
  };

  const GetItem = ({ item, index }) => {
    // console.log(item.routeNavigation);
    return (
      <TouchableOpacity
        style={styles.item}
        key={index}
        // onPress={() => item.routeNavigation === "" ? HandelCardClick(item.title) : console.log(item.routeNavigation)}>
         onPress={() => item.routeNavigation === "" ? HandelCardClick(item.title) : navigation.navigate(item.routeNavigation)}> 
        <Image style={{ width: 60, height: 60 }} source={item.pic} />
        <Text style={styles.itemText}>{item.title}</Text>
        {/* <Text>{item.toString()}</Text> */}
      </TouchableOpacity>
    );
  };

  //onPress={()=> { doAnimation(closeState,1,250),setInfo(false)}}

  // console.log(currentUserArr);

  // barStyle="dark-content" backgroundColor="#fff"
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <FlatList
        data={currentUserArr}
        renderItem={GetItem}
        keyExtarctor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,

  },

  item: {
    backgroundColor: "rgba(35,100,168, 0.2)",
    alignItems: "center",
    justifyContent: "center",

    height: WIDTH / numColumns,
    flex: 1,
    margin: 10,
  },
  itemText: {
    color: "black",
    fontSize: 20,
  },
  Image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
    padding: 5,
  },
  Text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    textDecorationLine: "underline",
    textAlign: "right",
    paddingLeft: 30,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonRooms: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    padding: 10,
  },
  user_Name: {
    backgroundColor: "black",
    alignItems: "center",
    textAlign: "center",
  },
  innerText: {
    color: "white",
    padding: 5,
  },
});
