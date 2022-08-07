import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardRoom from './CardRoom'



const arrRooms = [{ roomNumber: 3, roomType: "Single room", pricePerNight: 100, exitDate: "2022-07-25T00:00:00", details: "A personal room adapted for a single person" },
{ roomNumber: 4, roomType: "Single room", pricePerNight: 100, exitDate: "2022-07-25T00:00:00", details: "A personal room adapted for a single person" },
{ roomNumber: 6, roomType: "Double room", pricePerNight: 300, exitDate: "2022-07-25T00:00:00", details: "A double room suitable for two people" },
{ roomNumber: 8, roomType: "Suite", pricePerNight: 500, exitDate: "2022-07-20T00:00:00", details: "A suite designed to accommodate an amount of about 3 to 10 people" },
{ roomNumber: 10, roomType: "Suite", pricePerNight: 500, exitDate: "2022-07-11T00:00:00", details: "A suite designed to accommodate an amount of about 3 to 10 people" },
{ roomNumber: 5, roomType: "Double room", pricePerNight: 300, exitDate: "2021-10-10T00:00:00", details: "A double room suitable for two people" },
{ roomNumber: 9, roomType: "Suite", pricePerNight: 500, exitDate: "2021-07-08T00:00:00", details: "A suite designed to accommodate an amount of about 3 to 10 people" },
{ roomNumber: 7, roomType: "Double room", pricePerNight: 300, exitDate: "2021-06-12T00:00:00", details: "A double room suitable for two people" }]


export default function SaveRoom({ route, navigation }) {

  let { rooms_flags, number_Of_Nights, breakfast, enteryDate, exitDate } = route.params


  const [single, SetSingle] = useState(0)
  const [double, SetDouble] = useState(0)
  const [suit, SetSuit] = useState(0)

  const [arrRoomsData, SetArrRoomsData] = useState([])

  useEffect(() => { FetchData() }, []);

  
  const FetchData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch('http://proj13.ruppin-tech.co.il/api/Rooms', requestOptions);
    let rooms = await result.json();
    if (rooms !== null) {
      SetArrRoomsData(rooms)
      BilldData(rooms)
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
          count: arrRooms.filter((room) => room.roomType === per.roomType).length,
          details: per.roomType,
          pricePerNight: per.pricePerNight
        }))

    let list = []

    for (const [key, value] of Object.entries(rooms_flags)) {
      if (value === true) {
        let room = temp.filter((per) => per.type === key)
        room = room[0]
        list.push(room)
      }
    }
    SetArrRoomsData(list)
  }


  const GoToPayment = () => {
    navigation.navigate('Payment', { data: arrRoomsData, Single: single, Double: double, Suit: suit })
  }


  const SetCount = (number, roomType) => {
    switch (roomType) {
      case "Single":
        SetSingle(number)
        break;
      case "Double":
        SetDouble(number)
        break;
      case "Suit":
        SetSuit(number)
        break;
    }
  }


  let roomsList = arrRoomsData.map((per) => <CardRoom key={per.type} SetCount={SetCount} roomType={per.type}
    details={per.details} count={per.count} />)

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Choose a room</Text>
      <View>
        {roomsList}
      </View>
      <View style={styles.save}>
        <TouchableOpacity style={styles.button} onPress={GoToPayment} >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

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
})