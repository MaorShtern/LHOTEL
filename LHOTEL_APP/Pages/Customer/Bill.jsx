import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { Dropdown } from "react-native-element-dropdown";
import { ActivityIndicator } from "react-native";
import AppContext from "../../AppContext";
import moment from 'moment/moment';
import { images } from "../../images";


export default function Bill() {

  const [tableData, SetTableData] = useState(null)
  const [loading, SetLoading] = useState(true)
  const [request, SetRequest] = useState('')
  const myContext = useContext(AppContext);
  const user = myContext.user
  // console.log(user);
  // console.log(use r.FirstName === undefined);


  const FetchTableFromDB = async (request) => {
    try {
      SetLoading(false)
      SetRequest(request)
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify({
          id: user.CustomerID
        }),
        headers: { 'Content-Type': 'application/json' }
      };
      let result = await fetch('http://proj13.ruppin-tech.co.il/' + request, requestOptions);
      let temp = await result.json();
      if (temp !== null) {
        // console.log(temp);
        if (temp.length > 1)
          SetTableData(temp);
        else
          SetTableData(null);
        SetLoading(true)
        return
      }
    } catch (error) {
      alert(error)
    }
    SetLoading(true)

  }


  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );



  // ---  יש לעבוד על אופן ההצגה של כול חשבונית עם המידע שלה הרלוונתי המפריד בין החשבוניות
  const HistoryCard = () => {
    let list = tableData.map((room) =>
      <View>
        <Text style={{ paddingBottom: 10 }}>{room.BillNumber}Room: {room.RoomNumber}  Price Per Night: {room.PricePerNight} {room.RoomType}</Text>
      </View>
    )
    return (
      <View style={{ backgroundColor: "gray", padding: 10, borderColor: "black", borderRadius: 5, borderWidth: 1 }}>
        <Text style={{ paddingBottom: 10 }}>BillNumber: {tableData[0].BillNumber}</Text>
        {list}
      </View>
    )
  }


  const ResitCard = () => {
    let list = tableData.map((room) =>
      <View>
        <Text style={{ paddingBottom: 10 }}>Room: {room.RoomNumber}  Price: {room.PricePerNight}  {room.RoomType}</Text>
      </View>
    )
    return (
      <View style={{ backgroundColor: "gray", padding: 10, borderColor: "black", borderRadius: 5, borderWidth: 1 }}>
        <Text style={{ paddingBottom: 10 }}>CustomerID: {tableData[0].CustomerID}</Text>
        {list}
        {/* <View style={{ paddingBottom: 10 }}>
          <Text>Reservation Date: {moment(tableData[0].PurchaseDate).format("DD-MM-YYYY")}</Text>
        </View> */}
        <Text>Date: {moment(tableData[0].EntryDate).format("DD-MM-YYYY")}  --  {moment(tableData[0].ExitDate).format("DD-MM-YYYY")}</Text>
        <Text>Number Of Nights: {tableData[0].NumberOfNights}</Text>
        {/* <View style={{ alignItems: "center", paddingTop: 10 }}>
        </View> */}
      </View>
    )
  }



  const ReservationCard = () => {
    let list = tableData.map((room) =>
      <View>
        <Text style={{ paddingBottom: 10 }}>Room: {room.RoomNumber}  Price Per Night: {room.PricePerNight} {room.RoomType}</Text>
      </View>
    )
    return (
      <View style={{ backgroundColor: "gray", padding: 10, borderColor: "black", borderRadius: 5, borderWidth: 1 }}>
        <Text style={{ paddingBottom: 10 }}>CustomerID: {tableData[0].CustomerID}</Text>
        {list}
        <Text>Date: {moment(tableData[0].EntryDate).format("DD-MM-YYYY")}  --  {moment(tableData[0].ExitDate).format("DD-MM-YYYY")}</Text>
        <Text>Name: {tableData[0].FirstName} {tableData[0].LastName}</Text>
        <Text>AmountOfPeople: {tableData[0].AmountOfPeople}</Text>
        <Text>Mail: {tableData[0].Mail}</Text>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <TouchableOpacity style={styles.deleteBTN}>
            <Image style={styles.save} source={images.trashCan} />
            <Text>Delete Reservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // console.log(tableData);

  const CreateCard = () => {
    if (tableData !== null) {
      let temp = null
      switch (request) {
        case 'GetReservedRoomsByCustomerId':
          temp = ReservationCard()
          break;
        case 'GetRoomResit':
          temp = ResitCard()
          break;
        case 'GetAllCustomersHistory':
          temp = HistoryCard()
          break;
        default:
          break;
      }
      return temp
    }
    else
      return null
  }







  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Bill</Text>

      {user.FirstName === undefined ?
        <View style={{ alignSelf: "center", padding: 10, paddingTop: 60 }}>
          <Text>A user must be logged in to view the requested tables</Text>
        </View> : (

          <View style={styles.DropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              data={[
                { label: "Reservation", value: "GetReservedRoomsByCustomerId" },
                { label: "Room Resit", value: "GetRoomResit" },
                { label: "Previous Reservationes", value: "GetAllCustomersHistory" },
              ]}
              labelField="label"
              valueField="value"
              placeholder={"Select Bill"}
              onChange={(role) => { FetchTableFromDB(role.value) }}
            />
          </View>)}

      <View style={{ width: 320, alignSelf: "center" }}>
        {loading ? <CreateCard /> : <Spinner />}
      </View>

    </ScrollView>
  )
}



const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  DropdownContainer: {
    padding: 20
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  tableContainer: {
    padding: 10
  },
  head: {
    height: 60,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6
  },

  save: {
    width: 30,
    height: 30,
  },
  deleteBTN: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 2,

  },
})