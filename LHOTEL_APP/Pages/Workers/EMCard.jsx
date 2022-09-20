import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { images } from '../../images';
import moment from 'moment/moment';

export default function EMCard(props) {


    let { EmployeeID, Description, EmployeeName, PhoneNumber,
        BirthDate, HourlyWage, Address, EmployeeCode } = props


    const DeleteEmployee = () => {
        props.DeleteEmployee(EmployeeID);
    }

    const EditDetails = () =>{
        props.EditDetails(EmployeeID);
    }


    return (
        <View style={styles.card}>
            <View style={styles.details}>
                <Text style={{ paddingRight: 20 }}>Name: {EmployeeName}</Text>
                <Text >ID: {EmployeeID}</Text>
            </View>
            <View style={styles.details}>
                <Text style={{ paddingRight: 10 }}>Role: {Description}</Text>
                <Text >Phone: {PhoneNumber}</Text>
            </View>

            <View style={styles.details}>
                <Text style={{ paddingRight: 20 }}>Birth Date: {moment(BirthDate).format('YYYY-MM-DD')}</Text>
                {/* <Text >Hourly Wage: {Hourly_Wage}</Text> */}
            </View>
            <Text style={{paddingLeft:5}}>Hourly Wage: {HourlyWage}</Text>

            <View style={styles.details}>

                <Text style={{ paddingRight: 20 }}>Address: {Address}</Text>
                <Text >Employee Code: {EmployeeCode}</Text>
            </View>

            <View style={styles.BTNContainer}>
                <TouchableOpacity onPress={EditDetails}>
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