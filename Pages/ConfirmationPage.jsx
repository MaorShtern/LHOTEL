import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Octicons';
import ReservationCard from './ReservationCard'

export default function ConfirmationPage({ route, navigation }) {


    const [arrRooms, setarrRooms] = useState([])

    //  let { entryDate, exitDate ,number_Of_Nights, breakfast} = route.params
    let { the_data, number_Of_Nights, breakfast,
        entryDate, exitDate, total, Name, CardNum } = route.params

    // console.log(entryDate);
    // console.log(exitDate);

    // useEffect(() => { CrateListCards() }, []);


    // // let { entryDate, exitDate, totalPrice, cardholder_Name, card_Number, amount_of_people } = props
    // // let numberOfNights = exitDate - entryDate
    // // const persons = [];
    // const CrateListCards = () => {

    //     the_data.map((per) => console.log(JSON.stringify(per)))

    // let arr = [];
    // let counter = 0;
    // console.log("the_data:" + JSON.stringify(the_data));
    // the_data.map((the_data) => {
    //     for (let i = 0; i < the_data.count; i++) {
    // arr.push(<ReservationCard key={counter} roomType={the_data.type} pricePerNight={the_data.pricePerNight}
    //     entryDate={entryDate} exitDate={exitDate} breakfast={breakfast} />)
    //         counter++;
    //     }
    // })

    //     // { roomType, pricePerNight, entryDate, exitDate, breakfast}
    //     // for (let i = 0; i<item; i++){
    //     // console.log(item);
    //     // console.log(index);
    //     //   }
    //     //   console.log(arrRooms.length);
    //     //   //setarrRooms(arrRooms)
    //     //   return arrRooms;


    //     setarrRooms(arr)
    // roomType,count , pricePerNight, entryDate, exitDate, breakfast
    // }

    let listCards = the_data.map((per) => <ReservationCard key={per.type} roomType={per.type} count={per.count}
        pricePerNight={per.pricePerNight} entryDate={entryDate} exitDate={exitDate} breakfast={breakfast} />)

    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Order Confirmation <Icon name='check' size={40} color='green' /></Text>
            <Text style={styles.SubHeadLine}>Your order has been successfully saved! looking forward to see you!!!</Text>
            {listCards}
            {/* {rooms.map((item)=>{
                
                if (item >0)
                { 
                 for (let i = 0; i<item; i++){
                    arrRooms.push(<ReservationCard key={counter} roomType ={counter}  pricePerNight= {70} entryDate={entryDate} exitDate={exitDate} breakfast={false} amountOfRooms = {2}/>) 
                    counter++;
                 }
                 return arrRooms
                }
            // for (let i = 0; i<item; i++){
             
                // console.log(item);
                // console.log(index);
            //   }
            //   console.log(arrRooms.length);
            //   //setarrRooms(arrRooms)
            //   return arrRooms;

  })} */}
            {/* <ReservationCard />
            <ReservationCard /> */}
            <View>
                <View style={styles.OrderDetails}>
                    <Text style={styles.pay}>Payment details</Text>
                    <Text>total Price: {total}$</Text>
                    <Text>Cardholder's Name: {Name}</Text>
                    <Text>Card Number: {CardNum}</Text>
                    <Text>Number Of Nights : {number_Of_Nights}</Text>
                </View>
            </View>


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