import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect ,useContext} from "react";
import { Divider } from "react-native-paper";
import { images } from "../../images";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { Searchbar } from "react-native-paper";
import AppContext from "../../AppContext";


const numColumns = 2;


export default function CheckOut() {

  const [DBreservationItems, SetDBReservationItems] = useState([])
  const [reservationItems, setReservationItems] = useState([]);
  const [search, setSearch] = useState("");
  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation;
  useEffect(() => { FetchData() }, []);


  const FetchData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch('http://proj13.ruppin-tech.co.il/GetBookedRooms', requestOptions);
    let rooms = await result.json();
    if (rooms !== null) {
      // console.log(rooms);
      // setReservationItems(rooms)
      // SetDBReservationItems(rooms)
      let roomsData = BilldReservationItemsData(rooms)
      // console.log(roomsData);
      setReservationItems(roomsData)
      SetDBReservationItems(roomsData)
      return
    }
    FetchData()
  }
  const renderItem = ({ item }) => (
    // console.log(item)
    // <>
    
    // {
    //   item.RoomNumber.length === undefined? <Text style={{ fontSize: 17, paddingHorizontal: 5, marginRight: 10, paddingBottom: 5, }}>
    //   Room : {item.RoomNumber}
    // </Text> :item.RoomNumber.map((roomNumber,index)=>  <Text key = {index}style={{ fontSize: 17, paddingHorizontal: 5, marginRight: 10, paddingBottom: 5, }}>
    //   Room : {roomNumber}
    // </Text>)
    // }
        
    //   </>
    <>
      <Divider
        style={{
          width: 2,
          height: "70%",
          marginRight: 10,
          alignSelf: "center",
        }}
      />

      <Text
        style={{
          fontSize: 17,
          paddingHorizontal: 5,
          marginRight: 10,
          paddingBottom: 5,
        }}
      >
        Room : {item}
      </Text>
    </>
  );

  const BilldReservationItemsData = (data) => {
    // console.log(data);

    let temp = []
    for (let index = 0; index < data.length; index++) {
      let object = temp.filter((per) => per.CustomerID === data[index].CustomerID)
      if (object.length === 0) {
        temp.push(data[index])
      }
      else {
        if (object[0].RoomNumber.length === undefined) {
          let rooms = [object[0].RoomNumber, data[index]['RoomNumber']]
          object[0].RoomNumber = rooms
        }
        else {
          // console.log(data[index].RoomNumber);
          object[0].RoomNumber.push(data[index].RoomNumber)
        }
      }
    }
    return temp
  }



  // const RenderItem = ({ item}) => {
  //   console.log(item)

  //   return(
  //     <>
    
  // {
  //   item.RoomNumber.length === undefined? <Text style={{ fontSize: 17, paddingHorizontal: 5, marginRight: 10, paddingBottom: 5, }}>
  //   Room : {item.RoomNumber}
  // </Text> :item.RoomNumber.map((roomNumber,index)=>  <Text key = {index}style={{ fontSize: 17, paddingHorizontal: 5, marginRight: 10, paddingBottom: 5, }}>
  //   Room : {roomNumber}
  // </Text>)
  // }
      
  //   </>
  //   )

  // }
   
 


  const SerchReservation = (value) => {

    // console.log(value);
    setSearch(value);
    let occupiedReservation = reservationItems.filter(
      (reservation) => reservation.CustomerID == value
    );
    // console.log(occupiedReservation);
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
            {moment(new Date(item.BillDate)).format("DD.MM.YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>No : {item.BillNumber}</Text>
        </View>
        <View style={styles.containerTaskDedtails}>
          <View style={{flexDirection: "row",
     alignItems: "center",
  justifyContent: "space-between", }}>
         <Icon name="person" size={18} style={{ padding: 4 }}>
                {" "}
                {item.AmountOfPeople}
              </Icon>
            <Text
              style={{ padding: 10,  fontSize: 18 }}
            >
              ID : {item.CustomerID}
             
            </Text>
       
          </View>

          <Text style={{ padding: 10, alignSelf: 'flex-end', fontSize: 18 }}>
            FROM  :  {" "}
            {moment(new Date(item.EntryDate)).format("DD.MM.YYYY")}
          </Text>
          <Text style={{ padding: 10, alignSelf: 'flex-end', fontSize: 18 }}>
            TO  : {" "}
            {
              moment(new Date(item.ExitDate)).format("DD.MM.YYYY")}
          </Text>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
           paddingHorizontal: 10
          }}>
     {
      item.RoomNumber.length === undefined? <Text style={{
        fontSize: 17,
        paddingHorizontal: 5,
        marginRight: 10,
        paddingBottom: 5,
      }}> Room : {item.RoomNumber}</Text>:
<FlatList
                data={item.RoomNumber}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
              />
         
     }
              
          {/* <RenderItem item ={item}/> */}
     
          </View>

          <View style={styles.BTNContainer}>
            <TouchableOpacity style={styles.LogoutBtn} onPress={() => Checkout(item.CustomerID, item.ExitDate)} >
              <Text style={{ color: 'black' }}>Check out</Text>
            </TouchableOpacity>
         
          </View>
        </View>
      </View>
    );
  };
  const Checkout = async (CustomerID, ExitDate) => {

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        "id": CustomerID,
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
  // const func = ()=>{
  //   let rooms = []
  //   DBreservationItems.map((room) =>
  //   rooms.push({
  //         type: per.RoomType,
  //         allrooms: rooms.filter((room) => room.RoomType === per.RoomType).length,
  //         details: per.Details,
  //         pricePerNight: per.PricePerNight,
  //       })
  //   rooms .push()
  // }


  // let cards = reservationItems.map((per) => CheckOutCard(per))
  // console.log("reservationItems : ---   "+ reservationItems);

  return (
    <View style={styles.container}>
      <View style={styles.SearchbarContainer}>
        <Text style={styles.HeadLine}>CHECK OUT</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={SerchReservation}
          value={search}
          keyboardType="numeric"
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
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  // IDIconContain:{
  //   flexDirection: "row",
  //   alignItems: "flex-end",
  //   justifyContent: "space-between", 
  // },

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

    height: numColumns,
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
