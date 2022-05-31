import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import Navbar from './Navbar'
import Backroundimage from '../pic/backround-image.jpg'
import CarouselImages from './CarouselImages'


export default function Homepage({ navigation }) {
    return (
        <ScrollView>
            <Navbar navigation={navigation} />
            <Image source={Backroundimage} />
            <Text style={styles.Text}>LHOTEL - DETAILS ABOT THE HOTEL</Text>
            <View style={styles.ButtonContainer}>
                <Button title='EMAIL' ></Button>
                <Button title='CALL' ></Button>
                <Button title='ADDRESS' ></Button>
            </View>
            <Text style={styles.Text}>POPULERS ROOMS</Text>
            <CarouselImages />
            <Button title='CHECK ALL ROOMS' ></Button>
            <Text style={styles.Text}>ACTIVITES</Text>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between',paddingTop:10 }}>
                <Image style={styles.Image} source={Backroundimage} />
                <Image style={styles.Image} source={Backroundimage} />
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between'}}>
                <Text style={{paddingRight:75}}>BAR</Text>
                <Text style={{paddingLeft:75}}>EVENTS</Text>
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between',paddingTop:10 }}>
                <Image style={styles.Image} source={Backroundimage} />
                <Image style={styles.Image} source={Backroundimage} />
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between'}}>
                <Text style={{paddingRight:75}}>SPA</Text>
                <Text style={{paddingLeft:75}}>LOBI</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Image: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain'
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
        padding:30,
        justifyContent:'space-between'
    },
});