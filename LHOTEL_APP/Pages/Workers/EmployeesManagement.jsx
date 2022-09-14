import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { SearchBar } from 'react-native-elements';
import EMCard from './EMCard';
import { ActivityIndicator } from "react-native";
import AppContext from '../../AppContext';



export default function EmployeesManagement({ navigation }) {

    const [DBemployees, SetDBEmployees] = useState([])
    const [employees, SetEmployees] = useState([])
    const [search, setSearch] = useState('');
    const [loading, SetLoading] = useState(false)
    const myContext = useContext(AppContext);


    useEffect(() => { GetDBEmployees() }, [])


    const GetDBEmployees = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            let result = await fetch('http://proj13.ruppin-tech.co.il/GetAllEmployees', requestOptions);
            let temp = await result.json();
            if (temp !== null) {
                SetDBEmployees(temp)
                SetEmployees(temp)
                SetLoading(true)
                return
            }
            else
                GetDBEmployees()

        } catch (error) {
            alert(error)
        }
    }


    const SerchEmployee = (value) => {
        setSearch(value)
        let employee = DBemployees.filter((per) => per.Employee_Name === value)
        console.log(employee);
        if (employee.length > 0 && employee[0].Employee_ID != -1) {
            SetEmployees(employee)
        }
        else {
            SetEmployees(DBemployees)
        }
    }



    //   צריך לרשום מתודת מחיקה לעובד
    const DeleteEmployeeFromDB = async (id) => {
        try {
            SetLoading(false)
            // console.log(value);
            const requestOptions = {
                method: 'DELETE',
                body: JSON.stringify({
                    id: id
                }),
                headers: { 'Content-Type': 'application/json' }
            };

            //   console.log(requestOptions.body);
            let result = await fetch('http://proj13.ruppin-tech.co.il/DeleteEmployeeById', requestOptions);
            let temp = await result.json();
            if (temp) {
                SetLoading(true)
                alert("The employee was successfully deleted");
                GetDBEmployees()
            }
            else {

            }
        } catch (error) {
            alert(error)
        }
    }


    const DeleteEmployee = (value) => {
        // console.log(value);
        return Alert.alert(
            "Deleting an employee",
            "Are you sure you want to delete the employee from the system?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        let employee = employees.filter((per) => per.Employee_ID === value)[0].Employee_ID
                        DeleteEmployeeFromDB(employee)
                        // let newArray = employees.filter((per) => per.Employee_ID !== value)
                        // SetEmployees(newArray)
                    },
                },
                { text: "No", },
            ]
        );
    }

    const EditeDetails = (value) => {
        // console.log(valuse);
        let employee = employees.filter((per) => per.Employee_ID === value)[0]
        // console.log(JSON.stringify(employee));
        navigation.navigate('UpdateDetails', { employee: employee })
    }


    // console.log("employees:   ---> "+JSON.stringify(employees));

    const Spinner = () => (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
        </View>
    );

    let listEmployees = employees.map((item) => <EMCard key={item.Employee_ID}
        Employee_ID={item.Employee_ID} Description={item.Description} Employee_Name={item.Employee_Name}
        Phone_Number={item.Phone_Number} Birth_Date={item.Birth_Date} Hourly_Wage={item.Hourly_Wage}
        Address={item.Address} Employee_Code={item.Employee_Code}
        DeleteEmployee={DeleteEmployee} EditeDetails={EditeDetails} />)


    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Employees Management</Text>
            <View style={{ padding: 10 }}>
                <SearchBar
                    round={true}
                    lightTheme={true}
                    placeholder="search worker..."
                    onChangeText={SerchEmployee}
                    value={search} />
            </View>
            <View style={{  width: 200, alignSelf: "center", alignItems: "center" }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEmployee')}>
                    <Text>Add New Employee</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.items}>
                    {loading ? listEmployees : <Spinner />}
                </View>
            </View>
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
    container: {
        padding: 10,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    card: {
        backgroundColor: '#FFF',
        padding: 25,
        borderRadius: 10,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
    },
    details: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        padding: 5
        // justifyContent: 'space-between',
    },
    BTNContainer: {
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
    button: {
        padding: 10,
        backgroundColor: "gray",
        borderRadius:10,

    }
})