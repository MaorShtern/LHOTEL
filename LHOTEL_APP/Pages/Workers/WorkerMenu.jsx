import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Dimensions, Animated } from 'react-native'
import React from 'react'

// import Icon from 'react-native-vector-icons/Octicons';


const numColumns = 2
const WIDTH = Dimensions.get('window').width



export default function WorkerMenu({ route }) {

  let { currentUserArr, setWorkerCode, navigation } = route.params

  // let { setWorkerCode,currentUserArr,navigation} = props

  // const HandelNavigation = (route)=>{
  //     // console.log(route);
  //     props.HandelNavigation(route)
  // }

  const HandelCardClick = (title) => {

    let today = new Date();
    if (title === 'Enter shift')
      alert('start shift at : ' + today.getHours() + ':' + today.getMinutes())
    else if (title === 'Exit shift')
      alert('end shift at : ' + today.getHours() + ':' + today.getMinutes())
  }

  const GetItem = ({ item, index }) => {
    // console.log(item.routeNavigation);
    return (
      <TouchableOpacity style={styles.item} key={index}
        onPress={() => item.routeNavigation === '' ? HandelCardClick(item.title) : navigation.navigate(item.routeNavigation)}>

        <Image style={{ width: 60, height: 60 }} source={item.pic} />
        <Text style={styles.itemText} >{item.title}</Text>
        {/* <Text>{item.toString()}</Text> */}
      </TouchableOpacity>
    )
  }


  //onPress={()=> { doAnimation(closeState,1,250),setInfo(false)}}
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => { setWorkerCode(1) }}>
                <Text style={styles.Text} >Exit</Text>
            </TouchableOpacity> */}
      <FlatList
        data={currentUserArr}
        renderItem={GetItem}
        keyExtarctor={(item, index) => index.toString()}
        numColumns={numColumns}
      />
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  item: {
    backgroundColor: "rgba(35,100,168, 0.2)",
    alignItems: "center",
    justifyContent: "center",

    height: WIDTH / numColumns,
    flex: 1,
    margin: 10,
  },
  itemText: {
    color: "black",
    fontSize: 20,
  },
  Image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
    padding: 5,
  },
  Text: {

    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    textDecorationLine: "underline",
    textAlign: "right",
    paddingLeft: 30,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
    textShadowRadius: 10,
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
});
