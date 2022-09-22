import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityIndicator } from "react-native";
import TasksCard from './TasksCard';
import moment from 'moment';
import AppContext from "../../AppContext";


const RequestType = [
    { label: "All Task", value: "All Task" },
    { label: "Today's tasks", value: "Today's tasks" },
    { label: 'Open Tasks', value: 'Open Tasks' },
    { label: 'Add New Task', value: 'Add New Task' },
];


export default function Tasks({ navigation }) {


    const myContext = useContext(AppContext);
    const myEmployee = myContext.employee
    const [dropdown, setDropdown] = useState(null);
    const [tasks, SetTasks] = useState([])
    const [tasksDisplay, SetTasksDisplay] = useState([])
    const [taskToMarkAsDone, SetTaskToMarkAsDone] = useState([])
    const [loading, SetLoading] = useState(false)


    useEffect(() => GetAllTasksFromDB(), [])


    const GetAllTasksFromDB = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            let result = await fetch('http://proj13.ruppin-tech.co.il/GetAllTasks', requestOptions);
            let temp = await result.json();
            // console.log(temp);
            if (temp !== null) {
                SetTasks(temp)
                SetTasksDisplay(temp)
                SetLoading(true)
                return
            }
            else
                GetAllTasksFromDB()
        } catch (error) {
            alert(error)
            SetLoading(true)
        }
    }


    const EditTaskDetails = (taskcode) => {
        let taskDetails = tasks.filter((task) => task.TaskCode === taskcode)[0]
        navigation.navigate('EditTasks', { taskDetails: taskDetails })
    }



    const HandelRequest = (request) => {
        // console.log(request);
        let listTemp = null
        switch (request) {
            case "All Task":
                listTemp = tasks
                break;
            case "Today's tasks":
                listTemp = tasks.filter((task) => task.StartDate === moment(new Date()).format('YYYY-MM-DD'))
                break;
            case "Open Tasks":
                listTemp = tasks.filter((task) => task.TaskStatus === 'Open')
                break;
            case "Add New Task":
                navigation.navigate('EditTasks')
                return;
            default:
                return;
        }
        // console.log(JSON.stringify(listTemp));
        SetTasksDisplay(listTemp)
    }

    const MarkTaskAsDone = (taskCode) => {
        // console.log("Task_Code to Add: " +Task_Code);
        let newArrayTasks = tasksDisplay.filter((task) => task.TaskCode === taskCode)[0]
        let temp = [...taskToMarkAsDone, newArrayTasks]
        // console.log(JSON.stringify(temp));
        SetTaskToMarkAsDone(temp)
    }

    const RemoveFromCheck = (taskCode) => {
        // console.log("Task_Code to remove: " + task_Code);
        // console.log(JSON.stringify(taskToMarkAsDone));
        let newArrayTasks = taskToMarkAsDone.filter((task) => task.TaskCode !== taskCode)
        // console.log(JSON.stringify(newArrayTasks));
        SetTaskToMarkAsDone(newArrayTasks)
    }

    const DeleteTask = async (taskCode) => {
        try {
            SetLoading(false)
            const requestOptions = {
                method: 'DELETE',
                body: JSON.stringify({ taskcode: taskCode }),
                headers: { 'Content-Type': 'application/json' }
            };
            // console.log(requestOptions.body);
            let result = await fetch('http://proj13.ruppin-tech.co.il/DeleteTask', requestOptions);
            let temp = await result.json();
            // console.log(temp);
            if (temp) {
                SetLoading(true)
                GetAllTasksFromDB()
            }
        } catch (error) {
            alert(error)
        }
        SetLoading(true)
    }



    const CloseTask = async () => {
        try {
            SetLoading(false)
            let counter = 0

            for (let index = 0; index < taskToMarkAsDone.length; index++) {
                // console.log(taskToMarkAsDone[index]);
                const requestOptions = {
                    method: 'PUT',
                    body: JSON.stringify({ task_code: taskToMarkAsDone[index].TaskCode }),
                    headers: { 'Content-Type': 'application/json' }
                };
                let result = await fetch('http://proj13.ruppin-tech.co.il/CloseTask', requestOptions);
                let temp = await result.json();
                if (temp) {
                    counter++
                    // GetAllTasksFromDB()
                }
            }
            if (counter > 1){
                alert("All selected tasks have been successfully closed")
                GetAllTasksFromDB()
            }
        } catch (error) {
            alert(error)
            SetLoading(true)
        }
    }


    // console.log(JSON.stringify(taskToMarkAsDone));


    const Spinner = () => (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>
    );


    let tasksList = tasksDisplay.map((task) => <TasksCard key={task.TaskCode} TaskCode={task.TaskCode}
        EmployeeID={task.EmployeeID} TaskName={task.TaskName} RoomNumber={task.RoomNumber}
        StartDate={moment(task.StartDate).format("YYYY-MM-DD")} StartTime={task.StartTime} EndTime={task.EndTime}
        TaskStatus={task.TaskStatus} Description={task.Description} EditTaskDetails={EditTaskDetails}
        MarkTaskAsDone={MarkTaskAsDone} RemoveFromCheck={RemoveFromCheck} DeleteTask={DeleteTask} />)



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
                    <TouchableOpacity style={styles.Save} onPress={CloseTask}>
                        <Text>Save the tasks marked as "Done"</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.items}>
                    {loading ? tasksList : <Spinner />}
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
        padding: 10,
    },
    Save: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 2,
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10

    },
})