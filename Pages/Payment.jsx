import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'



export default function Payment({ route, navigation }) {


  const [totalSum, SetTotalSum] = useState(0)
  const [name, setName] = useState('')
 const [cardNum, setCardNum] = useState('')

  // let { data } = route.params

let { data ,Single,Double,Suit} = route.params
  useEffect(() => {
    Calculate_Final_Amount()
    
  })

  const Calculate_Final_Amount = () => {
  
    let si = 70;
    let d = 100;
    let su = 150;
    let sum = 0
    // for (let i = 0; i < data.length; i++) {
    //     sum += data.pricePerNight 
    // }
    for (let i = 0; i < Single; i++) {
      sum += si 
  }
    for (let i = 0; i < Double; i++) {
      sum += d
  }
  for (let i = 0; i <Suit; i++) {
    sum += su
}
      SetTotalSum(sum)
  }

  const Delete = () => {

  }


  return (
    <View>
      <ScrollView>
        <Text style={styles.HeadLine}>Payment</Text>
        <Text style={styles.Sum}>Total to pay:  {JSON.stringify(totalSum)}$</Text>
        <View style={{ height: 30 }}></View>
        <Text style={styles.SubHeadLine}>Enter payment information</Text>
        <View style={styles.TextInputContainer}>
          <TextInput type="text" placeholder='ID' style={styles.TextInput}></TextInput>
          <View style={{ height: 10 }}></View>
          <TextInput placeholder="Cardholder's name" style={styles.TextInput}  onChangeText={(name) => setName(name)}></TextInput>
          
          <View style={{ height: 10 }}></View>
          <TextInput keyboardType='numeric' placeholder="Card's Number" style={styles.TextInput} onChangeText={(cardNum) => setCardNum(cardNum)}></TextInput>
          <View style={{ height: 10 }}></View>
          <TextInput keyboardType='date' placeholder="Card's Date:" style={styles.TextInput}></TextInput>
          <View style={{ height: 10 }}></View>
          <TextInput keyboardType='numeric' placeholder='cvv' style={styles.TextInput}></TextInput>
        </View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={Delete} >
            <Text>DELETE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfirmationPage' ,{ total: totalSum,Name:name,CardNum: cardNum,rooms : [Single,Double,Suit]})} >
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

})