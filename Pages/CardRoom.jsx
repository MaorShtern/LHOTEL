import { View, Text, StyleSheet, Image, Alert,TouchableOpacity } from 'react-native'
import React from 'react'
import Counter from "react-native-counters";
import Back from '../Pic/backround.jpg'

export default function CardRoom(props) {

    let { roomType, details, amount } = props


    const ShowDetails = () => {
        Alert.alert(details)
    }

    return (
        <View style={{paddingBottom:10}}>
            <View style={styles.card}>
                <View >
                    <Image style={styles.image} source={Back}></Image>
                </View>
                <Text style={styles.RoomType}>Single Room</Text>

                <View style={styles.ButtonContainer}>
                    <Counter start={1} style={styles.counter} />
                    <View style={{ width: 70 }}></View>
                    <TouchableOpacity style={styles.button} onPress={() => ShowDetails()}>
                        <Text>Show Details</Text>
                    </TouchableOpacity>
                    {/* <Button style={styles.button} title='Show Details' onPress={() => ShowDetails()}></Button> */}
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
})