import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from "react-native-element-dropdown";
import ProductsCards from './ProductsCards';
import Icon from "react-native-vector-icons/Ionicons";
import { images } from '../../images';


// const RequestType = [
//     { label: "Room Cleaning", value: "Room Cleaning" },
//     { label: "Room Service", value: "Room Service" },
//     { label: "Change of towels", value: "Change of towels" },
//     { label: "Refill mini bar", value: "Refill mini bar" },
//     { label: "Product purchase", value: "Product purchase" },
// ];

// const Products = [
//     { id: 1, image: images.waterbottle, name: "Water bottle", price: 10, amountTaken: 0 },
//     { id: 2, image: images.whisky, name: "Whiskey", price: 5, amountTaken: 0 },
//     { id: 3, image: images.choclatebar, name: "Chocolate bar", price: 16, amountTaken: 0 },
//     { id: 4, image: images.alcoholWine, name: "White wine", price: 3, amountTaken: 0 },
//     { id: 5, image: images.cocacola, name: "Coca Cola bottle", price: 20, amountTaken: 0 },
// ];

// 1	1	Coca cola	15.00	0.00
// 2	2	Vodka	35.00	0.00
// 3	3	Bamba	20.00	0.00
// 4	3	Doritos	20.00	50.00
// 5	1	Sprite	15.00	15.00
// 6	2	Whiskey	45.00	0.00
// 7	3	Chips	20.00	0.00
// 8	4	Room	0.00	0.00

const Products = [
    { Id: 1, Product_Dec: "Coca cola", price: 15, Amount: 0 },
    { Id: 2, Product_Dec: "Vodka", price: 35, Amount: 0 },
    { Id: 3, Product_Dec: "Bamba", price: 20, Amount: 0 },
    { Id: 4, Product_Dec: "Doritos", price: 20, Amount: 0 },
    { Id: 5, Product_Dec: "Sprite", price: 15, Amount: 0 },
    { Id: 6, Product_Dec: "Whiskey", price: 45, Amount: 0 },
    { Id: 7, Product_Dec: "Chips", price: 20, Amount: 0 },]


export default function AddCharge({ navigation }) {

    // const [request, SetRequest] = useState("");
    const [dropdown, setDropdown] = useState(null);
    const [sumTotal, SetSumTotal] = useState(0)
    const [id, SetId] = useState(-1)
    // const [name, SetName] = useState("")
    const [room_Number, SetRoom_Number] = useState(-1)
    const [payment, SetPayment] = useState("")
    const [productsToAdd, SetProductsToAdd] = useState([])


    const AddAmount = (id, amount) => {
        let product = productsToAdd.filter((prod) => prod.Id === id)
        if (product.length === 0) {
            product = Products.filter((prod) => prod.Id === id)[0]
            product.Amount = amount
            let temp = [...productsToAdd, product]
            SetProductsToAdd(temp)
        }
        else {
            product = productsToAdd.filter((prod) => prod.Id === id)[0]
            product.Amount = amount
            // console.log(product);
        }
        Cal_Sum()
    }

    const Cal_Sum = () => {
        let sum = 0
        for (let index = 0; index < Products.length; index++) {
            sum += (Products[index].Amount * Products[index].price)
        }
        SetSumTotal(sum)
    }


    const AddChargeToDB = async () => {
        try {
            let counter = 0
            for (let index = 0; index < productsToAdd.length; index++) {
                // console.log(productsToAdd[index]);
                // Products[index].Room_Number = room_Number
                // Products[index].Payment_Method = payment
                const requestOptions = {
                    method: 'POST',
                    body: JSON.stringify({
                        Id: Number(id),
                        Room_Number: Number(room_Number),
                        Product_Dec: productsToAdd[index].Product_Dec,
                        Amount: productsToAdd[index].Amount,
                        Payment_Method: payment
                    }),
                    headers: { 'Content-Type': 'application/json' }
                };
                // console.log(requestOptions.body);        
                let result = await fetch('http://proj13.ruppin-tech.co.il/AddCharge', requestOptions);
                let temp = await result.json();
                if (temp) {
                    counter++
                    // GetAllTasksFromDB()
                }
            }
            if (counter > 0) {
                alert("The purchase was successfully registered")
                navigation.goBack()
            }
        } catch (error) {
            alert(error)
            SetLoading(true)
        }
    }


    const CheckInput = () => {
        if (id !== -1 && room_Number !== -1 && productsToAdd.length > 0 && payment !== "")
            return true
        else
            return false
    }


    const SavePurchase = () => {
        if(CheckInput())
        {
        return Alert.alert(
            "order",
            "Are you sure you want to  add the selected products to your account?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        // console.log(productsToAdd);
                        AddChargeToDB()
                        // alert("The purchase was successfully registered")
                        // navigation.goBack()
                    },
                },
                {
                    text: "No",
                },
            ]
        );
        }
        else
        {
            alert("The format is not filled correctly")
        }
    }


    let listOfProducts = Products.map((per) => <ProductsCards key={per.Id} id={per.Id}
        image={per.image} name={per.Product_Dec}
        price={per.price} amountTaken={per.Amount}
        AddAmount={AddAmount}
    />)


    // console.log(JSON.stringify(productsToAdd));


    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Add Charge</Text>

            <View style={styles.label}>
                {/* <Text>Customer Name:</Text>
                <TextInput placeholder="Customer Name" style={styles.TextInput}
                    onChangeText={(name) => SetName(name)}></TextInput>
                <View style={{ height: 10 }}></View> */}

                <Text>Customer ID:</Text>
                <TextInput keyboardType="numeric" placeholder="Customer ID" style={styles.TextInput}
                    onChangeText={(id) => SetId(id)}></TextInput>
                <View style={{ height: 10 }}></View>

                <Text>Room Number:</Text>
                <TextInput keyboardType="numeric" placeholder="Room Number" style={styles.TextInput}
                    onChangeText={(room) => SetRoom_Number(room)}></TextInput>
                <View style={{ height: 10 }}></View>


                {/* <View>
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
                </View> */}
                <View>
                    <View style={{ height: 10 }}></View>
                    {listOfProducts}
                    <View style={styles.goodsStyle}>
                        <Text style={{ direction: 'rtl' }}>   goods:  {sumTotal}  </Text>
                        <Icon name="ios-cart" size={20} />
                    </View>
                    {/* {request === 'Product purchase' ?
                        (<View>
                            {listOfProducts}
                            <View style={styles.goodsStyle}>
                                <Text style={{ direction: 'rtl' }}>   goods:  {sumTotal}  </Text>
                                <Icon name="ios-cart" size={20} />
                            </View>
                        </View>
                        ) : null} */}
                </View>

                <View style={{ height: 10 }}></View>

                <View>
                    <Dropdown
                        style={styles.dropdown}
                        data={[
                            { label: "Charge on the room", value: "Credit" },
                            { label: "Immediate Cash Payment", value: "Cash" }
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