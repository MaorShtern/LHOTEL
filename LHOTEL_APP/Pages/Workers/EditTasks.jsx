import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from 'react-native-paper';
import moment from 'moment';
import { useEffect } from 'react';



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


    // console.log(route.params);

    // const GetTime = (date) => {
    //     let stringTime = "0";
    //     if (date.getHours() <= 9) stringTime += date.getHours();
    //     else stringTime = date.getHours();

    //     stringTime += ":";

    //     if (date.getMinutes() <= 9) stringTime += "0" + date.getMinutes();
    //     else stringTime += date.getMinutes();

    //     return stringTime
    // }


    // const [taskNumber, SetTaskNumber] = useState(null)
    // const [roomNumber, SetRoomNumber] = useState(0)
    // const [RequestTask, SetRequestTask] = useState('')
    // const [flagTime, setFlagTime] = useState(false);
    // const [taskStatus, SetTaskStatus] = useState(false);
    // const [taskDescription, SetTaskDescription] = useState('')

    const [dropdown, setDropdown] = useState(null);
    // const [taskName, SetTaskName] = useState('')
    const [flagTime, setFlagTime] = useState(false);
    const [taskStatus, SetTaskStatus] = useState(false);
    const [task, SetTask] = useState({
        Task_Code: null, Employee_ID: null, Task_Name: '', Room_Number: 0, Start_Time: moment(new Date()).format('HH:MM'),
        Start_Date: moment(new Date()).format('YYYY-MM-DD'), End_Time: null, Task_Status: 'Open', Description: ''
    })


    useEffect(() => {
        if (route.params !== undefined) {
            SetTask(route.params.taskDetails)
        }
    }, [])
    // const[flagTaskStatus, SetflagTaskStatus] = useState(false);

    // console.log("task: " + JSON.stringify(task));


    const hideTime = () => {
        setFlagTime(false);
    };

    const showTime = () => {
        setFlagTime(true);
    };


    const handleTime = (time) => {
        let stringTime = "0";
        if (time.getHours() <= 9) stringTime += time.getHours();
        else stringTime = time.getHours();

        stringTime += ":";

        if (time.getMinutes() <= 9) stringTime += "0" + time.getMinutes();
        else stringTime += time.getMinutes();

        task.Start_Time = stringTime
        // setTime(stringTime);
        hideTime();
    };


    // const entry = moment(entryDate).format('YYYY-MM-DD')
    // const exit = moment(exitDate).format('YYYY-MM-DD')


    const HandelRequest = (request) => {
        task.Task_Name = request
        // console.log( task.Task_Name);
        // SetRequestTask(request)
    }

    const HandelTaskStatus = () => {

    }

    // if (route.params !== undefined) {
    //     let { taskDetails } = route.params

    //     // SetTaskStatus(taskDetails.Task_Status)
    //     console.log(taskDetails);

    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Tasks</Text>
            {/* <Text style={styles.SumHeadLine}>Task number: {taskDetails.Task_Code}</Text> */}
            <Text style={styles.SumHeadLine}>Task number: {task.Task_Code}</Text>

            <View style={styles.DetailsContainer}>

                <Text style={{ paddingLeft: 15 }}>Employee ID:</Text>
                <TextInput
                    label={JSON.stringify(task.Employee_ID)}
                    placeholder={JSON.stringify(task.Employee_ID)}
                    left={<TextInput.Icon name="account" />}
                    mode="outlined"
                    keyboardType='numeric'
                    style={{ margin: 10, paddingLeft: 3 }}
                // onChangeText={(id) => console.log(id)}
                />

                <Text style={{ paddingLeft: 15 }}>Room Number:</Text>
                <TextInput
                    label={JSON.stringify(task.Room_Number)}
                    placeholder={JSON.stringify(task.Room_Number)}
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
                        onChange={taskName => { HandelRequest(taskName.value) }} />
                </View>

                <View >
                    <TouchableOpacity style={styles.button} onPress={showTime}>
                        <Text>{"Time: " + task.Start_Time}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={flagTime}
                        mode="time"
                        onConfirm={handleTime}
                        onCancel={hideTime}
                    />
                    <View style={{ height: 20 }}></View>
                </View>


                <View style={styles.CheckboxContainer}>

                    <View style={styles.Checkbox}>
                        <Checkbox label="Item" status={task.Task_Status === 'Open' ? 'checked' : 'unchecked'} />
                        <Text>Open</Text>

                    </View>
                    <View style={styles.Checkbox}>
                        <Checkbox label="Item" status={task.Task_Status === 'Close' ? 'checked' : 'unchecked'} />
                        <Text>Close</Text>
                    </View>

                    {/* <View style={styles.Checkbox}>
                        <Checkbox label="Item" status={taskStatus ? 'checked' : 'unchecked'} onPress={() => { SetTaskStatus(!taskStatus) }} />
                        <Text>Open</Text>
                    </View>
                    <View style={styles.Checkbox}>
                        <Checkbox label="Item" status={taskStatus ? 'checked' : 'unchecked'} onPress={() => { SetTaskStatus(!taskStatus) }} />
                        <Text>Close</Text>
                    </View> */}

                </View>



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
    // }

    // else {
    //     return (
    //         <ScrollView>
    //             <Text style={styles.HeadLine}>Tasks</Text>
    //             {/* <Text style={styles.SumHeadLine}>Task number: {taskDetails.Task_Code}</Text>
    //             <View style={styles.DetailsContainer}>

    //                 <TextInput
    //                     label="Employee_Name"
    //                     left={<TextInput.Icon name="account" />}
    //                     mode="outlined"
    //                     style={{ margin: 10, paddingLeft: 3 }}
    //                 onChangeText={(id) => console.log(id)}
    //                 />
    //                 <TextInput
    //                     label="Room_Number"
    //                     left={<TextInput.Icon name="" />}
    //                     mode="outlined"
    //                     keyboardType='numeric'
    //                     style={{ margin: 10, paddingLeft: 3 }}
    //                 onChangeText={(id) => console.log(id)}
    //                 />
    //                 <TextInput
    //                 label="Start_Date"
    //                 left={<TextInput.Icon />}
    //                 mode="outlined"
    //                 style={{ margin: 10, paddingLeft: 3 }}
    //             onChangeText={(id) => console.log(id)}
    //             />
    //                 <Text>Task_Name : DropDown</Text>

    //                 <Text>Start_Date : DatePiker</Text>
    //                 <Text>Start_Time : TimePiker</Text>
    //                 <Text>End_Date : DatePiker</Text>
    //                 <Text>Task_Status : DropDown / CheckBox</Text>

    //                 <TextInput
    //                     label="Description"
    //                     left={<TextInput.Icon />}
    //                     mode="outlined"
    //                     style={{ margin: 10, paddingLeft: 3 }}
    //                 onChangeText={(id) => console.log(id)}
    //                 />
    //             </View> */}
    //         </ScrollView>
    //     )
    // }
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
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        margin: 5
    },
    Checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    CheckboxContainer: {
        margin: 5
    },
})