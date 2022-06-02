import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Login({ navigation }) {
  return (
    <View>
      <Text style={styles.HeadLine}>Login</Text>
      <Text style={styles.HeadLine}>Email</Text>
      <Text style={styles.HeadLine}>Password</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,

    fontWeight: "bold",
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
});
