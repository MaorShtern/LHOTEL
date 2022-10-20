import * as React from "react";
import {  View,  ImageBackground,  Text,  StyleSheet, Image,  ScrollView,  Linking,  TouchableOpacity,  StatusBar,} from "react-native";
import CarouselImages from "./CarouselImages";
import { images } from "../../images";
import { Icon } from "react-native-elements";

const fullAddress = "חדרה";
const url = Platform.select({
  ios: `maps:0,0?q=${fullAddress}`,
  android: `geo:0,0?q=${fullAddress}`,
});

export default function CustomerHome({ navigation }) {
  return (
    <View>
      <TouchableOpacity style={styles.icon}>
        <Icon
          name="west"
          size={40}
          type="material"
          color="#fff"
          onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageBackground
          source={images.fadeloby}
          resizeMode="stretch"
          style={{
            height: 650,
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.header}>LHOTEL</Text>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL("mailto:maor100maor@example.com")}
              title="support@example.com"
            >
              <Text style={styles.buttonText}>EMAIL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL("tel:052-6211881")}
            >
              <Text style={styles.buttonText}>CALL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={styles.buttonText}>ADDRESS</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.Text}>POPULERS ROOMS</Text>
        </ImageBackground>

        <CarouselImages />

        <View style={{ height: 10 }}></View>

        <Text style={styles.Text}>ACTIVITES</Text>

        <View
          style={{
            // flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <Image style={styles.Image} source={images.bar} />
          <Image style={styles.Image} source={images.events} />
        </View>
        <View
          style={{
            // flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ paddingRight: 75 }}>BAR</Text>
          <Text style={{ paddingLeft: 75 }}>EVENTS</Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <Image style={styles.Image} source={images.spa} />
          <Image style={styles.Image} source={images.lobi} />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ paddingRight: 75 }}>SPA</Text>
          <Text style={{ paddingLeft: 75 }}>LOBI</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
    padding: 5,
  },
  header: {
    paddingBottom: 10,
    fontSize: 40,
    textAlign: "center",
    textShadowColor: "#B59410",

    textShadowOffset: { width: -1, height: 1 },
    color: "#fff",
    textShadowRadius: 10,
  },
  Text: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    padding: 20,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 30,
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    color: "#fff",
    textShadowRadius: 10,
  },
  icon: {
    position: "absolute",
    top: 50,
    left: 30,

    zIndex: 2,
  },
  buttonRooms: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    padding: 10,
  },
  user_Name: {
    backgroundColor: "black",
    alignItems: "center",
    textAlign: "center",
  },
  innerText: {
    color: "white",
    padding: 5,
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
    color: "white",
    backgroundColor: "black",
  },
  LogoutBtn: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
});
