import { View, ScrollView, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import ReservationCard from './ReservationCard'

export default function ConfirmationPage(props) {

    let { entryDate, exitDate, totalPrice, cardholder_Name, card_Number, amount_of_people } = props
    let numberOfNights = exitDate - entryDate

    return (
        <ScrollView>
            <Text style={styles.HeadLine}>ConfirmationPage</Text>
            <Text style={styles.SubHeadLine}>Your order has been successfully saved! looking forward to see you!!!</Text>

            <View>
                <View style={styles.OrderDetails}>
                    <Text style={styles.pay}>Payment details</Text>
                    <Text>totalPrice: {totalPrice}</Text>
                    <Text>Cardholder's Name: {cardholder_Name}</Text>
                    <Text>Card Number: {card_Number}</Text>
                    <Text>Amount Of People : {amount_of_people}</Text>
                    <Text>Number Of Nights : {numberOfNights}</Text>
                </View>
            </View>
            <ReservationCard />
            <ReservationCard />

            <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text>Delete order</Text>
                </TouchableOpacity>
                {/* <Button title="Delete order" ></Button> */}
            </View>

            {/* <TouchableOpacity title='kfnknvks' style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>vdvdvxv c</Text>
            </TouchableOpacity> */}

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
        textDecorationLine: 'underline'
    },
    SubHeadLine: {
        fontSize: 21,
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
    },
    ButtonContainer: {
        paddingTop: 15,
        width: 200,
        alignSelf: 'center'
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