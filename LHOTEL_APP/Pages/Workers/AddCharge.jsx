import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from "react-native-element-dropdown";
import ProductsCards from './ProductsCards';
import Icon from "react-native-vector-icons/Ionicons";
import { images } from '../../images';


const RequestType = [
    { label: "Room Cleaning", value: "Room Cleaning" },
    { label: "Room Service", value: "Room Service" },
    { label: "Change of towels", value: "Change of towels" },
    { label: "Refill mini bar", value: "Refill mini bar" },
    { label: "Product purchase", value: "Product purchase" },
];

// const Products = [
//     { id: 1, image: images.waterbottle, name: "Water bottle", price: 10, amountTaken: 0 },
//     { id: 2, image: images.whisky, name: "Whiskey", price: 5, amountTaken: 0 },
//     { id: 3, image: images.choclatebar, name: "Chocolate bar", price: 16, amountTaken: 0 },
//     { id: 4, image: images.alcoholWine, name: "White wine", price: 3, amountTaken: 0 },
//     { id: 5, image: images.cocacola, name: "Coca Cola bottle", price: 20, amountTaken: 0 },
// ];



export default function AddCharge({ navigation }) {

    const [request, SetRequest] = useState("");
    const [dropdown, setDropdown] = useState(null);
    const [sumTotal, SetSumTotal] = useState(0)
    const [payment, SetPayment] = useState("")
    const [productsToAdd, SetProductsToAdd] = useState(
        [{ id: 1, name: "Water bottle", price: 10, amountTaken: 0 },
        { id: 2, name: "Whiskey", price: 5, amountTaken: 0 },
        { id: 3, name: "Chocolate bar", price: 16, amountTaken: 0 },
        { id: 4, name: "White wine", price: 3, amountTaken: 0 },
        { id: 5, name: "Coca Cola bottle", price: 20, amountTaken: 0 },]
    )

    const AddAmount = (id, amount) => {
        for (let index = 0; index < productsToAdd.length; index++) {
            if (productsToAdd[index].id === id) {
                productsToAdd[index].amountTaken = amount
            }
        }
        Cal_Sum()
    }

    const Cal_Sum = () => {
        let sum = 0
        for (let index = 0; index < productsToAdd.length; index++) {
            sum += (productsToAdd[index].amountTaken * productsToAdd[index].price)
        }
        SetSumTotal(sum)
    }


    const SavePurchase = () => {
        return Alert.alert(
            "order",
            "Are you sure you want to  add the selected products to your account?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        alert("The purchase was successfully registered")
                        navigation.goBack()
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    }


    let listOfProducts = productsToAdd.map((per) => <ProductsCards key={per.id} id={per.id}
        image={per.image} name={per.name}
        price={per.price} amountTaken={per.amountTaken}
        AddAmount={AddAmount}
    />)





    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Add Charge</Text>

            <View style={styles.label}>
                <Text>Customer Name:</Text>
                <TextInput placeholder="Customer Name" style={styles.TextInput}></TextInput>
                <View style={{ height: 10 }}></View>

                <Text>Customer ID:</Text>
                <TextInput placeholder="Customer ID" style={styles.TextInput}></TextInput>
                <View style={{ height: 10 }}></View>

                <Text>Room Number:</Text>
                <TextInput keyboardType="numeric" placeholder="Room Number" style={styles.TextInput}></TextInput>
                <View style={{ height: 10 }}></View>


                <View>
                    <Dropdown
                        style={styles.dropdown}
                        data={RequestType}
                        // search
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        placeholder="Select an action"
                        value={dropdown}
                        onChange={(action) => {
                            SetRequest(action.value);
                        }}
                    />
                </View>
                <View>
                    <View style={{ height: 10 }}></View>
                    {request === 'Product purchase' ?
                        (<View>
                            {listOfProducts}
                            <View style={styles.goodsStyle}>
                                <Text style={{ direction: 'rtl' }}>   goods:  {sumTotal}  </Text>
                                <Icon name="ios-cart" size={20} />
                            </View>
                        </View>
                        ) : null}
                </View>

                <View style={{ height: 10 }}></View>

                <View>
                    <Dropdown
                        style={styles.dropdown}
                        data={[
                            { label: "Charge on the room", value: "Charge on the room" },
                            { label: "Immediate Cash Payment", value: "Immediate Cash Payment" }
                        ]}
                        // search
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        placeholder="Payment Method"
                        value={dropdown}
                        onChange={(method) => {
                            SetPayment(method.value);
                        }}
                    />
                </View>
                <View style={{ height: 10 }}></View>

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity style={styles.button} onPress={SavePurchase}>
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
        textDecorationLine: 'underline',
    },
    label: {
        flex: 2,
        padding: 20,
    },

    TextInput: {
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 2,
        height: 50,
        padding: 10,
    },
    dropdown: {
        backgroundColor: "white",
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    amount: {
        flex: 1,
        flexDirection: "row"
    },
    goodsStyle: {
        flexDirection: "row-reverse",
        paddingTop: 10,
        // justifyContent: "space-between",
    },
    button:
    {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
    save: {
        width: 30,
        height: 30
    },
})