import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { TextInput } from "react-native-paper";
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Counter from "react-native-counters";
import { images } from '../../images';


const Roles = [
    { label: "General", value: "General" },
    { label: "Manager", value: "Manager" },
    { label: "Receptionist", value: "Receptionist" },
    { label: "Room service", value: "Room service" },
];

export default function UpdateDetails({ route, navigation }) {

    const [dropdown, setDropdown] = useState(null);
    const [flagDate, setFlagDate] = useState(false)

    let { employee } = route.params


    const showDate = () => {
        setFlagDate(true);
    };
    const hideDate = () => {
        setFlagDate(false);
    };
    const handleDate = (date) => {
        let dateString = moment(date).format('YYYY-MM-DD')
        // setFlagDate(date)
        // console.log(dateString);
        employee.BirthDate = dateString
        hideDate()
    };

    const CheckDetails = () => {
        if (employee.EmployeeName !== "" && employee.HourlyWage > 0 && employee.PhoneNumber !== "")
            return true
        else
            return false
    }

    // console.log(JSON.stringify(employee));


    const SaveEmployeeToDB = async () => {
        // navigation.goBack()
        try {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify(employee),
                headers: { 'Content-Type': 'application/json' }
            };
            // console.log(requestOptions.body);
            let result = await fetch('http://proj13.ruppin-tech.co.il/AlterEmployeeById', requestOptions);
            if (result) {
                alert("Employee details have been saved successfully")
                navigation.goBack()
            }
        } catch (error) {
            alert(error)
        }

    }



    const SaveUser = () => {
        // console.log(employee);

        if (CheckDetails()) {
            return Alert.alert(
                "Saving employee details",
                "Are you sure these are the details for the employee?",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            // employee.Birth_Date = moment(employee.Birth_Date).format('YYYY-MM-DD')
                            SaveEmployeeToDB()
                        },
                    },
                    { text: "No", },
                ]
            );
        }

    }
    // console.log(employee);


    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Update Details</Text>
            <View style={styles.DetailsContainer}>
                <View>
                    <Text style={{
                        alignSelf: "center", paddingBottom: 10, textDecorationLine: 'underline',
                    }}>Employee ID: {employee.EmployeeID}</Text>
                </View>
                <View>
                    <Text style={{ paddingLeft: 15 }}>Employee Name:</Text>
                    <TextInput
                        label={JSON.stringify(employee.EmployeeName)}
                        placeholder={JSON.stringify(employee.EmployeeName)}
                        left={<TextInput.Icon name="account" />}
                        mode="outlined"
                        style={{ margin: 5, paddingLeft: 3 }}
                        onChangeText={(name) => employee.EmployeeName = name}
                    />
                </View>
                <View style={styles.container}>
                    <Dropdown
                        style={styles.dropdown}
                        data={Roles}
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        placeholder="Role Description"
                        value={dropdown}
                        onChange={role => { employee.Description = role.value }}
                    />
                </View>

                <View>
                    <Text style={{ paddingLeft: 15 }}>Phone Number:</Text>
                    <TextInput
                        label={JSON.stringify(employee.PhoneNumber)}
                        placeholder={JSON.stringify(employee.PhoneNumber)}
                        left={<TextInput.Icon name="account" />}
                        keyboardType='numeric'
                        mode="outlined"
                        style={{ margin: 5, paddingLeft: 3 }}
                        onChangeText={(number) => employee.PhoneNumber = number}
                    />
                </View>

                <View>
                    <DateTimePickerModal
                        isVisible={flagDate}
                        mode="date"
                        onConfirm={handleDate}
                        onCancel={hideDate} />
                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity style={styles.button} onPress={showDate}>
                        <Text>{"Birth Date: " + moment(employee.BirthDate).format('YYYY-MM-DD')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.counterStyle}>
                    <Counter
                        initial={employee.HourlyWage}
                        start={employee.HourlyWage}
                        onChange={(count) => { employee.HourlyWage = count }}
                    />
                    <Text style={{ paddingRight: 10 }}>Hourly_Wage: </Text>
                </View>

                <View>
                    <Text style={{ paddingLeft: 15 }}>Address:</Text>
                    <TextInput
                        label={JSON.stringify(employee.Address)}
                        placeholder={JSON.stringify(employee.Address)}
                        left={<TextInput.Icon name="account" />}
                        mode="outlined"
                        style={{ margin: 5, paddingLeft: 3 }}
                        onChangeText={(address) => employee.Address = address}
                    />
                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 20,
                }}>
                    <TouchableOpacity style={styles.button} onPress={SaveUser}>
                        <Image style={styles.save} source={images.save} />
                    </TouchableOpacity>
                </View>

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
        textDecorationLine: 'underline',
    },
    SumHeadLine: {
        fontSize: 15,
        alignItems: "center",
        textAlign: "center",
        padding: 20,
        textDecorationLine: 'underline',
    },
    DetailsContainer: {
        paddingHorizontal: 24,
        justifyContent: "center",
        paddingTop: 10
    },
    container: {
        paddingBottom: 15,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    button:
    {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10

    },
    save: {
        width: 30,
        height: 30
    },
    counterStyle: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        // borderColor:"black",
        // borderWidth:1,
    },

})