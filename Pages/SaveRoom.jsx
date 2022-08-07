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

  let { singleFlag, doubleFlag, suitFlag, number_Of_Nights, breakfast, enteryDate, exitDate } = route.params

  // const [arrData, SetArrData] = useState([])

  const [single, SetSingle] = useState(0)
  const [double, SetDouble] = useState(0)
  const [suit, SetSuit] = useState(0)

  const [arrRoomsData, SetArrRoomsData] = useState([])


  useEffect(() => { FetchData() }, []);


  //  הפונקציה הזאת היא זאת שתבצע את הקריאה ך-API
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

    // await fetch('http://proj13.ruppin-tech.co.il/api/Rooms', requestOptions)
    //   .then(response => response.json())
    //   .then(result => SetArrRoomsData(result))
    //   // .then(result => () => { return result })
    //   .catch(error => console.log('error', error));
  }

  // BilldData()



  const BilldData = (rooms) => {

    console.log("rooms: " + JSON.stringify(rooms));

    // while (arrRoomsData === null || arrRoomsData === []) {
    //   await FetchData()
    // }

    // if (arrRoomsData !== null || arrRoomsData !== [])
    //   console.log("arrRoomsData: " + JSON.stringify(arrRoomsData));
    // else
    // console.log("arrRoomsData: " + JSON.stringify(arrRoomsData));

    // while (arrRoomsData === null || arrRoomsData === []) {
    //   let temp = await FetchData()
    //   if (temp === null || temp === [])
    //     console.log("arrRoomsData: " + JSON.stringify(temp));
    // }


    // while (arrRoomsData == null || arrRoomsData == []) {
    //   FetchData()
    // }
    // console.log("arrRoomsData: " + JSON.stringify(arrRoomsData));



    // console.log("arrRoomsData: " + JSON.stringify(arrRoomsData));

    // let temp = []
    // arrRooms.map((per) =>
    //   temp.push(
    //     {
    //       type: per.roomType,
    //       count: arrRooms.filter((room) => room.roomType === per.roomType).length,
    //       details: per.details,
    //       pricePerNight: per.pricePerNight
    //     }))



    // if (singleFlag === false) {
    //   temp = temp.filter((per) => per.type !== "Single room")
    // }
    // if (doubleFlag === false) {
    //   temp = temp.filter((per) => per.type !== "Double room")

    // } if (suitFlag === false) {
    //   temp = temp.filter((per) => per.type !== "Suite")

    // }

    // let list = temp.filter((ele, ind) => ind === temp.findIndex(
    //   elem => elem.type === ele.type && elem.type === ele.type))

    // SetArrRoomsData(list)

  }


  // useEffect(() => { FetchData(); }, []);

  // const FetchData = async () => {
  //   const requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };


  // await fetch('http://localhost:49674/api/Rooms/GetAvailableRooms', requestOptions)
  //   .then(response =>  console.log(response.text()))
  //   .then(result => SetArrData(result.data))// SetArrData(result.data)
  //   .catch(error => console.log('error', error));
  // }




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



  // console.log("Single: " + single);
  // console.log("Double: " + double);
  // console.log("Suit: " + suit);
  // console.log("arr: " + JSON.stringify(arrData));

  // console.log("arrRoomsData: " + JSON.stringify(arrRoomsData));
  // console.log(JSON.stringify(arrRoomsData) !== null);



  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Choose a room</Text>
      <CardRoom SetCount={SetCount} roomType="Single" details="Single Room" />
      <CardRoom SetCount={SetCount} roomType="Double" details="Double Room" />
      <CardRoom SetCount={SetCount} roomType="Suit" details="Suit Room" />
      <View style={styles.save}>
        <TouchableOpacity style={styles.button} onPress={BilldData} >
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