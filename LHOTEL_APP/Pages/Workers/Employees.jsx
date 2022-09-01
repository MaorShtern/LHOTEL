

import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";

import { SearchBar } from "react-native-elements";
import { Divider, Text } from "react-native-paper";

const Users = [
  {Employee_ID: -1,Employee_Code: null,Employee_Name: "John",Phone_Number: null,Birth_Date: null,
  Worker_Code: null,Role: "General",Hourly_Wage: null,Address: null,Entry: "09:00",Exit: "18:00"},
  {Employee_ID: 111,Employee_Code: 1,Employee_Name: "Miri",Phone_Number: null,Birth_Date: null,
  Worker_Code: null,Role: "Manager",Hourly_Wage: null,Address: null,Entry: "10:00",Exit: "15:00"},
  {Employee_ID: 222,Employee_Code: 2,Employee_Name: "Alon",Phone_Number: null,Birth_Date: null,
  Worker_Code: null,Role: "Receptionist",Hourly_Wage: null,Address: null,Entry: "08:00",Exit: "17:00"},
  {Employee_ID: 333,Employee_Code: 3,Employee_Name: "Tamar",Phone_Number: null,Birth_Date: null,
  Worker_Code: null,Role: "Room service",Hourly_Wage: null,Address: null,Entry: "09:00",Exit: "16:00"},
];

export default function Employees() {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(Users);
    setMasterDataSource(Users);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.Employee_Name
          ? item.Employee_Name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const GetItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text>{item.Role}</Text>
        </View>
        <View></View>
        <View>
          <Text>{item.Entry} </Text>
          <Divider />
          <Text>{item.Exit} </Text>
          <Divider />
        </View>
        <View style={styles.verticleLine}></View>
        <View>
          <Text>Entry :</Text>
          <Divider />
          <Text>Exit :</Text>
          <Divider />
        </View>
        <Text>{item.Employee_Name + "   "} </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's shift</Text>

        <SearchBar
          style={{ paddingHorizontal: 15 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction("")}
          round={true}
          lightTheme={true}
          placeholder="search worker..."
          value={search}
        />
        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.items}>
            {/* This is where the tasks will go! */}

            {filteredDataSource.map((item, index) => {
              return (
                <View key={index}>
                  <GetItem item={item} />
                </View>
              );
            })}
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 35,
    alignSelf: "flex-end",
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
