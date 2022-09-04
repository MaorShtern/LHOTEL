import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { Divider } from "react-native-paper";
import { SearchBar } from 'react-native-elements';



const Employees = [
  {
    Employee_ID: -1, Employee_Code: null, Employee_Name: "John", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "General", Hourly_Wage: null, Address: null, Entry: "09:00", Exit: "18:00"
  },
  {
    Employee_ID: 111, Employee_Code: 1, Employee_Name: "Miri", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Manager", Hourly_Wage: null, Address: null, Entry: "10:00", Exit: "15:00"
  },
  {
    Employee_ID: 222, Employee_Code: 2, Employee_Name: "Alon", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Receptionist", Hourly_Wage: null, Address: null, Entry: "08:00", Exit: "17:00"
  },
  {
    Employee_ID: 333, Employee_Code: 3, Employee_Name: "Tamar", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Room service", Hourly_Wage: null, Address: null, Entry: "09:00", Exit: null
  },
];

export default function Shift() {

  const [empItems, setEmpItems] = useState(Employees);
  const [search, setSearch] = useState('');


  const GetEmployeeCard = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text >{item.Role}</Text>
        <View style={styles.itemLeft}>
          <Text>Entry: {item.Entry} </Text>
          <View style={{ height: 5 }}></View>
          <Text>Exit: {item.Exit} </Text>
        </View>
        <Text >{item.Employee_Name}</Text>
      </View>
    )
  }

  const SerchEmployee = (value) => {
    setSearch(value)
    let employee = Employees.filter((per) => per.Employee_Name === value)
    // console.log(employee.length > 0);
    if (employee.length > 0) {
      setEmpItems(employee)
    }
    else {
      setEmpItems(Employees)
    }
  }

  // const handleAddTask = () => {
  //   Keyboard.dismiss();
  //   setEmpItems([...empItems, emp])
  //   setEmep(null);
  // }

  // const completeTask = (index) => {
  //   let itemsCopy = [...empItems];
  //   itemsCopy.splice(index, 1);
  //   setEmpItems(itemsCopy)
  // }


  let listEmployees = empItems.map((item) => <GetEmployeeCard key={item.Employee_ID} item={item} />)

  //     const updateSearch = (search) => {
  //     this.setState({ search });
  //   };

  return (
    <View style={styles.container}>

      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'>

        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Workers</Text>
          <SearchBar
            round={true}
            lightTheme={true}
            placeholder="search worker..."
            onChangeText={SerchEmployee}
            value={search}
          />

          <View style={styles.items}>

            {listEmployees}
            {/* This is where the tasks will go! */}
            {/* {
              Employees.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <GetItem item={item} />
                  </TouchableOpacity>
                )
              })
            } */}
          </View>
        </View>

      </ScrollView>


    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    // paddingHorizontal: 10,

  },
  sectionTitle: {
    paddingHorizontal: 23,
    paddingBottom: 13,
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',

    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  item: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    // alignSelf:"center",
    // flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});