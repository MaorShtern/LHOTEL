import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper';
import { images } from '../../images';



export default function TasksCard(props) {


    let { TaskCode, EmployeeID, TaskName, RoomNumber, StartDate, StartTime,
        EndTime, TaskStatus, Description } = props


    const [flag, SetFlag] = useState(false)

    const EditTaskDetails = (TaskCode) =>{
        props.EditTaskDetails(TaskCode)
    }

    // console.log(flag);
    const DeleteTask = (TaskCode) => {
        props.DeleteTask(TaskCode)
    }


    const MarkTaskAsDone = () =>{
        SetFlag(!flag)
        if(!flag === true)
            props.MarkTaskAsDone(TaskCode)
        else
            props.RemoveFromCheck(TaskCode)
    }

    return (
        <View style={styles.container}>
            <View style={styles.Details}>
                <Text>Employee ID: {EmployeeID}</Text>

                <Text>Task Code: {TaskCode}</Text>
            </View>

            <View style={styles.containerTaskDedtails}>
                <View style={styles.Details}>
                    <Text style={{ padding: 5 }}>Room Number: {RoomNumber}</Text>
                    <Text>Start Date: {TaskName}</Text>
                </View>

                <View style={styles.Details}>
                    <Text>Start Date: {StartDate}</Text>
                    <Text>Start Time: {StartTime}</Text>
                </View>

                <View style={styles.Details}>
                    {EndTime === null ? <Text>End Time: null</Text> : <Text>End Time: {EndTime}</Text>}
                    <Text>Task Status: {TaskStatus}</Text>
                </View>
                <Text style={{ padding: 5 }}>Description: {Description}</Text>

                <View style={styles.BTNContainer}>

                    <TouchableOpacity onPress={() => EditTaskDetails(TaskCode)}>
                        <Image style={styles.BTNImages} source={images.edit} />
                    </TouchableOpacity>
                    <View style={styles.Checkbox}>
                        {TaskStatus === "Open" ?
                            <Checkbox label="Item" status={flag ? 'checked' : 'unchecked'}
                                onPress={MarkTaskAsDone} />
                            : null}
                    </View>
                    <TouchableOpacity onPress={() => DeleteTask(TaskCode)}>
                        <Image style={styles.BTNImages} source={images.trashCan} />
                    </TouchableOpacity>


                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        backgroundColor: 'green',
        borderBottomColor: 'black',
        borderRadius: 5,
        margin: 10

    },
    containerTaskDedtails: {
        borderColor: 'black',
        borderWidth: 1
    },

    Details: {
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
    BTNContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    }

})
