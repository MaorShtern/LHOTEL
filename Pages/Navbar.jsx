import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Navbar({ navigation }) {

    const [flag, SetFlag] = useState(true)
    const [full_name, SetFullName] = useState('')
  
  
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        
            readData();
        });
        return unsubscribe;
    }, [navigation]);


    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem('@ConUser');
      
            if (value !== null) {
                SetFullName(JSON.parse(value))
                // console.log("full_nameread"+full_name);
            }
        } catch (e) {
            alert('Failed to fetch the input from storage');
        }
    };
   
    const Logout = async () => {
        try {
            await AsyncStorage.removeItem('@ConUser', () => {
                SetFullName('');
            
            });
            Alert.alert("You have logged out")  
        }
        catch (error) {
            Alert.alert(error)
        }
    }
  
    if (flag) {
        return (
            <View style={styles.navbar}>
                <View>
                  <View style={styles.navbarIcon} >
                 
                  {full_name !== ''? <TouchableOpacity ><Text style={styles.headerRight} onPress={() =>  Logout()}>Log Out</Text></TouchableOpacity>: null}
                            <Text style={styles.header}>LHOTEL</Text>
                           
                            <View style={{ width: 10 }}></View>
                            <Icon name='three-bars' size={35} color='white' onPress={() => SetFlag(!flag)} />
                        </View>
                  
                </View>
            </View>
        )
    }
    else {
        return (
            <View>
                <View style={styles.navbar}>
                    <View>
                      
                            <View style={styles.navbarIcon} >

                        <View style={{ width: 10 }}></View>
                                <Icon name='three-bars' size={35} color='white' onPress={() => SetFlag(!flag)} />
                            </View>
                     
                    </View>
                    <View style={styles.containButtons}>
                   
                        <TouchableOpacity style={styles.button} onPress={() => {SetFlag(true),navigation.navigate('Login')}}>
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {SetFlag(true),navigation.navigate('Registration')}}>
                            <Text style={styles.text}>Registration</Text>
                        </TouchableOpacity>
                        { full_name !== ''?     <TouchableOpacity style={styles.button} onPress={() => {SetFlag(true),navigation.navigate('Booking')}}>
                            <Text style={styles.text}>Booking</Text>
                        </TouchableOpacity>: null}
                   
                    </View>
                </View>
   
            </View>
        )
    }
}

const styles = StyleSheet.create({

    navbar: {
        backgroundColor: 'black',
        paddingTop: 10,
        paddingBottom: 10,


    },

    Icon: {
        name: 'three-bars',
        size: 30,
        color: '#000'
    },

    header: {
        color: "white",
        fontSize: 25,
        textAlign: "center",

    },
    headerRight:{
        color: "white",
        fontSize: 17,
        paddingLeft: 160,
       paddingTop: 5,
       color:"#888"
   

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
        fontSize: 20,

        padding: 5
    }

})