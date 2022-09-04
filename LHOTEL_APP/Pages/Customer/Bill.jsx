import React from "react";
import { Text,View,FlatList, StyleSheet} from "react-native";
// import {
//   Card,
//   CardTitle,
//   CardContent,
//   CardAction,
//   CardButton,
//   CardImage,
// } from "react-native-material-cards";
// import { ScrollView } from "react-native-virtualized-view";



import { useState, useEffect } from "react";
export default function Bill({ route, navigation }) {
  
  let { Products, totalSum } = route.params || [];

  const GetItem = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text >$ {item.price*item.amountTaken}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, paddingVertical: 10 }}>{item.name}</Text>
          <Text style={{ color: "#888", paddingBottom: 5 }}>
            {"amount : " + item.amountTaken}
          </Text>
        </View>
      </View>
    );
  };
   
  return (
    <View style={styles.container}>
      <Text style={styles.HeadLine}>My Bill</Text>
      {Products === undefined || Products.length === 0 ? null : (
        <View>
          <Text style={styles.footerText}>Total : {totalSum}$</Text>
        </View>
      )}
      <FlatList
        data={Products}
        renderItem={GetItem}
        keyExtractor={(item, index) => index.toString()}
      />

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 60,
    height: 100,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    margin: 2,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#ddd",
  },
  priceStyle: {
    //   backgroundColor: "#ddd",
    width: 80,
    alignItems: "center",
    marginTop: 13,

    borderRadius: 3,
  },
  counterStyle: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerStyle: {
    flex: 1,
    elevation: 2,

    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
  },
  footerContainerStyle: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
  },
  buttonContainerStyle: {
    // flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
  },
 
  checkoutButtonStyle: {
    backgroundColor: "#f39c12",
    padding: 10,
   
    borderRadius: 3,
  },
  totalContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  goodsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItem: {
    padding: 12,
    backgroundColor: "#d7d7d7",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  listView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listText: {
    fontSize: 16,
  },
 
  footerText: {
    color: "#888",
    fontSize: 20,
    paddingRight: 16,
    paddingVertical:15,
    textAlign: "left",
  },

  item: {
    backgroundColor: "#FFF",
    padding: 15,
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
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    // maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

// const Item = ({item, deleteItem}) => {
//   return (

//     <TouchableOpacity  style={styles.listItem}>
//     <View style={styles.listView}>
//         <Text style={styles.listText}>{item.text}</Text>
//         <Icon name="ios-close" size={35} color="#a8a9ad" />
//       </View>
//   </TouchableOpacity>

//   );
// };
