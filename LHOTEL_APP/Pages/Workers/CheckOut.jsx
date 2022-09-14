<<<<<<< HEAD
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
import React, { useState ,useEffect} from "react";
=======
import {View,Text,StyleSheet,Image,TouchableOpacity,Dimensions,ScrollView,FlatList,} from "react-native";
import React, { useState } from "react";
>>>>>>> 467827c1ed57d1d9f08c3b0bfb65a6e4d09be269
import { Checkbox } from "react-native-paper";
import { images } from "../../images";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { Searchbar } from "react-native-paper";
<<<<<<< HEAD
=======

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
>>>>>>> 467827c1ed57d1d9f08c3b0bfb65a6e4d09be269

const numColumns = 2;


export default function CheckOut() {

  const [DBreservationItems, SetDBReservationItems] = useState([])
  const [reservationItems, setReservationItems] = useState([]);
  const [search, setSearch] = useState("");
 
  useEffect(() => { FetchData() }, []);


  const FetchData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch('http://proj13.ruppin-tech.co.il/GetTakenRooms', requestOptions);
    let rooms = await result.json();
    if (rooms !== null) {
     setReservationItems(rooms)
     SetDBReservationItems(rooms)
    
      return
    }
    FetchData()

  }


  const SerchReservation = (value) => {
<<<<<<< HEAD
 
=======
    // console.log(value);
>>>>>>> 467827c1ed57d1d9f08c3b0bfb65a6e4d09be269
    setSearch(value);
    let occupiedReservation = reservationItems.filter(
      (reservation) => reservation.Id == value
    );
    console.log(occupiedReservation);
    if (occupiedReservation.length > 0) {
      setReservationItems(occupiedReservation);
    } else {
      setReservationItems(DBreservationItems);
    }
  };

  const CheckOutCard = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <View style={styles.Details}>
          <Text style={{ fontSize: 16 }}>
            {moment(new Date(item.Bill_Date)).format("DD.MM.YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>No : {item.Bill_Number}</Text>
        </View>
        <View style={styles.containerTaskDedtails}>
          <Text
            style={{ padding:10,alignSelf:'flex-end', fontSize: 18 }}
          >
            ID : {item.Id}
          </Text>
          <Text style={{padding:10,alignSelf:'flex-end', fontSize: 18 }}>
            FROM :  
          {moment(new Date(item.Entry_Date)).format("DD.MM.YYYY")}
          </Text>
          <Text style={{ padding:10,alignSelf:'flex-end', fontSize: 18 }}>
            TO :  
            {
              moment(new Date(item.ExitDate)).format("DD.MM.YYYY")}
          </Text>
          <View style={{ flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",paddingHorizontal:10}}>
          <Text style={{ padding: 4,fontSize: 18 }}>
          Room : {item.Room_Number}

          </Text>

          <Icon name="person" size={18} style={{ padding: 4 }}>
            {" "}
            {item.Amount_Of_People}
          </Icon>
          </View>
          
          <View style={styles.BTNContainer}>
          <TouchableOpacity style={styles.LogoutBtn} onPress ={()=> Checkout(item.Id,item.ExitDate)} >
                        <Text style={{ color: 'black' }}>Check out</Text>
                    </TouchableOpacity>
            {/* <TouchableOpacity >
              <Image style={styles.BTNImages} source={images.exit_shift} />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };
  const  Checkout = async (Id,ExitDate) =>{
   
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
          "id": Id,
          "Exit_Date": ExitDate
        }),
        headers: { 'Content-Type': 'application/json' }
      };
      let result = await fetch('http://proj13.ruppin-tech.co.il/CheckOut', requestOptions);
      let rooms = await result.json();
      if (rooms) {
       alert("You have successfully checked out !!!")
       FetchData()
        return
      }
  

  
  }
  return (
    <View style={styles.container}>
      <View style={styles.SearchbarContainer}>
        <Text style={styles.HeadLine}>CHECK OUT</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={SerchReservation}
          value={search}
        />
      </View>

      <FlatList
        data={reservationItems}
        renderItem={CheckOutCard}
        keyExtarctor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgba(35,100,168, 0.2)",
    alignItems: "center",
    justifyContent: "center",

    height: numColumns,
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
    paddingTop: 20,
    flex: 1,
    margin: 2,
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

    height:  numColumns,
    flex: 1,
    margin: 10,
  },
  SearchbarContainer: {
    paddingHorizontal: 3,
    paddingTop: 10,
    paddingBottom: 20,
  },
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  LogoutBtn: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5
},
});
