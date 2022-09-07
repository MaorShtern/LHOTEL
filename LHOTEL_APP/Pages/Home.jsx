import { Animated, View, Image, StyleSheet, Text, TouchableOpacity, StatusBar, Alert } from 'react-native'
import React from 'react'
import { BackgroundImage } from '@rneui/base';
import { useState, useEffect } from 'react'
import { images } from "../images";
import { TextInput } from "react-native-paper";
import WorkerMenu from './Workers/WorkerMenu';
import { LinearGradient } from "expo-linear-gradient";



const Users = [
  {
    Employee_ID: -1, Employee_Code: null, Employee_Name: "", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "General", Hourly_Wage: null, Address: null
  },
  {
    Employee_ID: 111, Employee_Code: 1, Employee_Name: "", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Manager", Hourly_Wage: null, Address: null
  },
  {
    Employee_ID: 222, Employee_Code: 2, Employee_Name: "", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Receptionist", Hourly_Wage: null, Address: null
  },
  {
    Employee_ID: 333, Employee_Code: 3, Employee_Name: "", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Room service", Hourly_Wage: null, Address: null
  },
]


export default function Home({ navigation }) {


  const [openState, setOpenState] = useState(new Animated.Value(100))
  const [closeState, setCloseState] = useState(new Animated.Value(1))
  const [info, setInfo] = useState(false)
  const [workerCode, setWorkerCode] = useState(1)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  // const pass = "123"

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      setWorkerCode(1);
    });
    return focus;
  }, [navigation]);



  const LogIn = () => {

    let user = Users.filter((per) => per.Employee_ID == id && per.Employee_Code == password)[0]
  
    if (user !== undefined) {
      let role = user.Role
      navigation.navigate('WorkerMenu', { id: user.Employee_Code,role:role })
    }
    else Alert.alert("No such user exists in the system")
  }

  const HandelNavigation = (route) => {
    // console.log(route);
    navigation.navigate(route)
  }

  const renderCurrentSelection = () => {

    switch (workerCode) {
      case 1:
        return (<View style={styles.loginContainer}>
          <TextInput
            label="Employee ID"
            left={<TextInput.Icon name="account" />}
            mode="outlined"
            style={{ margin: 10, paddingLeft: 3 }}
            onChangeText={(id) => setId(id)}
          />

          <TextInput
            label="Employee Code"
            left={<TextInput.Icon name="lock" />}
            mode="outlined"
            style={{ margin: 10, paddingLeft: 3 }}
            onChangeText={(code) => setPassword(code)}
          />
          <TouchableOpacity style={styles.btn} onPress={LogIn}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: '800' }}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.underLineText} onPress={() => { doAnimation(closeState, 1, 250), setInfo(false) }}>I'm not a worker</Text>
          </TouchableOpacity>

        </View>
        );
      case 2:
        return <WorkerMenu currentUserArr={currentUserArr} setWorkerCode={setWorkerCode} HandelNavigation={HandelNavigation} />;
    }
  };


  const doAnimation = (btn, val, timer) => {
    Animated.timing(btn,
      {
        toValue: val,
        duration: timer,
        useNativeDriver: false
      }
    ).start();
  }



  return (
    <View style={styles.container}>
      <StatusBar  translucent={true} backgroundColor={'transparent'}  />
      <Animated.View style={{ flex: 2, backgroundColor: 'black' }} >
        <BackgroundImage source={images.hotelback} style={{ flex: 2 }} />

        <Text style={styles.header}>LHOTEL</Text>
      </Animated.View>
      <Animated.View style={{ flex: closeState, backgroundColor: info ? 'rgba(0,0,0, 0.1)' : 'white' }}>
        {info ? renderCurrentSelection() :
          (<View style={styles.container}>
            <Text style={{ fontSize: 20, color: 'black' }}>
              DETAILS ABOUT THE HOTEL
              obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam</Text>

            <View style={styles.ButtonContainer}>
            <TouchableOpacity
           onPress={() => { navigation.navigate('Drawer'), doAnimation(closeState, 1, 500) }}
            style={{
              // width: "80%",
              height: 60,
              marginHorizontal: 10,
              marginVertical: 20,
              alignSelf: "center",
            }}
          >
            <LinearGradient
              style={[
                {
                  // flex: 1,
                  shadowColor: 'grey',
                  color: 'white',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                  // backgroundColor: 'orange',
                  width: 150,
                  padding: 20,
                  textAlign: "center",
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                },
              ]}
              colors={["#926F34", "#DFBD69"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{fontSize:18,fontWeight:'bold'}}>Customer</Text>
            </LinearGradient>
          </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => { navigation.navigate('Drawer'), doAnimation(closeState, 1, 500) }}>
                <Text style={styles.button}>Customer</Text>
              </TouchableOpacity> */}
               <TouchableOpacity
          onPress={() => { doAnimation(closeState, 8, 500), setInfo(true) }}
            style={{
              // width: "80%",
              height: 60,
              marginHorizontal: 10,
              marginVertical: 20,
              alignSelf: "center",
            }}
          >
            <LinearGradient
              style={[
                {
                  shadowColor: 'grey',
                  color: 'white',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                  // backgroundColor: 'orange',
                  width: 150,
                  padding: 20,
                  textAlign: "center",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                },
              ]}
              colors={["#926F34", "#DFBD69"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
                <Text style ={{fontSize:18,fontWeight:'bold'}}>Worker</Text>
            </LinearGradient>
          </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => { doAnimation(closeState, 8, 500), setInfo(true) }}>
                <Text style={styles.button}>Worker</Text>
              </TouchableOpacity> */}
            </View>
          </View>)}
      </Animated.View>
    </View>

  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 55,
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    fontWeight: 'bold',
    bottom: -10,
    color: 'white'
  },
  AnimatedView: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    
  },
  orangeButtonStyle: {
    backgroundColor: 'orange',
    height: 45,
    width: 50,
    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  button: {
    shadowColor: 'grey',
    color: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    // backgroundColor: 'orange',
    width: 150,
    padding: 20,
    textAlign: "center",
    borderRadius: 30,
  },
  startTextStyle: {
    color: 'white',
    fontSize: 17,
    textAlign: "center",
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loginContainer: {
    paddingHorizontal: 24,
    paddingVertical: 70,
    justifyContent: "center"
  },
  underLineText: {
    marginVertical: 25,
    fontSize: 25,
    textDecorationLine: 'underline',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    height: 45,
    width: 300,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0, 0.7)",
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginTop: 20
  }
});

