import { View, Text, StyleSheet, TextInput, Button,RefreshControl } from "react-native";
import React from "react";

export default function Login({ navigation }) {


  return (
    <View>
      <Text style={styles.HeadLine}>Login</Text>
      <View style={styles.label}>
        <Text style={styles.Text}>Email: </Text>
        <TextInput style={styles.TextInput}></TextInput>
      </View>
      <View style={styles.label}>
        <Text style={styles.Text}>Password: </Text>
        <TextInput style={styles.TextInput}></TextInput>
      </View>

      <View style={styles.ButtonContainer}>
        <Button title="DELETE" ></Button>
        <Button title="SUBMIT" ></Button>
      </View>
      

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
  label: {
    padding: 20,
  },
  TextInput: {
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 5,
    height: 50,
    padding: 10
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft:70,
    paddingRight:70,
    paddingTop:10
  },

});
