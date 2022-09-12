import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { images } from '../../images';
import TasksCard from './TasksCard';
import moment from 'moment';


const RequestType = [
    { label: "All Task", value: "All Task" },
    { label: "Today's tasks", value: "Today's tasks" },
    { label: 'Open Tasks', value: 'Open Tasks' },
    { label: 'Add New Task', value: 'Add New Task' },
];


// const tasksArray = [
//     {
//         Task_Code: 1, Employee_ID: -1, Task_Name: 'Room Cleaning', Room_Number: 23, Start_Time: '13:00',
//         Start_Date: '2022-08-08', End_Time: null, Task_Status: 'Open', Description: 'ggggg'
//     },
//     {
//         Task_Code: 2, Employee_ID: 111, Task_Name: 'Room Cleaning', Room_Number: 23, Start_Time: '13:00',
//         Start_Date: '2022-08-08', End_Time: null, Task_Status: 'Close', Description: 'ggggg'
//     },
//     {
//         Task_Code: 3, Employee_ID: 222, Task_Name: 'Room Cleaning', Room_Number: 23, Start_Time: '13:00',
//         Start_Date: '2022-08-31', End_Time: "23:20", Task_Status: 'Open', Description: 'ggggg'
//     },
//     {
//         Task_Code: 4, Employee_ID: 333, Task_Name: 'Room Cleaning', Room_Number: 23, Start_Time: '13:00',
//         Start_Date: '2022-08-08', End_Time: null, Task_Status: 'Close', Description: 'ggggg'
//     },
// ]


export default function Tasks({ navigation }) {

    // let { id } = route.params

    const [dropdown, setDropdown] = useState(null);
    // const [RequestTask, SetRequestTask] = useState('')
    const [tasks, SetTasks] = useState([])

    const [taskToMarkAsDone, SetTaskToMarkAsDone] = useState([])

    useEffect(() => GetAllTasksFromDB(), [])


    const GetAllTasksFromDB = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            let result = await fetch('http://proj13.ruppin-tech.co.il/GetAllTasks', requestOptions);
            let temp = await result.json();
            if (temp !== null) {
                SetTasks(temp)
                return
            }
            else
                GetAllTasksFromDB()

        } catch (error) {
            alert(error)
        }
    }


    const Edite_Task_Details = (task_code) => {
        let taskDetails = tasks.filter((per) => per.Task_Code === task_code)[0]
        navigation.navigate('EditTasks', { taskDetails: taskDetails })
    }



    const HandelRequest = (request) => {
        let listTemp = null
        switch (request) {
            case "All Task":
                listTemp = tasksArray
                break;
            case "Today's tasks":
                listTemp = tasksArray.filter((per) => per.Start_Date === moment(new Date()).format('YYYY-MM-DD'))
                break;
            case "Open Tasks":
                listTemp = tasksArray.filter((per) => per.Task_Status === 'Open')
                break;
            case "Add New Task":
                navigation.navigate('EditTasks')
                return;
            default:
                return;
        }
        // console.log(JSON.stringify(listTemp));
        SetTasks(listTemp)
    }

    const MarkTaskAsDone = (task_Code) => {
        let newArrayTasks = tasks.filter((per) => per.Task_Code === task_Code)
        let temp = [...taskToMarkAsDone, newArrayTasks]
        console.log(JSON.stringify(temp));
        SetTaskToMarkAsDone(temp)
    }

    const RemoveFromCheck = (Task_Code) => {
        console.log("Task_Code to remove: " + Task_Code);

    }


    // console.log(tasks);

    let tasksList = tasks.map((per) => <TasksCard key={per.Task_Code} Task_Code={per.Task_Code}
        Employee_ID={per.Employee_ID} Task_Name={per.Task_Name} Room_Number={per.Room_Number}
        Start_Date={moment(per.Start_Date).format("YYYY-MM-DD")} Start_Time={per.Start_Time} End_Time={per.End_Time}
        Task_Status={per.Task_Status} Description={per.Description} Edite_Task_Details={Edite_Task_Details}
        MarkTaskAsDone={MarkTaskAsDone} RemoveFromCheck={RemoveFromCheck} />)



    // console.log(JSON.stringify(tasks));

    let role = 'Manager'

    if (role === 'Manager') {
        return (
            <ScrollView>
                <Text style={styles.HeadLine}>All Tasks</Text>
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
                        <Text>Save the tasks marked as "Done"</Text>
                    </TouchableOpacity>
                </View>
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
        alignItems: 'center',
        borderWidth: 2,

    }
})