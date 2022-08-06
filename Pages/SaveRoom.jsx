import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardRoom from './CardRoom'
import axios from 'axios'

export default function SaveRoom({ navigation }) {


  const [arrData, SetArrData] = useState([])

  const [single, SetSingle] = useState(0)
  const [double, SetDouble] = useState(0)
  const [suit, SetSuit] = useState(0)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json;charset=utf-8");
  myHeaders.append("Accept", "application/json;charset=utf-8");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
 redirect: 'follow'
  };
  const URL = 'http://localhost:49674/api/Rooms/';


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
    navigation.navigate('Payment', { data: arrData })
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