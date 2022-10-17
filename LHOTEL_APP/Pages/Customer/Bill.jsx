import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
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
      SetTableData(temp);
      SetLoading(true)
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


  const BilldHistoryData = () => {
    let billNumbers = []
    tableData.map(function (per) {
      if (billNumbers.indexOf(per.BillNumber) < 0) { billNumbers.push(per.BillNumber) }
    })

    let tempData = []
    for (let index = 0; index < billNumbers.length; index++) {
      let temp = tableData.filter((per) => per.BillNumber === billNumbers[index]).map(
        ({
          RoomNumber, RoomType, PricePerNight, AmountOfPeople, Breakfast, EntryDate, ExitDate, NumberOfNights, PaymentMethod,
        }) => ({
          RoomNumber, RoomType, PricePerNight, AmountOfPeople, Breakfast, EntryDate, ExitDate, NumberOfNights, PaymentMethod,
        })
      )
      // console.log(temp);
      tempData.push({
        BillNumber: billNumbers[index],
        BillDetailes: temp
      })
    }
    return tempData
  }


  // ---  יש לעבוד על אופן ההצגה של כול חשבונית עם המידע שלה הרלוונתי המפריד בין החשבוניות
  const HistoryCard = (data) => {
    // console.log(data[0].BillDetailes[0].RoomType);
    // console.log(data)
    // let list = data.map((bill) =>
    //   <View style={styles.CardStyle}>
    //     <Text style={styles.cardText}>BillNumber: {bill.BillNumber}</Text>
    //     {billDetails}
    //   </View>
    // )

    let billDetails = []
    for (let i = 0; i < data.length; index++) {
      // const element =  array[index];
      let detailsIndex = data[i].BillDetailes
      // console.log("index --- > " + index + " ---- >");
      // console.log(detailsIndex);

      for (let j = 0; j < detailsIndex.length; index++) {
        console.log("index --- > " + j + " ---- >");
        console.log(detailsIndex[j]);
      }

      // details Index.map((per) => console.log(per))
      // let render = detailsIndex.map((per) => 
      // <View>
      //   <Text>RoomType: {per.RoomType}</Text>
      // </View>)

      // billDetails.push(render)
    }

    let list = data.map((bill) =>
      <View  style={styles.CardStyle}>
        <Text style={styles.cardText}>BillNumber: {bill.BillNumber}</Text>
        {billDetails}
      </View>
    )

    // data.map((bill) => console.log(bill[0].BillDetailes))

    return (
      <View >
        {/* <Text style={{ paddingBottom: 10 }}>BillNumber: {tableData[0].BillNumber}</Text> */}
        {list}
      </View>
    )
  }


  const ResitCard = () => {
    let list = tableData.map((room,index) =>
      <View key ={index}>
        <Text style={styles.cardText}>Room: {room.RoomNumber}  Price: {room.PricePerNight}  {room.RoomType}</Text>
      </View>
    )
    return (
      <View style={styles.CardStyle}>
        <Text style={styles.cardText}>CustomerID: {tableData[0].CustomerID}</Text>
        {list}
        <Text style={styles.cardText}>Date: {moment(tableData[0].EntryDate).format("DD-MM-YYYY")}  --  {moment(tableData[0].ExitDate).format("DD-MM-YYYY")}</Text>
        <Text >Number Of Nights: {tableData[0].NumberOfNights}</Text>
      </View>
    )
  }


  const DeleteReservationFromDB = async () => {
    try {
      SetLoading(false)
      const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify({
          id: user.CustomerID
        }),
        headers: { 'Content-Type': 'application/json' }
      };
      let result = await fetch('http://proj13.ruppin-tech.co.il/DeleteReservation', requestOptions);
      let temp = await result.json();
      if (temp) {
        alert("order has been canceled")
        SetTableData(null)
        SetLoading(true)
      }
    } catch (error) {
      alert(error)
    }
    SetLoading(true)
  }


  const DeleteReservation = () => {
    return Alert.alert(
      "order",
      "Are you sure you want to cancel your order?",
      [
        {
          text: "Yes",
          onPress: () => {
            DeleteReservationFromDB()
          },
        },
        { text: "No", },
      ]
    );
  }


  const ReservationCard = () => {
    let list = tableData.map((room) =>
      <View>
        <Text style={styles.cardText}>Room: {room.RoomNumber}  Price Per Night: {room.PricePerNight} {room.RoomType}</Text>
      </View>
    )
    return (
      <View style={styles.CardStyle}>
        <Text style={styles.cardText}>CustomerID: {tableData[0].CustomerID}</Text>
        {list}
        <Text style={styles.cardText}>Date: {moment(tableData[0].EntryDate).format("DD-MM-YYYY")}  --  {moment(tableData[0].ExitDate).format("DD-MM-YYYY")}</Text>
        <Text style={styles.cardText}>Name: {tableData[0].FirstName} {tableData[0].LastName}</Text>
        <Text style={styles.cardText}>AmountOfPeople: {tableData[0].AmountOfPeople}</Text>
        <Text style={styles.cardText}>Mail: {tableData[0].Mail}</Text>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <TouchableOpacity style={styles.deleteBTN} onPress={() => DeleteReservation()}>
            <Image style={styles.save} source={images.trashCan} />
            <Text>Delete Reservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // console.log(tableData);

  const CreateCard = () => {
    // console.log(tableData);
    if (tableData !== null && tableData.length > 1) {
      let temp = null
      switch (request) {
        case 'GetReservedRoomsByCustomerId':
          temp = ReservationCard()
          break;
        case 'GetRoomResit':
          temp = ResitCard()
          break;
        case 'GetAllCustomersHistory':
          let data = BilldHistoryData()
          temp = HistoryCard(data)
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
  CardStyle: {
    backgroundColor: "gray",
    padding: 10,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5
  },
  cardText: {
    paddingBottom: 10
  },
})