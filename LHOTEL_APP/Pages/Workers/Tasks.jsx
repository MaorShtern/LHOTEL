import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { images } from '../../images';
import TasksCard from './TasksCard';


const RequestType = [
    { label: "Today's tasks", value: "Today's tasks" },
    { label: 'Open Tasks', value: 'Open Tasks' },
    { label: 'Search for a task by employee', value: 'Search for a task by employee' },
    { label: 'Search for a task by number', value: 'Search for a task by number' },
    { label: 'Add New Task', value: 'Add New Task' },
];


const tasksArray = [
    {
        Task_Code: 1, Employee_ID: -1, Task_Name: 'Room Cleaning', Room_Number: 23, Start_Time: '13:00',
        Start_Date: '2022-08-08', End_Time: null, Task_Status: 'Open', Description: 'ggggg'
    },
    {
        Task_Code: 2, Employee_ID: 111, Task_Name: 'Room Cleaning', Room_Number: 23, Start_Time: '13:00',
        Start_Date: '2022-08-08', End_Time: null, Task_Status: 'Close', Description: 'ggggg'
    },
    {
        Task_Code: 3, Employee_ID: 222, Task_Name: 'Room Cleaning', Room_Number: 23, Start_Time: '13:00',
        Start_Date: '2022-08-08', End_Time: "23:20", Task_Status: 'Open', Description: 'ggggg'
    },
    {
        Task_Code: 4, Employee_ID: 333, Task_Name: 'Room Cleaning', Room_Number: 23, Start_Time: '13:00',
        Start_Date: '2022-08-08', End_Time: null, Task_Status: 'Close', Description: 'ggggg'
    },
]


export default function Tasks({ navigation }) {

    // let{role} = props

    const [dropdown, setDropdown] = useState(null);
    const [RequestTask, SetRequestTask] = useState('')

    const [tasks, SetTasks] = useState(tasksArray)

    const Edite_Task_Details = (task_code) => {
        // console.log(task_code);
        // console.log(task_code);
        let taskDetails = tasks.filter((per) => per.Task_Code === task_code)[0]
        // console.log(taskDetails[0]);
        // taskDetails= null
        navigation.navigate('EditTasks',{taskDetails:taskDetails})
    }


    let tasksList = tasks.map((per) => <TasksCard  key={per.Task_Code} Task_Code={per.Task_Code}
        Employee_ID={per.Employee_ID} Task_Name={per.Task_Name} Room_Number={per.Room_Number}
        Start_Date={per.Start_Date} Start_Time={per.Start_Time} End_Time={per.End_Time}
        Task_Status={per.Task_Status} Description={per.Description} Edite_Task_Details={Edite_Task_Details}/>)


   

    const HandelRequest = (request) => {
        if (request === 'Add New Task')
            navigation.navigate('EditTasks')
        else
            alert(request)

        // switch (request) {
        //     case value:

        //         break;

        //     default:
        //         break;
        // }
    }


    let role = 'Manager'

    if (role === 'Manager') {
        return (
            <ScrollView>
                <Text style={styles.HeadLine}>All Tasks</Text>

                {/* <View style={styles.Options}> */}
                {/* <Image style={styles.Plus} source={images.plus} /> */}
                <View style={styles.container}>
                    <Dropdown
                        style={styles.dropdown}
                        data={RequestType}
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        placeholder="Task Request"
                        value={dropdown}
                        onChange={request => { HandelRequest(request.value) }} />
                </View>
                <View style={styles.SaveContainer}>
                    <TouchableOpacity style={styles.Save}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
                {/* </View> */}

                {/* <View style={{ padding: 20 }}>
                    <Image style={styles.Plus} source={images.plus} />
                </View> */}
                <View>
                    {tasksList}
                </View>

            </ScrollView>

        )
    }
    else {
        return (
            <ScrollView>
                <Text>thrthrtbnt</Text>
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
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    container: {
        padding: 10,

    },
    Plus: {
        width: 30,
        height: 30,
    },
    SaveContainer: {
        alignItems: 'center',
    },
    Save: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 15,
        width: 150,
        alignItems: 'center',
    }
})