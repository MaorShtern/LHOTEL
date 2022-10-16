import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from 'react-native-paper';
import moment from 'moment';
import { useEffect } from 'react';
import { images } from '../../images';


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
    const [flagStartTime, setFlagStartTime] = useState(false);
    const [flagEndTime, setFlagEndTime] = useState(false);


    const [taskStatus, SetTaskStatus] = useState(false);
    const [task, SetTask] = useState({
        TaskCode: null, EmployeeID: null, TaskName: '', RoomNumber: 0, StartTime: moment(new Date()).format('HH:MM'),
        StartDate: moment(new Date()).format('YYYY-MM-DD'), EndTime: null, TaskStatus: 'Open', Description: ''
    })


    useEffect(() => {
        if (route.params !== undefined) {
            SetTask(route.params.taskDetails)
            SetTaskStatus(route.params.taskDetails.TaskStatus === 'Open' ? true : false)
        }
    }, [])



    const hideStartTime = () => {
        setFlagStartTime(false);
    };

    const showStartTime = () => {
        setFlagStartTime(true);
    };

    const hideEndTime = () => {
        setFlagEndTime(false);
    };

    const showEndTime = () => {
        setFlagEndTime(true);
    };


    const handleTime = (time) => {
        let stringTime = "0";
        if (time.getHours() <= 9) stringTime += time.getHours();
        else stringTime = time.getHours();

        stringTime += ":";

        if (time.getMinutes() <= 9) stringTime += "0" + time.getMinutes();
        else stringTime += time.getMinutes();

        return stringTime
 
    };

    const handelTimeStart = (time) => {
        let stringTime = handleTime(time)
        task.StartTime = stringTime
        hideStartTime()
    }

    const handelTimeEnd = (time) => {
        let stringTime = handleTime(time)
        task.EndTime = stringTime
        hideEndTime()
    }

    const HandelRequest = (request) => {
        task.TaskName = request
    }

    const HandelTaskStatus = () => {
        SetTaskStatus(!taskStatus)
        if (taskStatus !== true)
            task.TaskStatus = 'Open'
        else
            task.TaskStatus = 'Close'
    }

    const CheckValues = () => {
        if (task.EmployeeID !== null && task.RoomNumber > 0 && task.TaskName !== '')
            return true
        else
            return false
    }


    const AlterTask = async () => {
        try {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            };
            console.log(requestOptions.body);
            let result = await fetch('http://proj13.ruppin-tech.co.il/AlterTask', requestOptions);
            if (result) {
                alert("Task details successfully saved")
                navigation.goBack()
            }

        } catch (error) {
            alert(error)
        }
    }


    const AddNewTask = async () => {
        try {
            if(!CheckValues())
            {
                alert("The fields are not filled correctly")
                return
            }
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            };
            // console.log(requestOptions.body);
            let result = await fetch('http://proj13.ruppin-tech.co.il/AddNewTask', requestOptions);
            if (result) {
                alert("Task details successfully saved")
                navigation.goBack()
            }
        } catch (error) {
            alert(error)
        }
    }



    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Edit Task</Text>
            {task.TaskCode !== null ?
                <View>
                    <Text style={styles.SumHeadLine}>Task number: {task.TaskCode}</Text>
                </View> : null}
            {/* <Text style={styles.SumHeadLine}>Task number: {task.Task_Code}</Text> */}
            <View style={styles.DetailsContainer}>
                <Text style={{ paddingLeft: 15 }}>Employee ID:</Text>
                <TextInput
                    // label={JSON.stringify(task.EmployeeID)}
                    placeholder={JSON.stringify(task.EmployeeID)}
                    // right={<TextInput.Icon name="account" />}
                    mode="outlined"
                    keyboardType='numeric'
                    style={{ margin: 10, paddingLeft: 3 }}
                    onChangeText={(id) => task.EmployeeID = id}
                />

                <Text style={{ paddingLeft: 15 }}>Room Number:</Text>
                <TextInput
                    // label={JSON.stringify(task.RoomNumber)}
                    placeholder={JSON.stringify(task.RoomNumber)}
                    // left={<TextInput.Icon name="" />}
                    mode="outlined"
                    keyboardType='numeric'
                    style={{ margin: 10, paddingLeft: 3 }}
                    onChangeText={(room) => task.RoomNumber = room}
                />

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

                <View  style={styles.timeStyle}>
                
                    <TouchableOpacity onPress={showStartTime}>
                    
                        <Text style={{fontSize:18}}>{task.StartTime}</Text>
                    </TouchableOpacity>
                    <TextInput.Icon name="clock" size ={25}/>
                    </View>
                    <DateTimePickerModal
                        isVisible={flagStartTime}
                        mode="time"
                        onConfirm={handelTimeStart}
                        onCancel={hideStartTime}
                    />
                    <TouchableOpacity style={styles.button} onPress={showEndTime}>
                        <Text>{"To Do By: " + task.EndTime}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={flagEndTime}
                        mode="time"
                        onConfirm={handelTimeEnd}
                        onCancel={hideEndTime}
                    />
                    {/* <View style={{ height: 20 }}></View> */}
              


                <View style={styles.CheckboxContainer}>

                    <View style={styles.Checkbox}>
                        <Checkbox label="Item" status={taskStatus === true ? 'checked' : 'unchecked'}
                            onPress={HandelTaskStatus} />
                        <Text>Should the task be performed?</Text>

                    </View>
                </View>
                <View>
                    <TextInput
                        label={task.Description}
                        left={<TextInput.Icon />}
                        mode="outlined"
                        style={{ margin: 10, paddingLeft: 3 }}
                        onChangeText={(description) => task.Description = description}
                    />
                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity style={styles.button}
                        onPress={task.TaskCode !== null ? AlterTask : AddNewTask} >
                        <Image style={styles.save} source={images.save} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    )
}


const styles = StyleSheet.create({
    HeadLine: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 50,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
     

    },
    SumHeadLine: {
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
    save: {
        width: 30,
        height: 30
    },
    timeStyle:{
        flexDirection: "row-reverse",
        alignItems: "center",
        alignSelf:'flex-end',
        justifyContent: "space-between",
        paddingHorizontal: 30,
    },
})