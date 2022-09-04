import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { images } from "../../images";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";

const Occupiedreservations = [
  // { Room_Number: 2, Bill_Number:2,	Customer_ID:222,	Bill_Date:'2021-01-01'	,Entry_Date:'2021-01-01',
  // Exit_Date:'2021-01-03',	Amount_Of_People:1,	Room_Status:'Occupied'},
  {
    Room_Number: 1,
    Bill_Number: 35,
    Customer_ID: 333,
    Bill_Date: "2022-09-01",
    Entry_Date: "2022-08-22",
    Exit_Date: "2022-08-24",
    Amount_Of_People: 5,
    Room_Status: "Occupied",
  },

  {
    Room_Number: 2,
    Bill_Number: 2,
    Customer_ID: 222,
    Bill_Date: "2021-01-01",
    Entry_Date: "2021-01-01",
    Exit_Date: "2021-01-03",
    Amount_Of_People: 1,
    Room_Status: "Occupied",
  },

  {
    Room_Number: 4,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Occupied",
  },

  {
    Room_Number: 8,
    Bill_Number: 8,
    Customer_ID: 888,
    Bill_Date: "2022-12-06",
    Entry_Date: "2022-12-09",
    Exit_Date: "2022-09-15",
    Amount_Of_People: 2,
    Room_Status: "Occupied",
  },

  {
    Room_Number: 9,
    Bill_Number: 4,
    Customer_ID: 444,
    Bill_Date: "2021-01-01",
    Entry_Date: "2021-01-01",
    Exit_Date: "2021-01-09",
    Amount_Of_People: 1,
    Room_Status: "Occupied",
  },

  {
    Room_Number: 11,
    Bill_Number: 35,
    Customer_ID: 666,
    Bill_Date: "2022-09-01",
    Entry_Date: "2022-08-22",
    Exit_Date: "2022-08-24",
    Amount_Of_People: 5,
    Room_Status: "Occupied",
  },

  {
    Room_Number: 12,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Occupied",
  },
  {
    Room_Number: 13,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Occupied",
  },
  {
    Room_Number: 21,
    Bill_Number: 35,
    Customer_ID: 666,
    Bill_Date: "2022-09-01",
    Entry_Date: "2022-08-22",
    Exit_Date: "2022-08-24",
    Amount_Of_People: 5,
    Room_Status: "Occupied",
  },
];

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;

export default function CheckOut() {
  const CheckOutCard = ({ item, index }) => {
    return (
      
      <View style={styles.container}>
         <View style={styles.Details}>
           <Text style ={{fontSize:16}}>{moment(new Date(item.Bill_Date)).format("DD.MM.YYYY")}</Text>
          <Text style ={{fontSize:16}} >No : {item.Bill_Number}</Text>

         
      </View>
        <View style={styles.containerTaskDedtails}>
      
            <Text style = {{paddingHorizontal:5,paddingVertical:5,fontSize:18}}>ID : {item.Customer_ID}</Text>
      
       
          
            {/* <Text>{moment(item.Exit_Date).diff(moment(item.Entry_Date), "days")}
          {" "}nights</Text> */}
          <Text style={{paddingRight:55,paddingBottom:5,fontSize:18}}>
           
              {" " +
                item.Entry_Date.split("-")[2] +
                "-" +
                moment(new Date(item.Exit_Date)).format("DD.MM.YYYY")}
            </Text>
   
            <Icon name="person"  size={18} style={{padding:4}}> {item.Amount_Of_People}</Icon>
         

          <View style={styles.BTNContainer}>
            {/* <TouchableOpacity>
              <Image style={styles.BTNImages} source={images.edit} />
            </TouchableOpacity> */}

            <TouchableOpacity>
              <Image style={styles.BTNImages} source={images.exit_shift} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#000"/> */}
      <FlatList
        data={Occupiedreservations}
        renderItem={CheckOutCard}
        keyExtarctor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 50,
  // },

  item: {
    backgroundColor: "rgba(35,100,168, 0.2)",
    alignItems: "center",
    justifyContent: "center",

    height:numColumns,
    flex: 1,
    margin: 10,
  },
  itemText: {
    color: "black",
    fontSize: 20,
  },
  Image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
    padding: 5,
  },
  Text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    textDecorationLine: "underline",
    textAlign: "right",
    paddingLeft: 30,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 30,
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonRooms: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    padding: 10,
  },
  user_Name: {
    backgroundColor: "black",
    alignItems: "center",
    textAlign: "center",
  },
  innerText: {
    color: "white",
    padding: 5,
  },
  container: {
    // backgroundColor: "green",
    borderBottomColor: "black",
    borderRadius: 5,
    marginTop:20,
  flex:1
  ,
  margin:2
  },
  containerTaskDedtails: {
    borderColor: "black",
    borderWidth: 1,
  },

  Details: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  BTNImages: {
    width: 30,
    height: 30,
  },
  BTNContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },

  item: {
    backgroundColor: "rgba(35,100,168, 0.2)",
    alignItems: "center",
    justifyContent: "center",

    height: WIDTH / numColumns,
    flex: 1,
    margin: 10,
  },
});