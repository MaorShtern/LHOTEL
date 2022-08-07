import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
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
      if (value) {
        let room = temp.filter((per) => per.type === key)
        room = room[0]
        list.push(room)
      }
    }
    SetArrRoomsData(list)
  }


  const GoToPayment = () => {
 

   let rooms_amounts = {
    'Single room':  single ,
    'Double room':  double ,
    'Suite':  suit 
  }
    console.log(JSON.stringify(arrRoomsData));
    rooms_amounts = Object.fromEntries(Object.entries(rooms_amounts).filter(([key]) => rooms_amounts[key]> 0));
    console.log(rooms_amounts);
let the_data = []
    for (const [key, value] of Object.entries(rooms_amounts)) {
      for (let i = 0; i <arrRoomsData.length; i++) {
        if(arrRoomsData[i].type === key){
          if(arrRoomsData[i].count <value){
            Alert.alert('Some fields are not filled in Properly')
            return;
          }
          arrRoomsData[i].count = value;
          the_data.push(arrRoomsData[i]);

        }
      
    }
  }
   navigation.navigate('Payment', { data: the_data,rooms_amounts})
      // if (value) {
      //   let room = temp.filter((per) => per.type === key)
      //   room = room[0]
      //   list.push(room)
      // }

  //     arrRoomsData.map(function(room,index){
  //     return text + ' ' + array2[index]
  //  })
    // let room =  rooms_amount.filter((room_amount) => room_amount !== 0)
    // console.log(rooms_amount);
    // let room  =   Object.keys(rooms_amounts).map((room_type) => {
    //   rooms_amounts[room_type] === 0; // you can update on any condition if you like, this line will update all dictionary object values. 
 
    // });
    // for (const [key, value] of Object.entries(rooms_amounts)) {
    //   if (value) {
    //     let room = temp.filter((per) => per.type === key)
    //     room = room[0]
    //     list.push(room)
    //   }
  //   Object.keys(rooms_amounts).
  // filter((key) => key.includes('Name')).
  // reduce((cur, key) => { return Object.assign(cur, { [key]: obj[key] })}, {});
  //  Object.entries(rooms_amounts).filter(([key]) => rooms_amounts[key]>0).reduce((cur,key)=>{
  //   { console.log(Object.assign(cur, { [key]: rooms_amounts[key] })); }
  //  });
  // console.log(Object.fromEntries(Object.entries(rooms_amounts).filter(([key]) => rooms_amounts[key]> 0)));

    // Object.entries(rooms_amounts).map((room_type)=>console.log(room_type))
    // rooms_amounts.fi
  //   rooms_amounts.reduce((result, filter) => {
  //     result[filter.name] > 0;
  //     console.log(result)
  // });
    // for (const [key, value] of Object.entries(rooms_amount)) {
    //   console.log(index);
    //   // if (value) {
    //   //   let room = temp.filter((per) => per.type === key)
    //   //   room = room[0]
    //   //   list.push(room)
    //   }
    // arrRoomsData.map(function(room,index){
    //   return text + ' ' + array2[index]
  //  })
    // navigation.navigate('Payment', { data: arrRoomsData, Single: single, Double: double, Suit: suit })
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
        SetSuit(number)
        break;
    }
  }


  let roomsList = arrRoomsData.map((per,index) => <CardRoom key={index} SetCount={SetCount} roomType={per.type}
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