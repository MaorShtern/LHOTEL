import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/Octicons';

export default function Navbar({ navigation }) {
    const [flag, SetFlag] = useState(true)


    if (flag === true) {
        return (
            <View style={styles.navbar}>
                <View>
                    <TouchableOpacity onPress={() => SetFlag(!flag)}>
                        <View style={styles.navbarIcon} >
                            <Text style={styles.header}>Menu</Text>
                            <View style={{ width: 10 }}></View>
                            <Icon name='three-bars' size={30} color='white' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else {
        return (
            <View>
                <View style={styles.navbar}>
                    <View>
                        <TouchableOpacity onPress={() => SetFlag(!flag)}>
                            <View style={styles.navbarIcon} >
                                <Text style={styles.header}>Menu</Text>
                                <View style={{ width: 10 }}></View>
                                <Icon name='three-bars' size={30} color='white' />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containButtons}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Homepage')}>
                            <Text style={styles.text}>Homepage</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registration')}>
                            <Text style={styles.text}>Registration</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Booking')}>
                            <Text style={styles.text}>Booking</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={{height:10}}></View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navbar: {
        backgroundColor: 'black',
    },

    Icon: {
        name: 'three-bars',
        size: 30,
        color: '#000'
    },

    header: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
        textDecorationLine: 'underline'
    },
    navbarIcon:
    {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'flex-end'

    },
    containButtons: {
    },
    button: {
        backgroundColor: 'black',
        alignItems: "center",

    },
    text: {
        color: 'white',
        textDecorationLine: 'underline',
        padding: 5
    }

})