import { Animated,View, Image, StyleSheet, Text, TouchableOpacity, StatusBar, Alert, ImageBackground } from "react-native";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { images } from "../images";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import AppContext from '../AppContext';
import { ActivityIndicator } from "react-native";


export default function Home({ navigation }) {

  const [loading, SetLoading] = useState(true)
  const myContext = useContext(AppContext);

  const [closeState, setCloseState] = useState(new Animated.Value(1));
  const [info, setInfo] = useState(false);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');


  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );

  useEffect(() => {
    const focus = navigation.addListener("focus", () => {
      if(!info)  myContext.setEmployeeDB({})
      setPassword('')
      setId('')
      // console.log(myContext.employee);
      myContext.setUserDB({})
      console.log(myContext.user);
    });
    return focus;
  }, [navigation]);







  // useEffect(() => {
  //   const focus = navigation.addListener("focus", () => {
  //     // console.log(JSON.stringify(myContext.employee));
  //     // setWorkerCode(1)
  //     setPassword('')
  //     setId('')
      
    
  //   });
  //   return focus;
  // }, [navigation]);


  const LogIn = async () => { /// פונקציה אסינכרונית אשר מביאה לנו את פרטי העובד על פי ת.ז וסיסמה
    try {
      if(id === '' || password === '')
      {
        alert('It is mandatory to fill in an ID card and employee code')
        return
      }
      SetLoading(false)
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          id: id,
          password: password,
        }),
        headers: { "Content-Type": "application/json" }, // יצירת הבקשה בעזרת הפרמטרים שהמשתמש הזין למערכת
      };
      // console.log(requestOptions.body);
      let result = await fetch("http://proj13.ruppin-tech.co.il/GetEmployeeByIdAndPassword", requestOptions);
      let employee = await result.json();
      if (employee === null) { // אם לא מוחזר משתמש מהמסד הנתונים הצג הודעת שגיאה
        SetLoading(true)
        Alert.alert("No such user exists in the system");
        return
      }
      myContext.setEmployeeDB(employee) // שמור את פרטי המשתמש במשתנה גלובלי במערכת
      // navigation.navigate("Credit");
      navigation.navigate("WorkerMenu")
    }
    catch (error) {
      alert(error);
    }
    SetLoading(true)
  };
 

  const renderCurrentSelection = () => {
   
        return (
          <View style={styles.loginContainer}>
            <View style={styles.items}>
              {loading ? null : <Spinner />}
            </View>
            <TextInput
              label="Employee ID"
              left={<TextInput.Icon name="account" />}
              keyboardType="numeric"
              mode="outlined"
              style={{ margin: 10, paddingLeft: 3 }}
              onChangeText={(id) => setId(id)}
              value={id}
            // onChangeText={myContext.setEmployeeId}
            />

            <TextInput
              label="Employee Code"
              left={<TextInput.Icon name="lock" />}
              keyboardType="numeric"
              mode="outlined"
              style={{ margin: 10, paddingLeft: 3 }}
              value={password}
            
              secureTextEntry={true}
              onChangeText={(code) => setPassword(code)}
            />

            <TouchableOpacity style={styles.btn} onPress={() => {
              LogIn()
              // console.log(JSON.stringify(myContext.employee))
            }}>
              <Text style={{ fontSize: 20, color: "white", fontWeight: "800" }}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={styles.underLineText}
                onPress={() => {
                  doAnimation(closeState, 1, 250), setInfo(false);
                }}
              >
                I'm not a worker
              </Text>
            </TouchableOpacity>
          </View>
        );
      // case 2:
      //   return (
      //     <WorkerMenu
      //       currentUserArr={currentUserArr}
        
      //       HandelNavigation={HandelNavigation}
      //     />
      //   );
    // }
  };

  const doAnimation = (btn, val, timer) => {
    Animated.timing(btn, {
      toValue: val,
      duration: timer,
      useNativeDriver: false,
    }).start();
  };
  // translucent={true} backgroundColor={"#fff"}  barStyle={"light-content"}
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Animated.View style={{ flex: 2 }}>
        <ImageBackground
          source={images.hotelback}
          resizeMode="cover"
          style={{
            flex: 2,
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.header}>LHOTEL</Text>
        </ImageBackground>
        {/* <BackgroundImage source={images.hotelback} style={{ flex: 2 }} />

        <Text style={styles.header}>LHOTEL</Text> */}
      </Animated.View>
      <Animated.View
        style={{
          flex: closeState,
          backgroundColor: info ? "rgba(0,0,0, 0.1)" : "white",
        }}
      >
        {info ? (
          renderCurrentSelection()
        ) : (
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 20,
                color: "black",
                textAlign: "center",
                paddingTop: 40,
              }}
            >
              "For the body and soul as well..."
            </Text>

            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Drawer"),
                    doAnimation(closeState, 1, 500);
                }}
                style={{
                  // width: "80%",
                  height: 60,
                  marginHorizontal: 10,
                  // marginVertical: 20,
                  alignSelf: "center",
                }}
              >
                <LinearGradient
                  style={[
                    {
                      // flex: 1,
                      shadowColor: "grey",
                      color: "white",
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
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Customer
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => { navigation.navigate('Drawer'), doAnimation(closeState, 1, 500) }}>
                <Text style={styles.button}>Customer</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  doAnimation(closeState, 8, 500), setInfo(true);
                }}
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
                      shadowColor: "grey",
                      color: "white",
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
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Worker
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => { doAnimation(closeState, 8, 500), setInfo(true) }}>
                <Text style={styles.button}>Worker</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 55,
    position: 'absolute',
    // justifyContent: 'center',
    zIndex: 1,
    fontWeight: "bold",
    bottom: -10,
    color: "white",
    right: 10,
  },
  AnimatedView: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10

  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  orangeButtonStyle: {
    backgroundColor: "orange",
    height: 45,
    width: 50,
    borderRadius: 5,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  button: {
    shadowColor: "grey",
    color: "white",
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
    color: "white",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loginContainer: {
    paddingHorizontal: 24,
    paddingVertical: 70,
    justifyContent: "center",
  },
  underLineText: {
    marginVertical: 25,
    fontSize: 25,
    textDecorationLine: "underline",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    height: 45,
    width: 300,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0, 0.7)",
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center",
    alignSelf:'center',
    marginTop: 20,
  },
});
