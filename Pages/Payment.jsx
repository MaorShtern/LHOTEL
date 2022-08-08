import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'


export default function Payment({ route, navigation }) {

  let { the_data, rooms_amounts, number_Of_Nights, breakfast, enteryDate, exitDate } = route.params


  const [totalSum, SetTotalSum] = useState(0)

  const [id, SetID] = useState('')
  const [name, setName] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [cardDate, SetCardData] = useState('')
  const [cardCVC, SetCardCVC] = useState('')


  useEffect(() => {
    Calculate_Final_Amount()
  })


  const Calculate_Final_Amount = () => {
    let sum = 0
    for (let i = 0; i < the_data.length; i++) {
      let temp_room = the_data[i];
      let tempToatal = temp_room.pricePerNight * rooms_amounts[temp_room.type];
      sum += tempToatal;
    }

    SetTotalSum(sum)
  }
  // let sum = 0
  // for (let i = 0; i < data.length; i++) {
  //     sum += data[i].pricePerNight 
  // }
  // SetTotalSum(sum);
  // }

  const Delete = () => {
    SetID('')
    setName('')
    setCardNum('')
    SetCardData('')
    SetCardCVC('')
  }

  const fixCardDate = (text) => {
    if (text.length == 2 && cardDate.length == 1) {
      text += '/'
    } else if (text.length == 2 && cardDate.length == 3) {
      text = text.substring(0, text.length - 1)
    }
    SetCardData(text)
  }

  const CheackCardDate = () => {
    if (cardDate.length != 5)
      return false
    else
      return true
  }



  const ConfirmInformation = () => {
    if (!(id.length < 9 || name <= 1 || cardNum < 12 || !CheackCardDate || cardCVC.length != 3)) {

      navigation.navigate('ConfirmationPage', { total: totalSum, Name: name, CardNum: cardNum, rooms: data })

    }
    else
      Alert.alert("The card details are incorrect")
  }



  // console.log(cardDate);

  return (
    <View>
      <ScrollView>
        <Text style={styles.HeadLine}>Payment</Text>
        <Text style={styles.Sum}>Total to pay:  {JSON.stringify(totalSum)}$</Text>
        <View style={{ height: 30 }}></View>
        <Text style={styles.SubHeadLine}>Enter payment information</Text>
        <View style={styles.TextInputContainer}>
          <TextInput keyboardType='numeric' type="text" placeholder='ID' style={styles.TextInput} onChangeText={(id) => SetID(id)}>{id}</TextInput>
          <View style={{ height: 10 }}></View>
          <TextInput placeholder="Cardholder's name" style={styles.TextInput} onChangeText={(name) => setName(name)}>{name}</TextInput>
          <View style={{ height: 10 }}></View>
          <TextInput keyboardType='numeric' placeholder="Card's Number" style={styles.TextInput} onChangeText={(cardNum) => setCardNum(cardNum)}>{cardNum}</TextInput>
          <View style={{ height: 10 }}></View>
          <TextInput keyboardType='date' placeholder="Card's Date:" style={styles.TextInput} onChangeText={(text) => { fixCardDate(text) }}>{cardDate}</TextInput>
          <View>
            {!CheackCardDate() ? (
              <Text style={styles.alerts}>*The card DATE is incorrect*</Text>)
              : null}
          </View>
          <View style={{ height: 10 }}></View>
          <TextInput keyboardType='numeric' placeholder='cvv' style={styles.TextInput} onChangeText={(cvv) => SetCardCVC(cvv)}>{cardCVC}</TextInput>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={Delete} >
            <Text>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={ConfirmInformation} >
            <Text>SUBMIT</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
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
    textDecorationLine: 'underline'
  },

  SubHeadLine: {
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },

  TextInputContainer: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30
  },

  TextInput: {
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    padding: 10
  },


  Sum: {
    fontSize: 25,
    alignSelf: 'center'
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 20
  },
  button:
  {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10

  },
  alerts: {
    color: 'red'
  }
})