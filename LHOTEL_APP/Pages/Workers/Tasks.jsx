import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { images } from '../../images';
// import { images } from '../../images';
// import { Icon } from 'react-native-elements';


const RequestType = [
    { label: "Today's tasks", value: "Today's tasks" },
    { label: 'Open Tasks', value: 'Open Tasks' },
    { label: 'Search for a task by employee', value: 'Search for a task by employee' },
    { label: 'Search for a task by number', value: 'Search for a task by number' },
];


export default function Tasks() {

    // let{role} = props

    const [dropdown, setDropdown] = useState(null);
    const [RequestTask, SetRequestTask] = useState('')

    let role = 'Manager'

    if (role === 'Manager') {
        return (
            <ScrollView>
                <Text style={styles.HeadLine}>Tasks</Text>
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
                <View style={{ padding: 20 }}>
                    <Image style={styles.Plus} source={images.plus} />
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
        padding: 30
    },
    Plus: {
        width: 50,
        height: 50,
        // position:'fixed'
        // right: 1,
        // left: 1,
        // height: 50,
    },
})