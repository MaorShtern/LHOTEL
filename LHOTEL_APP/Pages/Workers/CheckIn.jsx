import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";
import { Divider, Text } from "react-native-paper";
export default function CheckIn({ route, navigation }) {
  // Render

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
          <View>
            <View
              style={{
                marginHorizontal: 10,
                paddingTop:10,
                height: 150,
                alignItems: "flex-end",
              }}
            >
                   
              <Text style={{ fontSize: 18 }}><Image style={styles.icon} source={images.calendar} /> 22-24.09.22 (2 nights) </Text>
              <Text  style={{color:"#888",paddingHorizontal:5 }}>2 adults </Text>
              {/* <Text>ID : 888 </Text> */}
              <View>
                <Divider />
              </View>
          
              <Text style={{ color: "#888", margin: 5 }}>
                Ski Villa offers simple rooms with mountain views in front of
                the ski lift to the Ski Resort
              </Text>
            </View>
          </View>

          <View></View>
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
          {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { console.log("Menu on pressed") }}
                        >
                            <Image
                                source={images.alcoholWine}
                                resizeMode="cover"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </TouchableOpacity>
                    </View> */}
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
              onPress={() => {
                console.log("Booking on pressed");
              }}
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
                <Text style={{ color: "#fff" }}>CHECK IN NOW</Text>
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
  },  icon: {
    width: 20,
    height: 20,

    // padding: 20,
 
  },
});
