import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { images } from "../../images";
import { useState, useEffect, useContext } from "react";
import Counter from "react-native-counters";
import AppContext from "../../AppContext";

// const ProductsArr = [
//   {id: 1,image: images.waterbottle,name: "Water bottle", price: 10,amountTaken: 0},
//   {id: 2, image: images.whisky,name: "Whiskey",price: 5,amountTaken: 0},
//   {id: 3,image: images.choclatebar, name: "Chocolate bar",price: 16,amountTaken: 0 },
//   {id: 4,image: images.alcoholWine, name: "White wine",price: 3, amountTaken: 0 },
//   { id: 5,image: images.cocacola,name: "Coca Cola bottle", price: 20, amountTaken: 0},
// ];

const ProductsArr = [
  { ProductCode: 1, ProductDec: "Coca cola", Price: 15, Amount: 0 },
  { ProductCode: 2, ProductDec: "Vodka", Price: 35, Amount: 0 },
  { ProductCode: 3, ProductDec: "Bamba", Price: 20, Amount: 0 },
  { ProductCode: 4, ProductDec: "Doritos", Price: 20, Amount: 0 },
  { ProductCode: 5, ProductDec: "Sprite", Price: 15, Amount: 0 },
  { ProductCode: 6, ProductDec: "Whiskey", Price: 45, Amount: 0 },
  { ProductCode: 7, ProductDec: "Chips", Price: 20, Amount: 0 },
];

export default function Products({ RoomNumber, SetRequest, navigation }) {
  // useEffect(() => { SetCount(0) }, []);
  const myContext = useContext(AppContext);
  const [totalSum, SetTotalSum] = useState(0);
  const [start, SetStart] = useState(0);
  const [showBox, setShowBox] = useState(true);
  const [goodsCount, SetGoodsCount] = useState(0);
  const [counter, SetCounter] = useState(0);
  counter
  useEffect(() => {
    SetTotalSum(0);
    SetGoodsCount(0);
    SetCounter(0);
  }, []);

  const cancel = () => {
    SetRequest("");
    SetTotalSum(0);
    SetGoodsCount(0);
    SetStart(0);
    RestCount();
  };
  const showConfirmDialog = () => {
    return Alert.alert(
      "order",
      "Are you sure you want to  add the selected products to your account?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            AddChargeToDB();

            // let temp = []
            // ProductsArr.map((item) =>
            //   temp.push(
            //     {
            //       ProductCode: item.ProductCode,
            //       image: item.image,
            //       ProductDec: item.ProductDec,
            //       Price: item.Price,
            //       Amount:  item.Amount

            //     }))

            //     let selectedItems = ProductsArr.filter((selectedItem) =>
            // selectedItem.Amount !== 0 )

            // navigation.navigate("Bill",{Products:selectedItems,totalSum:totalSum});
            cancel();
            // getSelectedProducts()
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
  // const getSelectedProducts = () => {
  //   for (let i = 0; i < data.length; i++) {
  //     data[i].amountTaken = 0;
  //   }

  // };
  const ChargeToDB = async (selectedItem) => {
 try {
    
          const requestOptions = {
            method: "POST",
            body: JSON.stringify({
              CustomerID: myContext.bill.CustomerID,
              RoomNumber: RoomNumber,
              ProductDec: selectedItem.ProductDec,
              Amount: selectedItem.Amount,
              PaymentMethod: "Credit",
            }),
            headers: { "Content-Type": "application/json" },
          };
          // console.log(requestOptions.body);
          let result = await fetch ("http://proj13.ruppin-tech.co.il/AddCharge", requestOptions);
          let temp = await result.json();
          if (temp) {
            SetCounter(counter+1)
            // counter++;
            // GetAllTasksFromDB()
          }
        
    
      // if (counter > 0) {
      //   alert("The purchase was successfully registered");
      //   navigation.goBack();
      // } else {
      //   alert("The purchase has not been made");
      // }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }





  }
  const AddChargeToDB = () => {
    // try {
      let selectedItems = [];
      ProductsArr.map((selectedItem) => {if (selectedItem.Amount !== 0)
      selectedItems.push(selectedItem)
      }

  );
  // console.log(selectedItems);
  selectedItems.map((selectedItem) =>ChargeToDB(selectedItem)) 
     if (counter > 0) {
        alert("The purchase was successfully registered");
        navigation.goBack();
      } else {
        alert("The purchase has not been made");
      }
  
  
    //   let counter = 0;
    //   for (let index = 0; index < ProductsArr.length; index++) {
    //     if (ProductsArr[index].Amount > 0) {
    //       const requestOptions = {
    //         method: "POST",
            // body: JSON.stringify({
            //   CustomerID: myContext.bill.CustomerID,
            //   RoomNumber: RoomNumber,
            //   ProductDec: ProductsArr[index].ProductDec,
            //   Amount: ProductsArr[index].Amount,
            //   PaymentMethod: "Credit",
            // }),
    //         headers: { "Content-Type": "application/json" },
    //       };
    //       // console.log(requestOptions.body);
    //       let result = await fetch(
    //         "http://proj13.ruppin-tech.co.il/AddCharge",
    //         requestOptions
    //       );
    //       let temp = await result.json();
    //       if (temp) {
    //         counter++;
    //         // GetAllTasksFromDB()
       
    //       }
    //     }
    //   }
    //   console.log("counter" +  counter);
    //   if (counter > 0) {
    //     alert("The purchase was successfully registered");
    //     navigation.goBack();
    //   } else {
    //     alert("The purchase has not been made");
    //   }
    // } catch (error) {
    //   alert(error);
    //   SetLoading(true);
    // }
  };

  const RestCount = () => {
    for (let i = 0; i < ProductsArr.length; i++) {
      ProductsArr[i].Amount = 0;
    }

    // SetTotalSum(0);
    // SetGoodsCount(0);
    // SetStart(0)
  };

  // console.log(start);

  const Calculate_Final_Amount = () => {
    let sum = 0;
    let goodsCounter = 0;
    for (let i = 0; i < ProductsArr.length; i++) {
      let Price = ProductsArr[i].Price;
      let Amount = ProductsArr[i].Amount;
      let tempToatal = Amount * Price;
      goodsCounter += Amount;
      sum += tempToatal;
    }

    SetTotalSum(sum);
    SetGoodsCount(goodsCounter);
  };

  const GetItem = ({ item, index }) => {
    return (
      <View
        style={
          index + 1 === ProductsArr.length
            ? styles.lastItemStyle
            : styles.containerStyle
        }
      >
        {/* <Image source={item.image} style={styles.imageStyle} /> */}

        <View style={styles.textStyle}>
          <Text
            style={{
              color: "#2e2f30",
              fontSize: 15,
              paddingLeft: 5,
              paddingTop: 35,
            }}
          >
            {item.ProductDec}
          </Text>
          <View style={styles.priceStyle}>
            <Text style={{ color: "#2e2f30", fontSize: 15 }}>
              ${item.Price}
            </Text>
          </View>
        </View>

        <View style={styles.counterStyle}>
          <Counter
            initial={start}
            start={start}
            max={5}
            style={styles.counterStyle}
            // onChange={(count) => {SetCount.bind(this)}}
            onChange={(count) => {
              (item.Amount = count),
                // console.log(count),
                Calculate_Final_Amount();
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.headerStyle}>
        {/* <TouchableOpacity onPress={() => { SetRequest(""), SetTotalSum(0), SetGoodsCount(0), SetStart(0) }}> */}
        <TouchableOpacity onPress={cancel}>
          <Icon name="ios-close" size={35} color="#a8a9ad" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20 }}>Mini Bar</Text>
        {/* <Text onPress={RestCount}>Empty</Text> */}
      </View>
      {/* <Header  func={func}/> */}
      <FlatList
        data={ProductsArr}
        renderItem={GetItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
      <View style={styles.footerContainerStyle}>
        <TotalComponent totalSum={totalSum} goodsCount={goodsCount} />
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            style={styles.checkoutButtonStyle}
            onPress={() => showConfirmDialog()}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Footer totalSum={totalSum} goodsCount={goodsCount} /> */}
    </View>
  );
}

const TotalComponent = ({ totalSum, goodsCount }) => {
  // const { totalContainerStyle, goodsStyle, totalStyle } = styles;
  return (
    <View style={styles.totalContainerStyle}>
      <View style={styles.goodsStyle}>
        <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
        <Text>{goodsCount} goods</Text>
      </View>

      <View style={styles.totalContainerStyle}>
        <Text>Total - ${totalSum} </Text>
      </View>
    </View>
  );
};
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
