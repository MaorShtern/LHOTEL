import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchBar } from 'react-native-elements';
// import { images } from '../../images';
import EMCard from './EMCard';
import { te } from 'date-fns/locale';



// const RequestType = [
//     { label: "All Employees", value: "All Employees" },
//     { label: "Add New Employee", value: "Add New Employee" },
//     { label: "Update Employee Details", value: "Update Employee Details" },
//     { label: "Delete Employee", value: "Delete Employee" },
// ];


// const Employees = [
//     // {
//     //     Employee_ID: -1, Description: "General", Employee_Name: " ", Phone_Number: " ",
//     //     Birth_Date: "1900-01-01", Hourly_Wage: -1, Address: " ", Employee_Code: 20
//     // },
//     {
//         Employee_ID: 111, Description: "Manager", Employee_Name: "aaa", Phone_Number: "0526211881",
//         Birth_Date: "2022-08-15", Hourly_Wage: 40, Address: "aaa", Employee_Code: 1
//     },
//     {
//         Employee_ID: 222, Description: "Receptionist", Employee_Name: "bbb", Phone_Number: "0526211881",
//         Birth_Date: "2022-08-15", Hourly_Wage: 40, Address: "bbb", Employee_Code: 2
//     },
//     {
//         Employee_ID: 333, Description: "Room service", Employee_Name: "ccc", Phone_Number: "0526211881",
//         Birth_Date: "2022-08-15", Hourly_Wage: 40, Address: "ccc", Employee_Code: 3
//     },
// ]



export default function EmployeesManagement({ navigation }) {

    const [DBemployees, SetDBEmployees] = useState([])
    const [employees, SetEmployees] = useState([])
    const [search, setSearch] = useState('');


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
    const DeleteEmployeeFromDB = async (value) => {
        try {
            let employee = JSON.stringify(employees.filter((per) => per.Employee_ID === value))
            let newArray = employees.filter((per) => per.Employee_ID !== value)
            SetEmployees(newArray)
            // const requestOptions = {
            //     method: 'PUT',
            //     body: employee,
            //     headers: { 'Content-Type': 'application/json' }
            //   };

            // //   console.log(requestOptions.body);
            //   let result = await fetch('http://proj13.ruppin-tech.co.il/ClockOut', requestOptions);
            //   if (result) {
            //     alert("");
            //   }
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
                        DeleteEmployeeFromDB(value)
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
            <View style={styles.container}>
                {listEmployees}
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
})