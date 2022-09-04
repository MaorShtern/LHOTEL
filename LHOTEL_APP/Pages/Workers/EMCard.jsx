import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { images } from '../../images';


export default function EMCard(props) {


    let { Employee_ID, Description, Employee_Name, Phone_Number,
        Birth_Date, Hourly_Wage, Address, Employee_Code } = props


    const DeleteEmployee = () => {
        props.DeleteEmployee(Employee_ID);
    }

    const EditeDetails = () =>{
        props.EditeDetails(Employee_ID);
    }


    return (
        <View style={styles.card}>
            <View style={styles.details}>
                <Text style={{ paddingRight: 20 }}>Name: {Employee_Name}</Text>
                <Text >ID: {Employee_ID}</Text>
            </View>
            <View style={styles.details}>
                <Text style={{ paddingRight: 10 }}>Role: {Description}</Text>
                <Text >Phone Number: {Phone_Number}</Text>
            </View>

            <View style={styles.details}>
                <Text style={{ paddingRight: 20 }}>Birth Date: {Birth_Date}</Text>
                <Text >Hourly Wage: {Hourly_Wage}</Text>
            </View>
            <View style={styles.details}>

                <Text style={{ paddingRight: 20 }}>Address: {Address}</Text>
                <Text >Employee Code: {Employee_Code}</Text>
            </View>

            <View style={styles.BTNContainer}>
                <TouchableOpacity onPress={EditeDetails}>
                    <Image style={styles.BTNImages} source={images.edit} />
                </TouchableOpacity>
                <TouchableOpacity onPress={DeleteEmployee}>
                    <Image style={styles.BTNImages} source={images.trashCan} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#FFF',
        padding: 25,
        borderRadius: 10,
        marginBottom: 20,
    },
    itemLeft: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
    },
    details: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        padding: 5
    },
    BTNContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    BTNImages: {
        width: 30,
        height: 30,
    },
})