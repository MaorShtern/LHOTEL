import * as React from 'react';
import {  View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity, StatusBar } from 'react-native';
import CarouselImages from './CarouselImages';
import { images } from "../../images";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const fullAddress = "חדרה"
const url = Platform.select({
    ios: `maps:0,0?q=${fullAddress}`,
    android: `geo:0,0?q=${fullAddress}`,
})



export default function CustomerHome({navigation}) {

    const [user, SetUser] = useState([])


    // useEffect(() => { GetConnectedUser(); }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
         GetConnectedUser();
        });
        return unsubscribe;
    }, [navigation]);


    
    const GetConnectedUser = async() =>{
        try{
            const value = await AsyncStorage.getItem('@user');
            if(value !== null){
                SetUser(JSON.parse(value))
            }
        }
        catch(e) {
            alert(e)
        }
    }

    // console.log(user);

    return (
        <ScrollView><StatusBar style="light" backgroundColor="#000000" />
            <View>
            <Text style={styles.Text}>Username: {user.firstName} {user.lastName}</Text>
                <View style={{ height: 10 }}></View>
            </View>
            <Text style={styles.Text}>DETAILS ABOUT THE HOTEL</Text>
            <View style={styles.ButtonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('mailto:maor100maor@example.com')}
                    title="support@example.com">
                    <Text style={styles.buttonText}>EMAIL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('tel:052-6211881')}>
                    <Text style={styles.buttonText}>CALL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(url)}>
                    <Text style={styles.buttonText}>ADDRESS</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.Text}>POPULERS ROOMS</Text>
            <CarouselImages />

            <View style={{ height: 10 }}></View>

            <Text style={styles.Text}>ACTIVITES</Text>

            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', paddingTop: 10 }}>
                <Image style={styles.Image} source={images.bar} />
                <Image style={styles.Image} source={images.events} />
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ paddingRight: 75 }}>BAR</Text>
                <Text style={{ paddingLeft: 75 }}>EVENTS</Text>
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', paddingTop: 10 }}>
                <Image style={styles.Image} source={images.spa} />
                <Image style={styles.Image} source={images.lobi} />
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ paddingRight: 75 }}>SPA</Text>
                <Text style={{ paddingLeft: 75 }}>LOBI</Text>
            </View>
        </ScrollView>
    );
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
        padding: 10,
    },
    buttonText: {
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10

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
    },
    innerText: {
        color: 'white',
        padding: 5
    }
});  
