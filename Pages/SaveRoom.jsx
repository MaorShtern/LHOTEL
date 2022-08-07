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


export default function SaveRoom({ navigation }) {


  const [arrData, SetArrData] = useState([])

  const [single, SetSingle] = useState(0)
  const [double, SetDouble] = useState(0)
<<<<<<< Updated upstream
  const [suit, SetSuit] = useState(0)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json;charset=utf-8");
  myHeaders.append("Accept", "application/json;charset=utf-8");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
 redirect: 'follow'
  };
  const URL = 'http://192.168.1.240:49674/api/Rooms/';


  useEffect(() => {fetchData()}, []);





// }, []);


// export const getUserInfo = (name) => {
//   let username = name.toLowerCase().trim();
//   const URL = `https://api.github.com/users/${username}`;
//   return fetch(URL)
//           .then((res) => res.json());
// }



// const fetchData = async () => {
 
    
//   fetch(URL,{
//     method: 'GET',

//   headers: new Headers({
//   'Content-Type': 'application/json; charset=UTF-8',
// 'Accept':'application/json; charset=UTF-8'})
//   })
//   .then(res => {
//   console.log('res=', res);
//   console.log('res.status', res.status);
//   console.log('res.ok', res.ok);
//   return res.json()
//   })
//   .then(
//   (result) => {
//   console.log("fetch btnFetchGetStudents= ", result);
 
//   },
//   (error) => {
//   console.log("err =", error);
//   });
  
// };

 
const fetchData = async () => {
  
    await fetch(URL,{
          method: 'GET',
      
        headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      'Accept':'application/json; charset=UTF-8'})
        })
      .then(response => response.text())
      .then(result => SetArrData(result.data))// SetArrData(result.data)
      .catch(error => console.log('error', error));
  
  // const resp = await fetch("http://localhost:49674/api/Rooms/GetAvailableRooms");
  // const data = await resp.json();

  // SetArrData(data);
 
};
=======
  const [svit, SetSvit] = useState(0)
  const [arrRoomsData, SetArrRoomsData] = useState([])

  useEffect(() => { FetchData(); }, []);


  //  הפונקציה הזאת היא זאת שתבצע את הקריאה ך-API
  const FetchData = () => {
    // const FetchData = async () => {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
  
      await fetch('http://proj13.ruppin-tech.co.il/api/Rooms', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result.data))
        .catch(error => console.log('error', error));
    }
    // BilldData()
  


  const BilldData = () => {
    let temp = []
    arrRooms.map((per) =>
      temp.push(
        {
          type: per.roomType,
          count: arrRooms.filter((room) => room.roomType === per.roomType).length,
          details: per.details,
          pricePerNight: per.pricePerNight
        }))



    if (singleFlag === false) {
      temp = temp.filter((per) => per.type !== "Single room")
    }
    if (doubleFlag === false) {
      temp = temp.filter((per) => per.type !== "Double room")

    } if (svitFlag === false) {
      temp = temp.filter((per) => per.type !== "Suite")

    }

    let list = temp.filter((ele, ind) => ind === temp.findIndex(
      elem => elem.type === ele.type && elem.type === ele.type))

    SetArrRoomsData(list)

  }


  // useEffect(() => { FetchData(); }, []);
>>>>>>> Stashed changes

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
    navigation.navigate('Payment', { data: arrData,Single:single,Double : double,Suit:suit})
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

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Choose a room</Text>
      <CardRoom SetCount={SetCount} roomType="Single" details="Single Room" />
      <CardRoom SetCount={SetCount} roomType="Double" details="Double Room" />
      <CardRoom SetCount={SetCount} roomType="Suit" details="Suit Room" />
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