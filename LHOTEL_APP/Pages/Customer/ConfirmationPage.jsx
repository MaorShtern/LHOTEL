import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/Octicons';
import ReservationCard from './ReservationCard'
import AppContext from '../../AppContext';

export default function ConfirmationPage({ route, navigation }) {

    let { the_data } = route.params
    const myContext = useContext(AppContext);
    const roomsReservation = myContext.roomsReservation


    let listCards = the_data.map((room) => <ReservationCard key={room.type} roomType={room.type}
        count={room.count} pricePerNight={room.pricePerNight} entryDate={roomsReservation.EntryDate}
        exitDate={roomsReservation.ExitDate} breakfast={roomsReservation.Breakfast} />)

    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Order Confirmation <Icon name='check' size={40} color='green' /></Text>
            <Text style={styles.SubHeadLine}>Your order has been successfully saved! looking forward to see you!!!</Text>
            {listCards}

            <View>
                <View style={styles.OrderDetails}>
                    <Text style={styles.pay}>Payment details</Text>
                    <Text style={styles.textStyle}>ID : {roomsReservation.CustomerID}</Text>
                    <Text style={styles.textStyle}>total Price : {roomsReservation.totalSum}$</Text>
                    <Text style={styles.textStyle}>Amount Of People : {roomsReservation.AmountOfPeople}</Text>
                    {/* <Text style={styles.textStyle}>Number Of Nights : {customer.NumberOfNights}</Text> */}
                    <Text style={styles.textStyle}>Cardholder's Name: {roomsReservation.CardHolderName}</Text>
                    <Text style={styles.textStyle}>Card Number: ************{roomsReservation.CreditCardNumber.slice(-4)}</Text>

                </View>
            </View>
            {/* curr.CreditCardNumber.slice(-4) */}

            <View style={styles.ButtonContainer}>
                {/* <TouchableOpacity style={styles.button} onPress={Delete}>
                    <Text>Delete order</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text>Home Page</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 30 }}></View>

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    HeadLine: {
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",

    },
    SubHeadLine: {
        fontSize: 21,
        fontWeight: "bold",
        paddingBottom: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
    },
    ButtonContainer: {
        alignItems:"center",
        paddingTop: 10
    },

    pay: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        fontSize: 15
    },
    OrderDetails: {
        width: 350,
        backgroundColor: '#C0C0C0',
        alignSelf: 'center',
        alignItems: 'flex-end',
        padding: 20,
        margin: 5
    },
    textStyle: {
        fontSize: 16,
        paddingVertical: 2,

    },
    button:
    {
        backgroundColor: 'gray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
})