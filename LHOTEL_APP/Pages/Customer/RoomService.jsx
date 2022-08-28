import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";



//  אנוחנו נירצה לעבור על הטבלה "פירטי רכישה" על מנת להביא את כול הפרטים שהלקוח
// צריך על מנת לבצא את הבקשה לשירות חדרים

const RequestType = [
    { label: 'Room Cleaning', value: 'Room Cleaning' },
    { label: 'Room Service', value: 'Room Service' },
    { label: 'Change of towels', value: 'Change of towels' },
    { label: 'Refill mini bar', value: 'Refill mini bar' },
];


const Rooms = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
]


export default function RoomService() {

    const [dropdown, setDropdown] = useState(null);
    const [request, SetRequest] = useState('')
    const [room, SetRoom] = useState('')
    const [flagDate, setFlagDate] = useState(false)
    const [flagTime, setFlagTime] = useState(false)

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(date.getHours() + ':' + date.getMinutes())


    const hideDate = () => {
        setFlagDate(false);
    };

    const showDate = () => {
        setFlagDate(true);
    };

    const handleDate = (date) => {
        setDate(date)
        hideDate()
    };

    const hideTime = () => {
        setFlagTime(false);
    };

    const showTime = () => {
        setFlagTime(true);
    };

    const handleTime = (time) => {
        let stringTime = time.getHours() + ':' + time.getMinutes()
        setTime(stringTime)
        hideDate()
    };


    return (
        <ScrollView>
            <Text style={styles.HeadLine}>LHotel Room Service Order Form</Text>
            <View style={styles.label}>

                <View style={styles.container}>
                    <Dropdown
                        style={styles.dropdown}
                        data={Rooms}
                        // search
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        placeholder="Room Number"
                        value={dropdown}
                        onChange={room => { SetRoom(room.value) }} />
                </View>
                <View>
                    {room === '' ? (
                        <Text style={styles.alerts}>*Must select room* </Text>)
                        : null}
                </View>

                <View style={styles.container}>
                    <Dropdown
                        style={styles.dropdown}
                        data={RequestType}
                        // search
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        placeholder="Request type"
                        value={dropdown}
                        onChange={request => { SetRequest(request.value) }} />
                </View>
                <View>
                    {request === '' ? (
                        <Text style={styles.alerts}>*Must select request type* </Text>)
                        : null}
                </View>



                <View style={{ height: 20 }}></View>


                <View>
                    <TouchableOpacity style={styles.button} onPress={showDate} >
                        <Text>{"Date: " + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={flagDate}
                        mode="date"
                        onConfirm={handleDate}
                        onCancel={hideDate} />
                    <View style={{ height: 20 }}></View>
                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={showTime} >
                        <Text>{"Time: " + time}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={flagTime}
                        mode="time"
                        onConfirm={handleTime}
                        onCancel={hideTime} />
                    <View style={{ height: 20 }}></View>
                </View>


                <Text style={styles.Text}>Description </Text>
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type something"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                    />
                </View>

            </View>

            <View style={styles.ButtonContainer}>
                <TouchableOpacity>
                    <Text style={styles.button}  >ORDER</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    HeadLine: {
        fontSize: 30,
        fontWeight: "bold",
        paddingTop: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    label: {
        flex: 2,
        padding: 20,
    },

    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    alerts: {
        color: 'red'
    },
    ButtonContainer: {
        alignItems: 'center',
        paddingTop: 10
    },

    button:
    {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10

    },
})  