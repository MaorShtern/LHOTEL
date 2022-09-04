import React, { useEffect, useState } from 'react'

import { TextInput } from 'react-native-paper';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Dimensions, Animated, ScrollView ,StatusBar} from 'react-native'

export default function ManualCheckIn({ route, navigation }) {
    let { id } = route.params
    const [text, setText] = useState("");
    //  const [text, setText] = useState("");
    //  const [text, setText] = useState("");
    //  const [text, setText] = useState("");
    //  const [text, setText] = useState("");
    //  const [text, setText] = useState(""); 
    //  const [text, setText] = useState(""); 
    //  const [text, setText] = useState("");
   
     
  return (
 <View style={styles.container}>
    <Text style={styles.sectionTitle}>Check In </Text>
  <ScrollView >
      <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          onChangeText={text => setText(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
         
          onChangeText={text => setText(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
         
          onChangeText={text => setText(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"

          onChangeText={text => setText(text)}
        />
   </ScrollView>
 </View>
 
   
  )
}const styles = StyleSheet.create({
    input: {
      width: 350,
      height: 35,
      
      margin: 10,
      padding: 8,
      color: 'black',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',
    },
    container: {
      flex: 1,
    marginHorizontal:20,
    marginVertical:20,
      paddingTop:80,
     
     
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        paddingBottom: 35,
        alignSelf: "flex-end",
      },
  })