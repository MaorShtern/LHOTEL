import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";
import { Divider, Text } from "react-native-paper";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import { Checkbox } from 'react-native-paper';


export default function ShortCheckIn({ route, navigation }) {
 
    let {currentReservationsArr} = route.params
  

  const ReservationCard = () => {
 
    const renderItem = ({ item }) => (
      <>
        <Divider style={{ width: 2, height: "70%", marginRight:10,alignSelf:'center'}} />

        <Text style={{fontSize:17 ,paddingHorizontal:5, marginRight:10,paddingBottom:5}}>Room : {item.Room_Number}</Text>
      </>

    
    );

    let currentReservation = currentReservationsArr[0];
    return (
    
      <View
        style={{
          marginHorizontal: 10,
          paddingTop: 10,
          height:200+(Math.ceil(currentReservationsArr.length/3)-1)*25,
       
        }}
      >
      <View style={styles.Details}>
      <Text style ={{fontSize:16}}>{moment(new Date(currentReservation.Bill_Date)).format("DD.MM.YYYY")}</Text>
        <Text style ={{fontSize:16 }} >No : {currentReservation.Bill_Number}</Text>
     
        </View>
        <View style={{paddingTop:10,alignItems: "flex-end"}}>
        <Text style={{ fontSize: 20 ,fontWeight:'600' }}>
          <Image style={styles.icon} source={images.calendar} />
          {" " +
            currentReservation.Entry_Date.split("-")[2] +
            "-" +
            moment(new Date(currentReservation.Exit_Date)).format(
              "DD.MM.YYYY"
            )}{" "}
          (
          {moment(currentReservation.Exit_Date).diff(
            moment(currentReservation.Entry_Date),
            "days"
          )}{" "}
          nights)
        </Text>
        <Text style={{ color: "#888", paddingHorizontal: 5,paddingTop:10 ,fontSize:17}}>
          {currentReservation.Amount_Of_People} adults
        </Text>

        </View>
      
          <View>
            <View
              style={{
                flexDirection: "row",
              marginTop:15,
                marginRight:5,
               
              }}
            >
            <FlatList 
            data={currentReservationsArr}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
          
          </View>

          
        </View>
      </View>
    );
  };

  const SaveReservationToDB = async () => {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({
        mail: "7878",
        Entry_Date: "2022-09-05",
      }),
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch(
      "http://proj13.ruppin-tech.co.il/CheckIn",
      requestOptions
    );
    let isOk = await result.json();

    // console.log(user);
    // console.log(email);
    // console.log(password);
    if (isOk) {
      alert("You have checked in successfully ! Welcome to LHOTEL");
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);
      // navigation.navigate('Home')
      // console.log(user);

      // saveUser(user)
      return;
    }
    // FetchData()
  };
 const item = currentReservationsArr[0];
 console.log(JSON.stringify(currentReservationsArr));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flex: 2 }}>
        <Image
          source={images.hotelloby}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "80%",
          }}
        />
        <View
          style={[
            {
              position: "absolute",
              bottom: "5%",
              left: "5%",
              right: "5%",
              borderRadius: 15,
             
              backgroundColor: "#fff",
            },
            styles.shadow,
          ]}
        >
        
          <ReservationCard/>
   
        </View>


        <View
          style={{
            position: "absolute",
            flexDirection: "row",
          }}
        >
        </View>
      </View>

    
      <View style={{ flex: 1.5 }}>
      
        <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 20  ,alignSelf:'flex-end',paddingBottom:20}}>Customer's details </Text>
        
    

         

         
 
        <View style={styles.containerTaskDedtails}>
        
        <View style={styles.Details}>
  
        <Text style = {{paddingHorizontal:5,paddingVertical:5,fontSize:18 ,alignSelf:'flex-end'}}>Type : 1</Text>
        <Text style = {{paddingHorizontal:5,paddingVertical:5,fontSize:18 ,alignSelf:'flex-end'}}>ID : {item.Customer_ID}</Text>
        </View>
        <View style={styles.Details}>
   
        <Text style ={{fontSize:18 }} >John@gmail.com</Text>
        <Text style ={{fontSize:18 }} >John Doe</Text>

        
        </View>
        <View style={styles.Details}>
  
  <Text style = {{paddingHorizontal:5,paddingVertical:5,fontSize:18 ,alignSelf:'flex-end'}}>5421************</Text>
  <Icon name="card" size={25} color="#a8a9ad" />
  </View>
  <Text style = {{padding:10, fontSize:18 ,alignSelf:'flex-end'}}> <Icon name="call" size={20} color="#a8a9ad" /> 054-4512021</Text>
  
  
        </View>
   
        </View>
      </View>

      {/* Footer */}
      <View style={{ flex: 0.5, paddingHorizontal: 10 }}>
        <LinearGradient
          style={[{ height: 70, width: "100%", borderRadius: 15 }]}
          colors={["#edf0fc", "#d6dfff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30 }}>1000$</Text>
            </View>

            <TouchableOpacity
              style={{ width: 130, height: "80%", marginHorizontal: 10 }}
            //   onPress={() => SaveReservationToDB()}
            onPress={() =>   {alert("You have checked in successfully !"),navigation.navigate('CheckIn')}}
            >
              <LinearGradient
                style={[
                  {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  },
                ]}
                colors={["#46aeff", "#5884ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={{ color: "#fff" }}>CHECK IN NOW</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,

    // padding: 20,
  },

containerTaskDedtails: {
    borderColor: 'black',
    borderWidth: 1
},

Details: {
 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12
},
BTNImages: {
    width: 30,
    height: 30,
},
BTNContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
}
});




