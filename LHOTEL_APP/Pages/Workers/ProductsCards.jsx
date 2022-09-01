import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import Counter from 'react-native-counters'


export default function ProductsCards(props) {

    let { id, name, price } = props
    const [start, SetStart] = useState(0);

    // console.log(id);
    const AddAmount = (id, amount) => {
        SetStart(amount)
        // console.log(id +" --- " + amount);
        props.AddAmount(id, amount)
    }


    return (
        <View style={styles.card}>
            <View>
                <View style={styles.layout}>
                    <Text >{name} </Text>
                    <Text >price: {price}</Text>
                </View>
            </View>
            <View style={styles.counterStyle}>
                <Counter
                    initial={start}
                    start={start}
                    max={5}
                    style={styles.counterStyle}
                    // onChange={(count) => {SetCount.bind(this)}}
                    onChange={(amount) => AddAmount( id,amount)}
                />
            </View>

            {/* <Text>{price}</Text>
            <Text>{amountTaken}</Text> */}

        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 60,
        height: 100,
        marginRight: 50
    },
    card: {
        backgroundColor: 'grey',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        padding:10,
        flex: 1,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
    },
    layout: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "space-between",
        // alignItems: "center",

    },
    counterStyle: {
        flex: 2,
        flexDirection: "row",
        // justifyContent: "flex-end",
        alignItems: "center",
    },
})