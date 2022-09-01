import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from "react-native";
import CardRoom from './CardRoom'


export default function SaveRoom({ route, navigation }) {

  let { rooms_flags, number_Of_Nights, breakfast, entryDate, exitDate } = route.params 



  // console.log("rooms_flags :" + rooms_flags); 
  // console.log("number_Of_Nights :" + number_Of_Nights); 
  // console.log("breakfast :" + breakfast); 
  // console.log("entryDate :" + entryDate); 
  // console.log("exitDate :" + exitDate); 



  const [single, SetSingle] = useState(0)
  const [double, SetDouble] = useState(0)
  const [suite, SetSuite] = useState(0)
  const [loading, SetLoading] = useState(false)
  const [arrRoomsData, SetArrRoomsData] = useState([])

  useEffect(() => { FetchData() }, []);


  const FetchData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch('http://proj13.ruppin-tech.co.il/GetAvailableRooms', requestOptions);
    let rooms = await result.json();
    if (rooms !== null) {
      // console.log("rooms: " + JSON.stringify(rooms));
      BilldData(rooms)
      SetLoading(true)
      return
    }
    FetchData()

  }



  const BilldData = (rooms) => {

    let temp = []
    rooms.map((per) =>
      temp.push(
        {
          type: per.roomType,
          count: rooms.filter((room) => room.roomType === per.roomType).length,
          details: per.details,
          pricePerNight: per.pricePerNight
        }))

    //  console.log("temp: " + JSON.stringify(temp));
    let list = temp.filter((ele, ind) => ind === temp.findIndex(
      elem => elem.type === ele.type && elem.type === ele.type))

    let array = []
    // console.log("list" + JSON.stringify(arrRoomsData));
    for (const [key, value] of Object.entries(rooms_flags)) {
      if (value) {
        let room = list.filter((per) => per.type === key)
        if (room[0] !== undefined) {
          room = room[0]
          array.push(room)
        }
      }
    }
    SetArrRoomsData(array)
  }


  const GoToPayment = () => {

    let rooms_amounts = {
      'Single room': single,
      'Double room': double,
      'Suite': suite
    }
    // console.log(JSON.stringify(arrRoomsData))
    let the_data = []
    for (const [key, value] of Object.entries(rooms_amounts)) {
      for (let i = 0; i < arrRoomsData.length; i++) {
        if (arrRoomsData[i].type === key) {
          if (arrRoomsData[i].count < value) {
            Alert.alert('Some fields are not filled in Properly')
            return;
          }
          let room_temp = {
            type: arrRoomsData[i].type,
            count: value,
            details: arrRoomsData[i].details,
            pricePerNight: arrRoomsData[i].pricePerNight
          }
          the_data.push(room_temp);
        }
      }
    }


    // console.log("the_data:" + JSON.stringify(the_data));

    navigation.navigate('Payment', {
      the_data: the_data, number_Of_Nights: number_Of_Nights,
      breakfast: breakfast, entryDate: entryDate, exitDate: exitDate
    })
  }


  const SetCount = (number, roomType) => {
    switch (roomType) {
      case "Single room":
        SetSingle(number)
        break;
      case "Double room":
        SetDouble(number)
        break;
      case "Suite":
        SetSuite(number)
        break;
    }
  }


  let roomsList = arrRoomsData.map((per, index) => <CardRoom key={index} SetCount={SetCount} roomType={per.type}
    details={per.details} count={per.count} />)

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Choose a room</Text>
      <View>
        {loading ? roomsList : <Spinner />}
      </View>
      <View style={styles.save}>
        {loading ?
          <TouchableOpacity style={styles.button} onPress={GoToPayment} >
            <Text>Save</Text>
          </TouchableOpacity> : null}

        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')} >
          <Text>Save</Text>
        </TouchableOpacity> */}

      </View>
    </ScrollView>
  )
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
    alignSelf: 'center',
  },
  button:
  {
    flex: 1,
    width: 100,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10

  }
})