import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, } from "react-native";
import { Divider } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import { ActivityIndicator } from "react-native";


export default function Shift() {

  const [DBShifts, SetDBShifts] = useState()
  const [empItems, setEmpItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, SetLoading] = useState(false)


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
        SetDBShifts(temp)
        setEmpItems(temp)
        SetLoading(true)
        return
      }
      else
        getDBProducts()

    } catch (error) {
      alert(error)
    }
    SetLoading(true)

    // SetLoading(false)
  }
  // GetTakenRooms
  // select * from Customers_Rooms

  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );


  const GetEmployeeCard = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text>{item.Description}</Text>
        </View>
        <View>
        </View>
        <View>
          <Text>{item.EntranceTime} </Text>
          <Divider />
          <Text>{item.LeavingTime} </Text>
          <Divider />
        </View>
        <View style={styles.verticleLine}></View>
        <View style={{ marginRight: 30 }}>
          <Text>Entry :</Text>
          <Divider />
          <Text>Exit :</Text>
          <Divider />
        </View>
        <View>
          <Text>{item.EmployeeName} </Text>
          {/* <Text>{item.EmployeeID} </Text> */}
        </View>
      </View>
    );
  };

  const SerchEmployee = (value) => {
    setSearch(value);
    let employee = empItems.filter((per) => per.EmployeeName === value);
    if (employee.length === 1) {
      setEmpItems(employee);
    } else {
      setEmpItems(DBShifts);
    }
  };

  let listEmployees = empItems.map((item, index) => (<GetEmployeeCard key={index} item={item} />));


  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>Today's shift</Text>

      {/* <SearchBar
        round={true}
        lightTheme={true}
        placeholder="search worker..."
        onChangeText={SerchEmployee}
        value={search}
      /> */}

      <ScrollView style={styles.tasksWrapper}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">

        <View style={styles.items}>
          {loading ? listEmployees : <Spinner />}
        </View>
        {/* <View style={styles.items}>{listEmployees}</View> */}
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
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10

  },
});
