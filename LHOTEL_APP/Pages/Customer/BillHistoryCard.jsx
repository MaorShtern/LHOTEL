import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import moment from 'moment/moment';


export default function BillHistoryCard(props) {

  // let { data } = props
  // console.log(data);

  let { BillNumber, BillDate, EntryDate, ExitDate, SumTotal, BillDetailes } = props

  return (
    <View>
      <View style={styles.CardStyle}>
        <View style={styles.detailsBill}>
          <Text style={styles.cardText}>Bill Number: {BillNumber}</Text>
          <Text style={styles.cardText}>Date: {BillDate}</Text>
        </View>

        <View style={styles.detailsBill}>
          <Text style={styles.cardText}>Entry Date: {EntryDate}</Text>
          <Text style={styles.cardText}>Exit Date: {ExitDate}</Text>
        </View>

        {BillDetailes.map((per) =>
          per.RoomType !== 'Single room' && per.RoomType !== 'Double room' && per.RoomType !== 'Suite' ?
            <View>
              <View style={styles.detailsBill}>
                <Text>{per.RoomType}</Text>
                <Text>Price: {per.PricePerNight}</Text>
                <Text>Amount: {per.NumberOfNights}</Text>
              </View>
            </View>
            :
            <View>
              <View style={styles.detailsBill}>
                <Text style={{ paddingRight: 10 }}>Room: {per.RoomNumber}</Text>
                <Text>{per.RoomType}</Text>
                <Text>Price: {per.PricePerNight}</Text>
              </View>
            </View>
        )}
        <View style={{alignItems:"center"}}>
          <Text style={{fontSize:20, padding:10, textDecorationLine: 'underline'}}>Sum Total: {SumTotal}</Text>
        </View>
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
 

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
  detailsBill: {
    flexDirection: "row-reverse",
    alignItems: 'center',
    justifyContent: "space-between",
    paddingBottom: 5,
  },
})