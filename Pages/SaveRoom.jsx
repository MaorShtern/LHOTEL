import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardRoom from './CardRoom'


export default function SaveRoom({ navigation }) {


  const [arrData, SetArrData] = useState([])

  const [single, SetSingle] = useState(0)
  const [double, SetDouble] = useState(0)
  const [svit, SetSvit] = useState(0)


  // useEffect(() => { FetchData(); }, []);

  // const FetchData = async () => {
  //   const requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };

  //   await fetch('http://localhost:49674/api/Rooms', requestOptions)
  //     .then(response => response.text())
  //     .then(result => SetArrData(result.data))
  //     .catch(error => console.log('error', error));
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
      case "Svit":
        SetSvit(number)
        break;
    }
  }



  // console.log("Single: " + single);
  // console.log("Double: " + double);
  // console.log("Svit: " + svit);


  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Choose a room</Text>
      <CardRoom SetCount={SetCount} roomType="Single" details="Single Room" />
      <CardRoom SetCount={SetCount} roomType="Double" details="Double Room" />
      <CardRoom SetCount={SetCount} roomType="Svit" details="Svit Room" />
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