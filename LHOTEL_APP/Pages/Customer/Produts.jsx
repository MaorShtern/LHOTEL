import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Counter from "react-native-counters";

// const Products = [
//   { id: 1, image: images.waterbottle, name: "Water bottle", price: 10, amountTaken: 0 },
//   { id: 2, image: images.whisky, name: "Whiskey", price: 5, amountTaken: 0 },
//   { id: 3, image: images.choclatebar, name: "Chocolate bar", price: 16, amountTaken: 0 },
//   { id: 4, image: images.alcoholWine, name: "White wine", price: 3, amountTaken: 0 },
//   { id: 5, image: images.cocacola, name: "Coca Cola bottle", price: 20, amountTaken: 0 },
// ];

export default function Produts(props) {
  // useEffect(() => { SetCount(0) }, []);

  let { item } = props


  // const [totalSum, SetTotalSum] = useState(0);
  // const [start, SetStart] = useState(0);
  // const [showBox, setShowBox] = useState(true);
  // const [goodsCount, SetGoodsCount] = useState(0);

  // useEffect(() => {
  //   SetTotalSum(0);
  //   SetGoodsCount(0);
  // }, []);

  // const cancel = () => {
  //   SetRequest("");
  //   SetTotalSum(0);
  //   SetGoodsCount(0);
  //   SetStart(0);
  //   RestCount();
  // };
  // const showConfirmDialog = () => {
  //   return Alert.alert(
  //     "order",
  //     "Are you sure you want to  add the selected products to your account?",
  //     [
  //       // The "Yes" button
  //       {
  //         text: "Yes",
  //         onPress: () => {
  //           setShowBox(false);

  //           let temp = []
  //           Products.map((item) =>
  //             temp.push(
  //               {
  //                 id: item.id,
  //                 image: item.image,
  //                 name: item.name,
  //                 price: item.price,
  //                 amountTaken: item.amountTaken

  //               }))

  //           let selectedItems = Products.filter((selectedItem) =>
  //             selectedItem.amountTaken !== 0)


  //           navigation.navigate("Bill", { Products: selectedItems, totalSum: totalSum });
  //           cancel()
  //           // getSelectedProducts()
  //         },
  //       },
  //       // The "No" button
  //       // Does nothing but dismiss the dialog when tapped
  //       {
  //         text: "No",
  //       },
  //     ]
  //   );
  // };
  // // const getSelectedProducts = () => {
  // //   for (let i = 0; i < data.length; i++) {
  // //     data[i].amountTaken = 0;
  // //   }


  // // };

  // const RestCount = () => {
  //   for (let i = 0; i < Products.length; i++) {
  //     Products[i].amountTaken = 0;
  //   }

  //   // SetTotalSum(0);
  //   // SetGoodsCount(0);
  //   // SetStart(0)
  // };

  // // console.log(start);

  // const Calculate_Final_Amount = () => {
  //   let sum = 0;
  //   let goodsCounter = 0;
  //   for (let i = 0; i < Products.length; i++) {
  //     let price = Products[i].price;
  //     let amountTaken = Products[i].amountTaken;
  //     let tempToatal = amountTaken * price;
  //     goodsCounter += amountTaken;
  //     sum += tempToatal;
  //   }

  //   SetTotalSum(sum);
  //   SetGoodsCount(goodsCounter);
  // };

  // const GetItem = ({ item, index }) => {
  //   return (
  //     <View
  //       style={
  //         index + 1 === Products.length
  //           ? styles.lastItemStyle
  //           : styles.containerStyle
  //       }
  //     >
  //       <Image source={item.image} style={styles.imageStyle} />

  //       <View style={styles.textStyle}>
  //         <Text
  //           style={{
  //             color: "#2e2f30",
  //             fontSize: 15,
  //             paddingLeft: 5,
  //             paddingTop: 35,
  //           }}
  //         >
  //           {item.name}
  //         </Text>
  //         <View style={styles.priceStyle}>
  //           <Text style={{ color: "#2e2f30", fontSize: 15 }}>
  //             ${item.price}
  //           </Text>
  //         </View>
  //       </View>

  //       <View style={styles.counterStyle}>
  //         <Counter
  //           initial={start}
  //           start={start}
  //           max={5}
  //           style={styles.counterStyle}
  //           // onChange={(count) => {SetCount.bind(this)}}
  //           onChange={(count) => {
  //             (item.amountTaken = count),
  //               // console.log(count),
  //               Calculate_Final_Amount();
  //           }}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  return (

    <View style={styles.procs}>
      {/* <Image source={item.image} style={styles.imageStyle} /> */}

      <View style={styles.textStyle}>
        <Text style={styles.description}>
          {item.Description}
        </Text>
        <View style={styles.priceStyle}>
          <Text style={{ color: "#2e2f30", fontSize: 15 }}>
            ${item.PricePerUnit}
          </Text>
        </View>
      </View>

      <View style={styles.counterStyle}>
        <Counter
          initial={0}
          start={0}
          max={5}
          style={styles.counterStyle}
          onChange ={(count) => props.AddToCart(item.ProductCode, count)}
        // onChange={(count) => {SetCount.bind(this)}}
        // onChange={(count) => {
        //   (item.amountTaken = count),
        //     // console.log(count),
        //     Calculate_Final_Amount();
        // }}
        />
      </View>

      {/* <View style={styles.headerStyle}> */}
      {/* <TouchableOpacity onPress={() => { SetRequest(""), SetTotalSum(0), SetGoodsCount(0), SetStart(0) }}> */}
      {/* <TouchableOpacity onPress={cancel}>
          <Icon name="ios-close" size={35} color="#a8a9ad" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20 }}>Mini Bar</Text> */}
      {/* <Text onPress={RestCount}>Empty</Text> */}
      {/* </View> */}
      {/* <Header  func={func}/> */}

      {/* <View style={styles.footerContainerStyle}>
        <TotalComponent totalSum={totalSum} goodsCount={goodsCount} />
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            style={styles.checkoutButtonStyle}
            onPress={() => showConfirmDialog()}
          >
            <Text style={{ color: "#fff", textAlign: 'center' }}>ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer totalSum={totalSum} goodsCount={goodsCount} /> */}
    </View>
  );
}

// const TotalComponent = ({ totalSum, goodsCount }) => {
//   // const { totalContainerStyle, goodsStyle, totalStyle } = styles;
//   return (
//     <View style={styles.totalContainerStyle}>
//       <View style={styles.goodsStyle}>
//         <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
//         <Text>{goodsCount} goods</Text>
//       </View>

//       <View style={styles.totalContainerStyle}>
//         <Text>Total - ${totalSum} </Text>
//       </View>
//     </View>
//   );
// };
// const Footer = ({ totalSum, goodsCount }) => {
//   const {
//     footerContainerStyle,
//     buttonContainerStyle,
//     closeButtonStyle,
//     checkoutButtonStyle,
//   } = styles;
//   return (
//     <View style={footerContainerStyle}>
//       <TotalComponent totalSum={totalSum} goodsCount={goodsCount} />
//       <View style={buttonContainerStyle}>
//         <TouchableOpacity
//           style={closeButtonStyle}
//           onPress={() => console.log("dgdfgdgfdfg")}
//         >
//           <Text style={{ color: "#fff" }}>Close</Text>
//         </TouchableOpacity>

//         <View style={checkoutButtonStyle}>
//           <Text style={{ color: "#fff" }}>Go to checkout</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const Header = ({func}) => {
//   return (
//     <View style={styles.headerStyle}>
//        <TouchableOpacity   onPress={() => console.log("dgdfgdgfdfg")}>
//          <Icon name="ios-close" size={35} color="#a8a9ad" />

//           </TouchableOpacity>

//       <Text style={{ fontSize: 18 }}>Mini Bar</Text>
//       <Text onPress={func}>Empty</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  procs: {
    backgroundColor: "gray",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
  },
  description: {
    color: "#2e2f30",
    fontSize: 15,
    paddingLeft: 5,
    paddingTop: 35,
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
    justifyContent: "center",
  },
  priceStyle: {
    backgroundColor: "#ddd",
    width: 40,
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
});
{
  /* <View style={styles.footerContainerStyle}>
<TotalComponent totalSum={totalSum} goodsCount={goodsCount} />
<View style={styles.buttonContainerStyle}>
  <TouchableOpacity
    style={styles.closeButtonStyle}
    onPress={() => console.log("dgdfgdgfdfg")}
  >
    <Text style={{ color: "#fff" }}>Close</Text>
  </TouchableOpacity>

  <View style={styles.checkoutButtonStyle}>
    <Text style={{ color: "#fff" }}>Go to checkout</Text>
  </View>
</View>
</View> */
}
