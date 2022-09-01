import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';

import { SearchBar } from 'react-native-elements';




const Users = [
  {
    Employee_ID: -1, Employee_Code: null, Employee_Name: "John", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "General", Hourly_Wage: null, Address: null
  },
  {
    Employee_ID: 111, Employee_Code: 1, Employee_Name: "Miri", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Manager", Hourly_Wage: null, Address: null
  },
  {
    Employee_ID: 222, Employee_Code: 2, Employee_Name: "Alon", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Receptionist", Hourly_Wage: null, Address: null
  },
  {
    Employee_ID: 333, Employee_Code: 3, Employee_Name: "Tamar", Phone_Number: null, Birth_Date: null,
    Worker_Code: null, Role: "Room service", Hourly_Wage: null, Address: null
  },
]

export default function Shift() {
  const [emp, setEmep] = useState();
  const [empItems, setEmpItems] = useState([]);
  const [search, setSearch] = useState('');

  // style={styles.itemText}
  const GetItem = ({ item }) => {

    return (
      <View style={styles.item}>
        {/* <Text >{item.Role}</Text>
           <Text >{item.Employee_ID}</Text>
           <Text >{item.Employee_ID}</Text> */}
        <View style={styles.itemLeft}>
          <Text >{item.Role}</Text>
          {/* <View style={styles.square}></View> */}
          {/* <Text style={styles.itemText}>{item.Employee_ID}</Text> */}
          {/* <Text
            style={{
              color: "#2e2f30",
              fontSize: 15,
              paddingLeft: 5,
              paddingTop: 35,
            }}
          >
        {item.Role}
          </Text> */}
        </View>
        {/* <Text >{item.Role}</Text> */}
        <Text >{item.Employee_Name}</Text>

      </View>
    )
  }
  const handleAddTask = () => {
    Keyboard.dismiss();
    setEmpItems([...empItems, emp])
    setEmep(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...empItems];
    itemsCopy.splice(index, 1);
    setEmpItems(itemsCopy)
  }

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
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Tasks */}

        <View style={styles.tasksWrapper}>

          <Text style={styles.sectionTitle}>Workers</Text>
          <SearchBar
            round={true}
            lightTheme={true}
            placeholder="search worker..."
            onChangeText={setSearch}
            value={search}
          />

          <View style={styles.items}>

            {/* This is where the tasks will go! */}
            {
              Users.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <GetItem item={item} />
                  </TouchableOpacity>
                )
              })
            }
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
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
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