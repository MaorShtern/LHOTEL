import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native'
import React from 'react'

export default function Booking({ navigation }) {
  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Booking</Text>
      <View style={styles.label}>

      <Text style={styles.Text}>Full Name: </Text>
        <TextInput  placeholder='Center Me' style={styles.TextInput}></TextInput>

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
  Text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
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