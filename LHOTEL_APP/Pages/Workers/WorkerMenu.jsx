import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Dimensions, Animated, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../images'


const workerCardsArr = [
  { code: 999, role: 'General', title: 'Exit shift', pic: images.exit_shift, routeNavigation: '' },
  { code: 999, role: 'General', title: 'Enter shift', pic: images.enter_shift, routeNavigation: '' },
  { code: 1, role: 'Manager', title: 'Employees Management', pic: images.workers_management, routeNavigation: 'Home' },
  { code: 1, role: 'Manager', title: 'Current Shift', pic: images.shift, routeNavigation: '' },
  { code: 1, role: 'Manager', title: 'Reports', pic: images.reports, routeNavigation: '' },
  { code: 2, role: 'Receptionist', title: 'Add charge', pic: images.add_charge, routeNavigation: '' },
  { code: 2, role: 'Receptionist', title: 'Check In', pic: images.checkIn, routeNavigation: '' },
  { code: 2, role: 'Receptionist', title: 'Check Out', pic: images.checkOut, routeNavigation: '' },
  { code: 3, role: 'Room service', title: 'Tasks', pic: images.tasks, routeNavigation: 'Tasks' },
]


const numColumns = 2
const WIDTH = Dimensions.get('window').width



export default function WorkerMenu({ route, navigation }) {

  let { id } = route.params

  // console.log(id);
  const [currentUserArr, SetCurrentUserArr] = useState([])

  useEffect(() => {
    GetCardsByRole()
  }, []);


  const GetCardsByRole = () => {
    let arrayTempCards = []
    switch (id) {
      case '1':
        arrayTempCards = workerCardsArr.filter((workerCard) =>
          workerCard.code === 999 || workerCard.code === 1 ||
          workerCard.code === 2 || workerCard.code === 3)
        break;
      case '2':
        arrayTempCards = workerCardsArr.filter((workerCard) =>
          workerCard.code === 999 || workerCard.code === 2)
        break;
      case '3':
        arrayTempCards = workerCardsArr.filter((workerCard) =>
          workerCard.code === 999 || workerCard.code === 3)

        break;
      default:
        Alert.alert("error");
    }
    SetCurrentUserArr(arrayTempCards);
  }
  // let { currentUserArr, setWorkerCode, navigation } = route.params

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

  // console.log(currentUserArr);


  return (
    // <ScrollView>
    //   <View style={styles.container}>
    //     <TouchableOpacity onPress={() => { setWorkerCode(1) }}>
    //       <Text style={styles.Text} >Exit</Text>
    //     </TouchableOpacity>
    //     <FlatList
    //       data={currentUserArr}
    //       renderItem={GetItem}
    //       keyExtarctor={(item, index) => index.toString()}
    //       numColumns={numColumns}
    //       scrollEnabled={false}
    //     />
    //   </View>
    // </ScrollView>
    <View style={styles.container}>
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
