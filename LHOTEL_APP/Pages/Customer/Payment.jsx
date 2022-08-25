import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Customer from '../Class/Customer'



export default function Payment({ route, navigation }) {

  // let { the_data, number_Of_Nights, breakfast, entryDate, exitDate } = route.params


  const [totalSum, SetTotalSum] = useState(0)
  const [name, setName] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [cardDate, SetCardData] = useState('')
  const [cardCVC, SetCardCVC] = useState('')

  const [user, SetUser] = useState([])
  const [userDB, SetUserDB] = useState([])



//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       readData();
//     });
//     return unsubscribe;
// }, [navigation]);



  const Calculate_Final_Amount = () => {
    let sum = 0

    for (let i = 0; i < the_data.length; i++) {
      let pricePerNight = the_data[i].pricePerNight;
      let count = the_data[i].count;
      let tempToatal = pricePerNight * count
   
      sum += tempToatal;
    }
    SetTotalSum(sum)
  }
 
  const Delete = () => {
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

  const CheackDate = () => {
    let courentYear = new Date().getFullYear();
    let courentMonth = new Date().getMonth() + 1;
    let month = cardDate.substring(0, 2)
    let year = "20" + cardDate.substring(3, 5)

    if (cardDate.length === 5 && year >= courentYear && month > courentMonth
      && month >= '01' && month <= '12') {
      return true
    }
    else
      return false
  }

  const isValidCardDetails = () => {
    return cardNum.length !== 16 || !CheackDate() || cardCVC.length !== 3 ? false : true
  }

  const readData = async () => {
    try {
      const user = await AsyncStorage.getItem('@ConUser');
      const arrUsers = await AsyncStorage.getItem('@storage_Key_0');
      if (arrUsers !== null && user !== null) {
        let email = JSON.parse(user)
        let arr = JSON.parse(arrUsers)
        let userDetails = arr.filter((per) => per.email === email)
        id = userDetails[0].id
        cheackForUser(id)
        SetUser(userDetails[0])
      }
      Calculate_Final_Amount()
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  const CustomerToDataBS = async (value) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch('http://proj13.ruppin-tech.co.il/api/Customers', requestOptions);
    let customerResult = await result.json();
 
    if (customerResult)
      navigation.navigate('ConfirmationPage', {
        id: value.customerID, the_data: the_data,
        number_Of_Nights: number_Of_Nights, breakfast: breakfast, entryDate: entryDate, exitDate: exitDate,
        total: totalSum, Name: name, CardNum: cardNum
      })
    else
      alert("CustomerToDataBS")

  }

  const cheackForUser = async (value) => {
   
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch('http://proj13.ruppin-tech.co.il/api/Customers/' + value, requestOptions);
    let deleteResult = await result.json();
 
    if (deleteResult !== null) {
 
      SetUserDB(deleteResult)
      return
    }
    else
    {
      cheackForUser(value)
    }
  }


  const AlterCustomer = async (value) => {

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch('http://proj13.ruppin-tech.co.il/api/Customers', requestOptions);
    let customerResult = await result.json();
    if (customerResult)
      navigation.navigate('ConfirmationPage', {
        id: value.customerID, the_data: the_data,
        number_Of_Nights: number_Of_Nights, breakfast: breakfast, entryDate: entryDate, exitDate: exitDate,
        total: totalSum, Name: name, CardNum: cardNum
      })
    else
      alert("AlterCustomer")

  }

  const ConfirmInformation = () => {

    if (name.length > 1 && isValidCardDetails()) {
      // console.log(user);
      let newCustomer = {
        calssName: Customer,
        fields: {
          customerID: user.id,
          customerType: 1,
          firstName: user.first_name,
          lastName: user.last_name,
          mail: user.email,
          phoneNumber: user.phone,
          cardHolderName: name,
          creditCardDate: cardDate,
          threeDigit: cardCVC
        }
      }


     
      if(userDB !== null && userDB.length !== 0)
      {
        AlterCustomer(newCustomer.fields)
      }
      else{
        CustomerToDataBS(newCustomer.fields)
      }
      
    }
    else
      Alert.alert("The card details are incorrect")
  }

  console.log(userDB);


  return (
    <View>
      <ScrollView>
        <Text style={styles.HeadLine}>Payment</Text>
        <Text style={styles.Sum}>Total to pay:  {JSON.stringify(totalSum)}$</Text>
        <View style={{ height: 30 }}></View>
        <Text style={styles.SubHeadLine}>Enter payment information</Text>
        <View style={styles.TextInputContainer}>
          <TextInput placeholder="Cardholder's name" style={styles.TextInput} onChangeText={(name) => setName(name)}>{name}</TextInput>
          <View style={{ height: 10 }}></View>
          <TextInput keyboardType='numeric' placeholder="Card's Number" style={styles.TextInput} onChangeText={(cardNum) => setCardNum(cardNum)}>{cardNum}</TextInput>
          <View style={{ height: 10 }}></View>
          <TextInput placeholder="Card's Date:" style={styles.TextInput} onChangeText={(text) => { fixCardDate(text) }}>{cardDate}</TextInput>
          <View>
            {!CheackDate() ? (
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
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('ConfirmationPage')} >
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