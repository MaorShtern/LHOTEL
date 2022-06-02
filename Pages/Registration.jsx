import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native'
import React from 'react'

export default function Registration({ navigation }) {
  return (

    <ScrollView>
      <Text style={styles.HeadLine}>Registration</Text>
      <View style={styles.label}>
        <TextInput placeholder='Full Name' style={styles.TextInput}></TextInput>
        <View style={{ height: 10 }}></View>
        <TextInput placeholder='Email' style={styles.TextInput} ></TextInput>
        <View style={{ height: 10 }}></View>
        <TextInput placeholder='Password' style={styles.TextInput} secureTextEntry={true}></TextInput>
        <View style={{ height: 10 }}></View>
        <TextInput placeholder='Re-Password' secureTextEntry={true} style={styles.TextInput}></TextInput>
        <View style={{ height: 10 }}></View>
        <TextInput placeholder='Phone Number' style={styles.TextInput}></TextInput>
      </View>
      <View style={styles.ButtonContainer}>
        <Button title="DELETE" ></Button>
        <Button title="SUBMIT" ></Button>
      </View>

    </ScrollView>
  )
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
    flex: 2,
    padding: 20,
  },
  TextInput: {
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    padding: 10,

  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 20
  },

});