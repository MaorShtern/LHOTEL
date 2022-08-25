import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {User} from '../Class/User'


export default function Registration({ navigation }) {

    const [arrUsers, setArrUsers] = useState([])

    const [id, setId] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [re_Password, setRe_Password] = useState('')
    const [phone, setPhone] = useState('')


    const CheackFields = () => {
        if (password.length < 9 || password !== re_Password || id.length !== 9 || first_name.length == 0 || last_name.length == 0 || !email.includes('@gmail.com') || phone.length == 0)
            return false
        else {
            Alert.alert("The passwords are Invalid")
            return true
        }

    }


    const Save_User = () => {
        if (CheackFields()) {

            let array = getData()
            let new_user = CreateUser()
            if (array === null) {
                setArrUsers([])
            }
            else {
                setArrUsers(array)
            }

            let new_Array = [...arrUsers, new_user.fields]

            setArrUsers(new_Array)

            saveData(new_Array)

        }


        else
            Alert.alert("All fields must be filled")
    }


    const saveData = async (new_Array) => {
        try {
           
            await AsyncStorage.setItem('@storage_Key_0', JSON.stringify(new_Array), () => {
                Alert.alert("Data Saved")
                navigation.navigate('Login')
            });

        }
        catch (error) {
            Alert.alert(error)
        }
    }




    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key_0')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            Alert.alert(error)
        }
    }


    const CreateUser = () => {
        let user = {
            calssName: User,
            fields: {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                phone: phone
            }
        }
        return user
    }




    const Delete = () => {
        setId('')
        setFirst_name('')
        setLast_name('')
        setEmail('')
        setPassword('')
        setRe_Password('')
        setPhone('')
    }



    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Registration</Text>
            <View style={styles.label}>

                <TextInput value={id} keyboardType='numeric' placeholder="User's ID" style={styles.TextInput}
                    onChangeText={(id) => setId(id)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={first_name} placeholder='First Name' style={styles.TextInput}
                    onChangeText={(first_name) => setFirst_name(first_name)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={last_name} placeholder='Last Name' style={styles.TextInput}
                    onChangeText={(last_name) => setLast_name(last_name)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={email} keyboardType='email-address' placeholder='Email @gmail.com' style={styles.TextInput}
                    onChangeText={(email) => setEmail(email)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={password} placeholder='Password, 9 or more letters' style={styles.TextInput} secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={re_Password} placeholder='Re-Password, 9 or more letters' secureTextEntry={true} style={styles.TextInput}
                    onChangeText={(re_Password) => setRe_Password(re_Password)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={phone} keyboardType='numeric' placeholder='Phone Number' style={styles.TextInput}
                    onChangeText={(phone) => setPhone(phone)}></TextInput>

            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity>
                    <Text style={styles.button} onPress={Delete} >Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.button} onPress={Save_User} >SUBMIT</Text>
                </TouchableOpacity>
               
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    HeadLine: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
      

    },
    label: {
        flex: 2,
        padding: 20,
    },
    TextInput: {
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
        height: 50,
        padding: 10,
    },
    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 20
    },
    button:
    {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10

    },
});