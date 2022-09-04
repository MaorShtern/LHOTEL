import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";
import { Divider, Text } from "react-native-paper";
import moment from "moment";

const reservations = [
  // { Room_Number: 2, Bill_Number:2,	Customer_ID:222,	Bill_Date:'2021-01-01'	,Entry_Date:'2021-01-01',
  // Exit_Date:'2021-01-03',	Amount_Of_People:1,	Room_Status:'Occupied'},
  {
    Room_Number: 3,
    Bill_Number: 3,
    Customer_ID: 333,
    Bill_Date: "2021-01-01",
    Entry_Date: "2021-01-01",
    Exit_Date: "2021-01-05",
    Amount_Of_People: 2,
    Room_Status: "Reserved",
  },
  {
    Room_Number: 4,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Reserved",
  },
  {
    Room_Number: 12,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Reserved",
  },
  {
    Room_Number: 13,
    Bill_Number: 38,
    Customer_ID: 7878,
    Bill_Date: "2022-09-03",
    Entry_Date: "2022-09-05",
    Exit_Date: "2022-09-10",
    Amount_Of_People: 3,
    Room_Status: "Reserved",
  },
  {
    Room_Number: 5,
    Bill_Number: 5,
    Customer_ID: 555,
    Bill_Date: "2020-09-12",
    Entry_Date: "2020-09-12",
    Exit_Date: "2020-09-16",
    Amount_Of_People: 2,
    Room_Status: "Reserved",
  },
];

export default function CheckIn({ route, navigation }) {
  // Render

  const ReservationCard = () => {
    let reservationsArr = reservations.filter(
      (reservation) => reservation.Customer_ID === 7878
    );
    const renderItem = ({ item }) => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Divider style={{ width: 2, height: "80%", marginHorizontal: 10 }} />
        <Text>Room : {item.Room_Number}</Text>
      </View>
    );

    let currentReservation = reservationsArr[0];
    return (
      <View
        style={{
          marginHorizontal: 10,
          paddingTop: 10,
          height: 150,
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontSize: 18 }}>
          <Image style={styles.icon} source={images.calendar} />
          {" " +
            currentReservation.Entry_Date.split("-")[2] +
            "-" +
            moment(new Date(currentReservation.Exit_Date)).format("DD.MM.YYYY")}{" "}
          ({moment(currentReservation.Exit_Date).diff(moment(currentReservation.Entry_Date), "days")}{" "}
          nights){" "}
        </Text>
        <Text style={{ color: "#888", paddingHorizontal: 5 }}>
          {currentReservation.Amount_Of_People} adults{" "}
        </Text>

        <View
          style={{
            color: "#888",
            margin: 5,
            flexDirection: "row",
          }}
        >
          <FlatList
            data={reservationsArr}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />

       
        </View>
      </View>
    );
  };

  const SaveReservationToDB = async () => {

    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        "mail": "7878",
        "Entry_Date": '2022-09-05'
      }),
      headers: { 'Content-Type': 'application/json' }
    };
    let result = await fetch ('http://proj13.ruppin-tech.co.il/CheckIn', requestOptions);
    let isOk = await result.json();

    // console.log(user);
    // console.log(email);
    // console.log(password);
    if (isOk) {
     alert( "You have checked in successfully ! Welcome to LHOTEL")
      setTimeout(() => {
        navigation.navigate('Home');
        }, 1000)
      // navigation.navigate('Home')
      // console.log(user);

      // saveUser(user)
      return
    }
    // FetchData()
  }









  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flex: 2 }}>
        <Image
          source={images.hotelloby}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "80%",
          }}
        />
        <View
          style={[
            {
              position: "absolute",
              bottom: "5%",
              left: "5%",
              right: "5%",
              borderRadius: 15,
              // padding: SIZES.padding,
              backgroundColor: "#fff",
            },
            styles.shadow,
          ]}
        >
          <ReservationCard />
        </View>

        {/* Header Buttons */}
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 20,
            right: 20,
            //height: 50,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Image
                source={images.enter_shift}
                resizeMode="cover"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
         
        </View>
      </View>

      {/* Body */}
      <View style={{ flex: 1.5 }}>
        {/* Icons */}

        {/* About */}
        <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 20 }}>About</Text>
          <Text style={{ marginTop: 10, color: "#888" }}>
            Located at the Alps with an altitude of 1,702 meters. The ski area
            is the largest ski area in the world and is known as the best place
            to ski. Many other facilities, such as fitness center, sauna, steam
            room to star-rated restaurants.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={{ flex: 0.5, paddingHorizontal: 10 }}>
        <LinearGradient
          style={[{ height: 70, width: "100%", borderRadius: 15 }]}
          colors={["#edf0fc", "#d6dfff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30 }}>$1000</Text>
            </View>

            <TouchableOpacity
              style={{ width: 130, height: "80%", marginHorizontal: 10 }}
              onPress={() => SaveReservationToDB()}
            >
              <LinearGradient
                style={[
                  {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  },
                ]}
                colors={["#46aeff", "#5884ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={{ color: "#fff" }} >CHECK IN NOW</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,

    // padding: 20,
  },
});
