import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from "react";
import Navbar from './Navbar'
import CarouselImages from './CarouselImages'
import Bar from '../Pic/bar.jpg'
import Events from '../Pic/events.jpg'
import Spa from '../Pic/spa.jpg'
import Lobi from '../Pic/lobi.jpg'
import Back from '../Pic/backround.jpg'


export default function Homepage({ route, navigation }) {

    const { full_name } = route.params || " "

    const CheackFull_name = () => {
        if (route.params)
            return true
        else
            return false
    }

    // const [ConUser, SetConUser] = useState('')

    // useEffect(() => { readData(); }, []);


    // const readData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('@ConUser');
    //         Alert.alert("ConUser: " + value);
    //         if (value !== null) {
    //             SetConUser(JSON.stringify(value))
    //         }
    //     } catch (e) {
    //         alert('Failed to fetch the @ConUser from storage');
    //     }
    // };


    const fullAddress = "חדרה"
    const url = Platform.select({
        ios: `maps:0,0?q=${fullAddress}`,
        android: `geo:0,0?q=${fullAddress}`,
    })

    // console.log("ConUser: " + ConUser);

    return (
        <ScrollView>
            <View>
                <Navbar navigation={navigation} />
            </View>
            {/* <Text style={styles.user_Name}>{full_name}</Text> */}
            <View>
            <View>
          {CheackFull_name() ? (
            <Text style={styles.user_Name}>Welcome: {full_name}</Text>)
            : null}
        </View>
            </View>
            <Image source={Back} />
            <Text style={styles.Text}>LHOTEL - DETAILS ABOT THE HOTEL</Text>
            <View style={styles.ButtonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('mailto:maor100maor@example.com')}
                    title="support@example.com">
                    <Text>EMAIL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('tel:052-6211881')}>
                    <Text>CALL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(url)}>
                    <Text>ADDRESS</Text>
                </TouchableOpacity>

            </View>
            <Text style={styles.Text}>POPULERS ROOMS</Text>
            <CarouselImages />
            {/* <View style={{padding:2, paddingBottom:20, paddingTop:20}}>
                <TouchableOpacity style={styles.buttonRooms}>
                    <Text>CHECK ALL ROOMS</Text>
                </TouchableOpacity>
            </View> */}
            <View style={{ height: 10 }}></View>

            <Text style={styles.Text}>ACTIVITES</Text>

            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', paddingTop: 10 }}>
                <Image style={styles.Image} source={Bar} />
                <Image style={styles.Image} source={Events} />
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ paddingRight: 75 }}>BAR</Text>
                <Text style={{ paddingLeft: 75 }}>EVENTS</Text>
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', paddingTop: 10 }}>
                <Image style={styles.Image} source={Spa} />
                <Image style={styles.Image} source={Lobi} />
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ paddingRight: 75 }}>SPA</Text>
                <Text style={{ paddingLeft: 75 }}>LOBI</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Image: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        padding: 5
    },
    Text: {
        backgroundColor: 'black',
        color: 'white',
        fontWeight: "bold",
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
    },
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        justifyContent: 'space-between'
    },
    button:
    {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10
    },
    buttonRooms: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 10,
    },
    user_Name:
    {
        backgroundColor: 'black',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        padding: 10,
    }
});