import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CardRoom from './CardRoom'

export default function SaveRoom({ navigation }) {
  return (
    <ScrollView>
      <Text style={styles.HeadLine}>Choose a room</Text>
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <View style={styles.save}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')} >
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  save: {
    paddingBottom: 30,
    paddingTop: 20,
    width: 100,
    alignSelf: 'center',
  },
  button:
  {
    flex: 1,
    width: 100,
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
})