import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper';
import { images } from '../../images';



export default function TasksCard(props) {


    let { Task_Code, Employee_ID, Task_Name, Room_Number, Start_Date, Start_Time,
        End_Time, Task_Status, Description } = props


    const [flag, SetFlag] = useState(false)

    const Edite_Task_Details = (Task_Code) =>{
        props.Edite_Task_Details(Task_Code)
    }

    // console.log(flag);


    const MarkTaskAsDone = () =>{
        SetFlag(!flag)
        // console.log(flag);
        if(!flag === true)
            props.MarkTaskAsDone(Task_Code)
        else
            props.RemoveFromCheck(Task_Code)
    }

    return (
        <View style={styles.container}>
            <View style={styles.Details}>
                <Text>Employee ID: {Employee_ID}</Text>

                <Text>Task Code: {Task_Code}</Text>
            </View>

            <View style={styles.containerTaskDedtails}>
                <View style={styles.Details}>
                    <Text style={{ padding: 5 }}>Room Number: {Room_Number}</Text>
                    <Text>Start Date: {Task_Name}</Text>
                </View>

                <View style={styles.Details}>
                    <Text>Start Date: {Start_Date}</Text>
                    <Text>Start Time: {Start_Time}</Text>
                </View>

                <View style={styles.Details}>
                    {End_Time === null ? <Text>End Time: null</Text> : <Text>End Time: {End_Time}</Text>}
                    <Text>Task Status: {Task_Status}</Text>
                </View>
                <Text style={{ padding: 5 }}>Description: {Description}</Text>

                <View style={styles.BTNContainer}>

                    <TouchableOpacity onPress={() => Edite_Task_Details(Task_Code)}>
                        <Image style={styles.BTNImages} source={images.edit} />
                    </TouchableOpacity>
                    <View style={styles.Checkbox}>
                        {Task_Status === "Open" ?
                            <Checkbox label="Item" status={flag ? 'checked' : 'unchecked'}
                                onPress={MarkTaskAsDone} />
                            : null}
                    </View>
                    <TouchableOpacity>
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
