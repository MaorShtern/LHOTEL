import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import React from 'react'



export default function ReservationCard(props) {


    let { roomType,count , pricePerNight, entryDate, exitDate, breakfast} = props



    return (
        <ScrollView>
            <View style={styles.OrderDetails}>
               
                <View >
                    <Text>ROOM TYPE: {roomType}</Text>
                    <Text>{entryDate} -- {exitDate}</Text>
                    <Text>Amount per room: {count}</Text>
                    <Text>breakfast: {breakfast ? <Text>Yes</Text> : <Text>No</Text>}</Text>
                 
                    <Text>Price Per Night: {pricePerNight}$</Text>
                </View>
            </View>
        </ScrollView>
    )
}




const styles = StyleSheet.create({
    OrderDetails: {
        width: 300,
        backgroundColor: 'gray',
        alignSelf: 'center',
        alignItems: 'flex-end',
        padding: 20,
        margin: 5
    },
    Image: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    pay: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        fontSize: 15
    }
})