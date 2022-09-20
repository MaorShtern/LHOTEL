import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Octicons';
import ReservationCard from './ReservationCard'

export default function ConfirmationPage( { route, navigation }) {

    // { route, navigation }

    let {customer , the_data } = route.params
    const curr = customer.fields
console.log(curr);

    // const Delete = async () => {
    //     const requestOptions = {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' }
    //     };
    //     let result = await fetch('http://proj13.ruppin-tech.co.il/api/Customers/' + id, requestOptions);
    //     let deleteResult = await result.json();
    //     if (deleteResult) {
    //         alert("The order has been removed")
    //         navigation.navigate('Homepage')
    //     }
    //     else {
    //         alert("ERROR")
    //     }

    // }


    let listCards = the_data.map((room) => <ReservationCard key={room.type} roomType={room.type} count={room.count}
        pricePerNight={room.pricePerNight} entryDate={curr.EntryDate} exitDate={curr.ExitDate} breakfast={true} />)
       
    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Order Confirmation <Icon name='check' size={40} color='green' /></Text>
            <Text style={styles.SubHeadLine}>Your order has been successfully saved! looking forward to see you!!!</Text>
            {listCards}

            <View>
                <View style={styles.OrderDetails}>
                    <Text style={styles.pay}>Payment details</Text>
                    <Text>ID: {curr.CustomerID}</Text>
                    <Text>total Price: $</Text>
                    <Text>Cardholder's Name: {curr.CardHolderName}</Text>
                    <Text>Card Number: {curr.CreditCardNumber}</Text>
                    <Text>Number Of Nights : </Text>
                </View>
            </View>


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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        justifyContent: 'space-between',
        paddingTop: 5
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    pay: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        fontSize: 15
    },
    OrderDetails: {
        width: 300,
        backgroundColor: 'gray',
        alignSelf: 'center',
        alignItems: 'flex-end',
        padding: 20,
        margin: 5
    },
    button:
    {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'

    },
})