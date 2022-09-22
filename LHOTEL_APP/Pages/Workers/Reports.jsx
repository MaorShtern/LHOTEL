import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { ActivityIndicator } from "react-native";



const tableHead = ['Amount', 'Month_Name', 'Date']
const tableData = [['3', 'September', '2022-9']]



// const TempHead = ['Room number', 'type', 'price', 'details']
// const TempData = [
//     [3, 'Single room', 100, 'A personal room adapted for a single person'],
//     [5, 'Single room', 100, 'A personal room adapted for a single person'],
//     [7, 'Single room', 100, 'A personal room adapted for a single person'],
//     [8, 'Single room', 100, 'A personal room adapted for a single person'],
//     [9, 'Single room', 100, 'A personal room adapted for a single person'],
//     [10, 'Single room', 100, 'A personal room adapted for a single person'],
//     [13, 'Double room', 300, 'A double room suitable for two people'],
//     [14, 'Double room', 300, 'A double room suitable for two people'],
//     [15, 'Double room', 300, 'A double room suitable for two people'],
//     [16, 'Double room', 300, 'A double room suitable for two people'],
//     [18, 'Double room', 300, 'A double room suitable for two people'],
//     [19, 'Double room', 300, 'A double room suitable for two people'],
//     [25, 'Suite', 500, 'A suite designed to accommodate an amount of about 3 to 10 people'],
//     [26, 'Suite', 500, 'A suite designed to accommodate an amount of about 3 to 10 people'],
//     [28, 'Suite', 500, 'A suite designed to accommodate an amount of about 3 to 10 people'],
//     [29, 'Suite', 500, 'A suite designed to accommodate an amount of about 3 to 10 people'],
//     [30, 'Suite', 500, 'A suite designed to accommodate an amount of about 3 to 10 people'],

// ]


export default function Reports() {

    const [loading, SetLoading] = useState(false)
    const [visitorsPerMonth, SetVisitorsPerMonth] = useState([])
    const [productsPurchased, SetProductsPurchased] = useState([])
    const [tasksPerMonth, SetTasksPerMonth] = useState([])
    const [incomeAndExpenses, SetIncomeAndExpenses] = useState([])
    const [product, SetProduct] = useState('')

    useEffect(() => { GetVisitors_Per_Month(); }, [])


    // useEffect(() => {GetVisitors_Per_Month(); GetProducts_Purchased();
    //     GetTasksPerMonth(); GetIncome_And_Expenses()}, [])



    const GetVisitors_Per_Month = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            let result = await fetch('http://proj13.ruppin-tech.co.il/Number_Of_Visitors_Per_Month', requestOptions);
            let temp = await result.json();
            // console.log(temp);
            if (temp !== null) {
                SetVisitorsPerMonth(temp)
                SetLoading(true)
                return
            }
            // GetVisitors_Per_Month()
        } catch (error) {
            alert(error)
            SetLoading(true)
        }
    }

    const GetProducts_Purchased = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            let result = await fetch('http://proj13.ruppin-tech.co.il/Amount_Of_Products_Purchased_In_The_Store', requestOptions);
            let temp = await result.json();
            /// console.log(temp);
            if (temp !== null) {
                // let keys = temp.map((per) => Object.keys(per))[0]
                // console.log(keys);
                SetProductsPurchased(temp);
                SetLoading(true)
                return
            }
        } catch (error) {

        }
    }


    const GetTasksPerMonth = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            let result = await fetch('http://proj13.ruppin-tech.co.il/Number_of_tasks_per_month', requestOptions);
            let temp = await result.json();
            // console.log(temp);
            if (temp !== null) {
                // SetProductsPurchased(temp);
                SetLoading(true)
                return
            }
        } catch (error) {
            alert(error)
            SetLoading(true)
        }
    }

    const GetIncome_And_Expenses = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            let result = await fetch('http://proj13.ruppin-tech.co.il/Income_And_Expenses', requestOptions);
            let temp = await result.json();
            // console.log(temp);
            if (temp !== null) {
                console.log(temp);
                SetLoading(true)
                return
            }
        } catch (error) {
            alert(error)

        }
    }



    const GetProductPurchaseByName = async (name) => {
        try {
            const requestOptions = {
                method: 'GET',
                body: JSON.stringify({
                    name: name
                }),
                headers: { 'Content-Type': 'application/json' }
            };
            let result = await fetch('http://proj13.ruppin-tech.co.il/ProductPurchaseByName', requestOptions);
            let temp = await result.json();
            // console.log(temp);
            if (temp !== null) {
                console.log(temp);
                SetLoading(true)
                return
            }
        } catch (error) {
            alert(error)

        }
    }




    const Spinner = () => (
        
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>
    );


    // console.log(JSON.stringify(productsPurchased));


    return (
        <ScrollView>
            <View style={{ padding: 30 }}>
                <Text style={styles.HeadLine}>Reports</Text>
            </View>


            <View style={styles.items}>
                {loading ? (

                    <View>
                        <View style={styles.tableContainer}>
                            <Text style={styles.tableHeader}>Number Of Tasks Per Month</Text>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={visitorsPerMonth.map((per) => Object.keys(per))[0]} style={styles.head} textStyle={styles.text} />
                                <Rows data={visitorsPerMonth.map((per) => Object.values(per))} textStyle={styles.text} />
                            </Table>
                        </View>
                        <View style={{ height: 20 }}></View>
                        <View style={styles.tableContainer}>
                            <Text style={styles.tableHeader}>Amount Of Products Purchased In The Store</Text>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={productsPurchased.map((per) => Object.keys(per))[0]} style={styles.head} textStyle={styles.text} />
                                <Rows data={productsPurchased.map((per) => Object.values(per))} textStyle={styles.text} />
                            </Table>
                        </View>
                    </View>

                ) : <Spinner />}
            </View>



            {/* <View style={styles.tableContainer}>
                <Text style={styles.tableHeader}>Number Of Tasks Per Month</Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                    <Rows data={tableData} textStyle={styles.text} />
                </Table>
            </View>
            <View style={{ height: 20 }}></View> */}

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    HeadLine: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        textDecorationLine: 'underline',
    },
    tableContainer: {
        padding: 10
    },
    tableHeader: {
        textDecorationLine: 'underline',
        padding: 5,
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head: {
        height: 60,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 6
    }
})  