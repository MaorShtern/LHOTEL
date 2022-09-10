import React, { useState, useEffect} from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import { Divider } from "react-native-paper";
import { SearchBar } from "react-native-elements";

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
  const [empItems, setEmpItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => { getDBShift() }, []);


  const getDBShift = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      let result = await fetch('http://proj13.ruppin-tech.co.il/GetWorkersOnShift', requestOptions);
      let temp = await result.json();
      if (temp !== null) {
        // console.log(temp);
        // let arrayTemp = temp.filter((proc) => proc.Description !== "Room")
        setEmpItems(temp)
        return
      }
      else
        getDBProducts()

    } catch (error) {
      alert(error)
    }
  }
  // GetTakenRooms
  // select * from Customers_Rooms
  const GetEmployeeCard = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text>{item.Description}</Text>
        </View>
        <View></View>
        <View>
          <Text>{item.Entrance_Time} </Text>
          <Divider />
          <Text>{item.Leaving_Time} </Text>
          <Divider />
        </View>
        <View style={styles.verticleLine}></View>
        <View style={{ marginRight: 30 }}>
          <Text>Entry :</Text>
          <Divider />
          <Text>Exit :</Text>
          <Divider />
        </View>
        <Text>{item.Employee_ID} </Text>
      </View>
    );
  };

  const SerchEmployee = (value) => {
    setSearch(value);
    let employee = Employees.filter((per) => per.Employee_Name === value);
    // console.log(employee.length > 0);
    if (employee.length > 0) {
      setEmpItems(employee);
    } else {
      setEmpItems(Employees);
    }
  };

  let listEmployees = empItems.map((item, index) => (
    <GetEmployeeCard key={index} item={item} />
  ));

  return (
    <View style={styles.container}>
     
        <Text style={styles.sectionTitle}>Today's shift</Text>

        <SearchBar
          round={true}
          lightTheme={true}
          placeholder="search worker..."
          onChangeText={SerchEmployee}
          value={search}
        />
      
        <ScrollView style={styles.tasksWrapper}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.items}>{listEmployees}</View>
        </ScrollView>
      
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {

    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 35,
    alignSelf: "flex-end",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 30,
  },

  item: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
});
