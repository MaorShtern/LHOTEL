import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  ScrollView
} from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";

import React from "react";

import Icon from "react-native-vector-icons/Ionicons";
import { images } from "../../images";
import { useState, useEffect } from "react";
export default function Bill({ route, navigation }) {
  let { data, totalSum } = route.params || [];

  const GetItem = ({ item, index }) => {
    //     <TouchableOpacity  style={styles.listItem}>
    //     <View style={styles.listView}>
    //         <Text style={styles.listText}>{item.text}</Text>
    //         <Icon name="ios-close" size={35} color="#a8a9ad" />
    //       </View>
    //   </TouchableOpacity>

    return (
      <View>
        <Card>
          <CardTitle
            title={item.name}
            subtitle={"amount : " + item.amountTaken}
          />
          {/* <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" /> */}
          <CardAction separator={false} inColumn={false}>
            <Text style={{ paddingBottom: 10, paddingRight: 20 }}>price :{item.price} $
            </Text>
          </CardAction>
        </Card>

        {/*     
            <View style={styles.counterStyle}>
              <Counter
                initial={start}
                start={start}
                max={5}
                style={styles.counterStyle}
                // onChange={(count) => {SetCount.bind(this)}}
                onChange={(count) => {
                  (item.amountTaken = count),
                    console.log(count)
                    // Calculate_Final_Amount();
                }}
              />
            </View> */}
      </View>
    );
  };
  console.log(data);
  return (
    <ScrollView>
      {/* <View style={styles.headerStyle}>
   
      <TouchableOpacity onPress={Cansel}>
        <Icon name="ios-close" size={35} color="#a8a9ad" />
      </TouchableOpacity>

      <Text style={{ fontSize: 20 }}>Mini Bar</Text>
  
    </View> */}
      <Text style={styles.HeadLine}>My Bill</Text>
      {data === undefined || data.length === 0 ? null : <View style={styles.footer}>
        <Text style={styles.footerText}>Total : {totalSum}$</Text>
      </View>}
      <FlatList
        data={data}
        renderItem={GetItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />

      {/* <View style={styles.footerContainerStyle}>
      <TotalComponent totalSum={totalSum} goodsCount={goodsCount} />
      <View style={styles.buttonContainerStyle}>
        <TouchableOpacity
          style={styles.checkoutButtonStyle}
          onPress={() => showConfirmDialog()}
        >
          <Text style={{ color: "#fff",textAlign:'center' }}>ORDER</Text>
        </TouchableOpacity>
      </View>
    </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  }, HeadLine: {
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
  // closeButtonStyle: {
  //   backgroundColor: "#7f8c8d",
  //   padding: 10,
  //   paddingRight: 30,
  //   paddingLeft: 30,
  //   borderRadius: 3,
  // },
  checkoutButtonStyle: {
    backgroundColor: "#f39c12",
    padding: 10,
    // textAlign:'center',
    // paddingRight: 60,
    // paddingLeft: 60,
    // justifyContent: "center",
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
  }, footer: {
    width: '100%',
    height: 100,

    bottom: 10,
    justifyContent: 'center',
    // backgroundColor: 'skyblue',
  },
  footerText: {
    color: '#888',
    fontSize: 26,
    paddingLeft: 20,
    textAlign: 'right',
  }
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
