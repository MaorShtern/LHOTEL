import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ActivityIndicator } from "react-native";
import CardRoom from "./CardRoom";
import AppContext from '../../AppContext';
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";

export default function SaveRoom({ route, navigation }) {


  const myContext = useContext(AppContext);
  let { rooms_flags } = route.params;
  const user = myContext.user
  const roomsReservation = myContext.roomsReservation

  const [loading, SetLoading] = useState(false);
  const [arrRoomsData, SetArrRoomsData] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const GoToLogin = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate("Login")
  };
  useFocusEffect(
    React.useCallback(() => {
      SetLoading(false)
      FetchData()

    }, [route.params])
  );



  const FetchData = async () => {

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch("http://proj13.ruppin-tech.co.il/GetAvailableRooms", requestOptions);
    let rooms = await result.json();
    if (rooms !== null) {
      BilldData(rooms);
      SetLoading(true);
      return;
    }
    FetchData();
  };

  const BilldData = (rooms) => {
    let temp = [];
    rooms.map((per) =>
      temp.push({
        type: per.RoomType,
        count: rooms.filter((room) => room.RoomType === per.RoomType).length,
        details: per.Details,
        pricePerNight: per.PricePerNight,
      })
    );


    let list = temp.filter(
      (ele, ind) => ind === temp.findIndex((elem) => elem.type === ele.type && elem.type === ele.type)
    );


    let array = [];
    for (const [key, value] of Object.entries(rooms_flags)) {
      if (value) {
        let room = list.filter((per) => per.type === key);
        if (room[0] !== undefined) {
          room = room[0];
          array.push(room);
        }
      }
    }
    SetArrRoomsData(array);
  };


  // console.log(rooms_flags)

  const CheckParams = () => {
    let temp = Object.values(rooms_flags)
    if ((temp[0] && roomsReservation.CounterSingle === 0) ||
      (temp[1] && roomsReservation.CounterDouble === 0) ||
      (temp[2] && roomsReservation.CounterSuite === 0)) {
      return true
    }
    return false
  }

  const GoToPayment = () => {

    if (CheckParams()) {
      alert("Not all the rooms you requested are marked with the desired quantity")
      return
    }


    if (Object.keys(user).length === 0) {
      toggleModal()
      return
    }

    let rooms_amounts = {
      "Single room": roomsReservation.CounterSingle,
      "Double room": roomsReservation.CounterDouble,
      "Suite": roomsReservation.CounterSuite,
    };


    let the_data = [];
    for (const [key, value] of Object.entries(rooms_amounts)) {
      for (let i = 0; i < arrRoomsData.length; i++) {
        if (arrRoomsData[i].type === key) {
          if (arrRoomsData[i].count < value) {
            Alert.alert("Some fields are not filled in Properly");
            return;
          }
          let room_temp = {
            type: arrRoomsData[i].type,
            count: value,
            details: arrRoomsData[i].details,
            pricePerNight: arrRoomsData[i].pricePerNight,
          };
          the_data.push(room_temp);
        }
      }
    }
    let sum = 0
    for (let i = 0; i < the_data.length; i++) {
      let pricePerNight = the_data[i].pricePerNight;
      let count = the_data[i].count;
      let tempToatal = pricePerNight * count

      sum += tempToatal;
      if (roomsReservation.Breakfast) sum += 70 * count
    }

    roomsReservation.totalSum = sum
    navigation.navigate("Credit", { the_data: the_data });
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


  let roomsList = arrRoomsData.map((room, index) => (
    <CardRoom
      key={index}
      SetCount={SetCount}
      roomType={room.type}
      details={room.details}
      pricePerNight={room.pricePerNight}
      count={room.count}
    />
  ));



  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Choose a room</Text>

      <Modal isVisible={isModalVisible}>
        <View style={{
          flex: 1,
          backgroundColor: "#90A9A4",
          width: '90%',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#fff',
          marginVertical: 150,
          alignSelf: 'center'
        }}>
          <Text style={{ fontSize: 30, paddingVertical: 50, width: 180, alignSelf: 'center', textAlign: 'center' }}>Please log in to continue placing the order</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 50, }}>
            <Button title="go to login" onPress={GoToLogin} />
            <Button title="cancel" onPress={toggleModal} />
          </View>

        </View>
      </Modal>
      <View>{loading ? roomsList : <Spinner />}</View>
      <View style={styles.save}>
        {loading ? (
          <TouchableOpacity style={styles.button} onPress={GoToPayment}>
            <Text>Save</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}
const Spinner = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  save: {
    paddingBottom: 30,
    paddingTop: 20,
    width: 100,
    alignSelf: "center",
  },
  button: {
    flex: 1,
    width: 100,
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
