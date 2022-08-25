import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import Counter from "react-native-counters";
import { images } from "../../images";



import { useState, useEffect } from 'react';
// import single_room from '../assets/images/single-room.jpg'
// import double_room from '../assets/images/double-room.jpg'
// import suites_room from '../assets/images/suites-room.jpg'


export default function CardRoom(props) {
    useEffect(() => { SetCount(0) }, []);
    let { roomType, details, count } = props

    const [counter, SetCounter] = useState(0)

    const ShowDetails = () => {
        Alert.alert(details)
    }

    const SetCount = (number) => {
        SetCounter(number)
        props.SetCount(number, roomType)
    }

    const CheakCounter = () => {
        return count >= counter

    }
    const roomType_arr = {
        "Single room": images.single_room,
        "Double room": images.double_room, "Suite": images.suites_room
    }



    return (
        <View style={{ paddingBottom: 10 }}>
            <View style={styles.card}>
                <View >
                    <Image style={styles.image} source={roomType_arr[roomType]}></Image>
                </View>
                <Text style={styles.RoomType}>{roomType}</Text>
                <View style={styles.ButtonContainer}>
                    <Counter start={0} max={count + 1} style={styles.counter} onChange={SetCount.bind(this)} />
                    <View style={{ width: 70 }}></View>
                    <TouchableOpacity style={styles.button} onPress={() => ShowDetails()}>
                        <Text>Show Details</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ height: 10 }} ></View>
                    {!CheakCounter() ? (
                        <Text style={styles.alerts}>*There are no available rooms in this amount*</Text>)
                        : null}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        width: 320,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },

    image: {
        width: 200,
        height: 100
    },
    RoomType: {
        textDecorationLine: 'underline',
        fontSize: 20,
        paddingBottom: 20
    },
    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button:
    {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10

    },
    alerts: {
        color: 'red'
    }
})