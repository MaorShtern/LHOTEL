import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import Counter from "react-native-counters";
import Back from '../Pic/backround.jpg'
import { useState } from 'react';


export default function CardRoom(props) {

    const [count, SetCount] = useState(0)
    let { roomType, maxCount, details } = props

    const ShowDetails = () => {
        Alert.alert(details)
    }

    const SendCount = (number) => {
        SetCount(number)
        props.SendCount(number, roomType)
    }

    const CheackMaxCount = () => {
        if (maxCount < count)
            return false
        else
            return true
    }


    return (
        <View style={{ paddingBottom: 10 }}>
            <View style={styles.card}>
                <View >
                    <Image style={styles.image} source={Back}></Image>
                </View>
                <Text style={styles.RoomType}>{roomType}</Text>
                <View style={styles.ButtonContainer}>
                    <Counter start={0} style={styles.counter} onChange={SendCount.bind(this)} />
                    <View style={{ width: 70 }}></View>
                    <TouchableOpacity style={styles.button} onPress={ShowDetails}>
                        <Text>Show Details</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {!CheackMaxCount() ? (
                        <Text style={styles.alerts}>*There are'nt such amount of available rooms* </Text>)
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
        width: 100,
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