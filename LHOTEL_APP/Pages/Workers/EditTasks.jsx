import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';



const RequestType = [
    { label: "Room Cleaning", value: "Room Cleaning" },
    { label: 'Room Service', value: 'Room Service' },
    { label: 'Change of towels', value: 'Change of towels' },
    { label: 'Refill mini bar', value: 'Refill mini bar' },
    { label: 'Check-in Customer', value: 'Check-in Customer' },
    { label: 'Check-out Customer', value: 'Check-out Customer' },
    { label: 'Reception desk arrangement', value: 'Reception desk arrangement' },

];



export default function EditTasks({ route, navigation }) {

    const [dropdown, setDropdown] = useState(null);
    const [RequestTask, SetRequestTask] = useState('')

    const [flagEnrty, SetFlagEntry] = useState(false)
    const [flagExit, SetFlagExit] = useState(false)

    const [entryDate, SetEntryDate] = useState(new Date())
    const [exitDate, SetExitDate] = useState(new Date())


    const showDatePickerEntry = () => {
        SetFlagEntry(true);
    };
    const hideDatePickerEntry = () => {
        SetFlagEntry(false);
    };
    const showDatePickerExit = () => {
        SetFlagExit(true);
    };
    const hideDatePickerExit = () => {
        SetFlagExit(false);
    };
    const handleConfirmEnteryDate = (date) => {
        SetEntryDate(date)
        hideDatePickerEntry()
    };

    const handleConfirmExitDate = (date) => {
        SetExitDate(date)
        hideDatePickerExit()
    };

    // const entry = moment(entryDate).format('YYYY-MM-DD')
    // const exit = moment(exitDate).format('YYYY-MM-DD')




    const HandelRequest = (request) => {
        SetRequestTask(request)
    }

    if (route.params !== undefined) {
        let { taskDetails } = route.params

        console.log(taskDetails);

        return (
            <ScrollView>
                <Text style={styles.HeadLine}>Tasks</Text>
                <Text style={styles.SumHeadLine}>Task number: {taskDetails.Task_Code}</Text>
                <View style={styles.DetailsContainer}>

                    <TextInput
                        label="Employee_ID"
                        placeholder={JSON.stringify(taskDetails.Employee_ID)}
                        left={<TextInput.Icon name="account" />}
                        mode="outlined"
                        keyboardType='numeric'
                        style={{ margin: 10, paddingLeft: 3 }}
                    // onChangeText={(id) => console.log(id)}
                    />
                    <TextInput
                        label="Room_Number"
                        placeholder={JSON.stringify(taskDetails.Room_Number)}

                        left={<TextInput.Icon name="" />}
                        mode="outlined"
                        keyboardType='numeric'
                        style={{ margin: 10, paddingLeft: 3 }}
                    // onChangeText={(id) => console.log(id)}
                    />
                    {/* <TextInput
                    label="Start_Date"
                    left={<TextInput.Icon />}
                    mode="outlined"
                    style={{ margin: 10, paddingLeft: 3 }}
                // onChangeText={(id) => console.log(id)}
                /> */}

                    <View style={styles.container}>
                        <Dropdown
                            style={styles.dropdown}
                            data={RequestType}
                            searchPlaceholder="Search"
                            labelField="label"
                            valueField="value"
                            placeholder="Task Request"
                            value={dropdown}
                            onChange={request => { SetRequestTask(request.value) }} />
                    </View>


                    {/* <DateTimePickerModal
                        isVisible={flagEnrty}
                        mode="date"
                        onConfirm={handleConfirmEnteryDate}
                        onCancel={hideDatePickerEntry} />
                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity style={styles.button} onPress={showDatePickerExit} >
                        <Text>{"Start date: " + entry}</Text>
                    </TouchableOpacity>


                    <DateTimePickerModal
                        isVisible={flagExit}
                        mode="date"
                        onConfirm={handleConfirmExitDate}
                        onCancel={hideDatePickerExit} />
                    <TouchableOpacity style={styles.button} onPress={showDatePickerExit} >
                        <Text>{"End date: " + exit}</Text>
                    </TouchableOpacity> */}


                    <Text>Start_Date : DatePiker</Text>
                    {/* <Text>Start_Time : TimePiker</Text> */}
                    <Text>End_Date : DatePiker</Text>
                    <Text>Task_Status : DropDown / CheckBox</Text>

                    <TextInput
                        label="Description"
                        left={<TextInput.Icon />}
                        mode="outlined"
                        style={{ margin: 10, paddingLeft: 3 }}
                    // onChangeText={(id) => console.log(id)}
                    />
                </View>
            </ScrollView>
        )
    }

    else {
        return (
            <ScrollView>
                <Text style={styles.HeadLine}>Tasks</Text>
                {/* <Text style={styles.SumHeadLine}>Task number: {taskDetails.Task_Code}</Text>
                <View style={styles.DetailsContainer}>

                    <TextInput
                        label="Employee_Name"
                        left={<TextInput.Icon name="account" />}
                        mode="outlined"
                        style={{ margin: 10, paddingLeft: 3 }}
                    onChangeText={(id) => console.log(id)}
                    />
                    <TextInput
                        label="Room_Number"
                        left={<TextInput.Icon name="" />}
                        mode="outlined"
                        keyboardType='numeric'
                        style={{ margin: 10, paddingLeft: 3 }}
                    onChangeText={(id) => console.log(id)}
                    />
                    <TextInput
                    label="Start_Date"
                    left={<TextInput.Icon />}
                    mode="outlined"
                    style={{ margin: 10, paddingLeft: 3 }}
                onChangeText={(id) => console.log(id)}
                />
                    <Text>Task_Name : DropDown</Text>

                    <Text>Start_Date : DatePiker</Text>
                    <Text>Start_Time : TimePiker</Text>
                    <Text>End_Date : DatePiker</Text>
                    <Text>Task_Status : DropDown / CheckBox</Text>

                    <TextInput
                        label="Description"
                        left={<TextInput.Icon />}
                        mode="outlined"
                        style={{ margin: 10, paddingLeft: 3 }}
                    onChangeText={(id) => console.log(id)}
                    />
                </View> */}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    HeadLine: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 50,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        textDecorationLine: 'underline',

    },
    SumHeadLine: {
        alignItems: "center",
        textAlign: "center",
        padding: 20,
        textDecorationLine: 'underline',


    },
    DetailsContainer: {
        paddingHorizontal: 24,
        // paddingVertical: 70,
        justifyContent: "center",
        paddingTop: 10

    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    container: {
        padding: 10,

    },
    button:
    {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10

    },
})