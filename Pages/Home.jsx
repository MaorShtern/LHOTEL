import { Animated,View, Image,StyleSheet,Text,TouchableOpacity} from 'react-native'
import React from 'react'
import hotelback from '../Pic/hotelback.jpg'
import { BackgroundImage } from '@rneui/base';
import{ useState, useEffect } from 'react'

import { TextInput,Button } from "react-native-paper";


export default function Home({ navigation }) {
  const [openState, setOpenState] = useState(new Animated.Value(100))
  const [closeState, setCloseState] = useState(new Animated.Value(1))
  const [info, setInfo] = useState(false)
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//      doAnimation(closeState,1,500);
//     });
//     return unsubscribe;
// }, [navigation]);
// useEffect(() => {
//   const unsubscribe = navigation.addListener('focus', () => {
//     doAnimation(closeState,1,250)
//   });
//   return unsubscribe;
// }, [navigation]);
  useEffect(() => {
 doAnimation(closeState,1,250)
 setInfo(false)
  },[])
  // useEffect(() => {
  //   if()
  //   doAnimation(button2,8,500)
  //    },[])
  const doAnimation = (btn,val,timer) => {
   
    Animated.timing(btn,
      {
        toValue: val,
        duration: timer,
        useNativeDriver: false
      }
    ).start();

  }

  // const [fontsLoaded] = useFonts({
  //   'Arialic Hollow': require('../assets/fonts/Arialic Hollow.ttf'),
  // });
  // if(!fontsLoaded){
  //   return null;
  // }
  return (

  <View style={styles.container}>


<Animated.View style={{ flex: 2, backgroundColor: 'black' }} >

<BackgroundImage  source ={hotelback}style={{ flex: 2 }}/>

<Text style={{
fontSize : 55,
// fontFamily : 'Arialic Hollow',
position : 'absolute',
justifyContent:'center',
zIndex: 1,
fontWeight: 'bold',
bottom : -10,
color:'white'
}}>
LHOTEL
</Text>
</Animated.View>  

 <Animated.View style={{flex:closeState,  backgroundColor: info ? 'rgba(0,0,0, 0.1)' : 'white'}}>
  {/* <LinearGradient colors ={['red','blue']} style={{flex:1}}> */}
{info ?(  <View style={styles.loginContainer}>
    
    <TextInput
      label="ID"
      left={<TextInput.Icon name="account" />}
      mode="outlined"
      style={{ margin: 10 , paddingLeft: 3 }}
    />
   

    <TextInput
      label="Password"
      left={<TextInput.Icon name="lock" />}
      mode="outlined"
      style={{ margin: 10 , paddingLeft: 3 }}
    />
    <TouchableOpacity style={styles.btn} >
        <Text style={{fontSize : 20,color:'white',fontWeight:'800'}}>LOGIN</Text>
      </TouchableOpacity>
  <TouchableOpacity>
        <Text style={styles.underLineText} onPress={()=> { doAnimation(closeState,1,250),setInfo(false)}}>I'm not a worker</Text>
      </TouchableOpacity>
     
  </View>)
  :
  (<View style={styles.container}>
   <Text style={{fontSize : 20,color:'black'}}>
DETAILS ABOUT THE HOTEL

obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam</Text>
<View  style={styles.ButtonContainer}>
<TouchableOpacity style={styles.button} onPress = {()=> {navigation.navigate('CustomerHome'),doAnimation(closeState,1,500)}}>
       {/* doAnimation(closeState,1,500) */}
       {/* navigation.navigate('Login') */}
      <Text style={styles.startTextStyle} >Customer</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.button}
  onPress={() => {doAnimation(closeState,8,500),setInfo(true)}}>
  <Text style={styles.startTextStyle}>Worker</Text>
  </TouchableOpacity>
 </View>
</View> )}
</Animated.View>
</View> 
  


  )
}
//  const Temp = () => {
//   return(

// <View style={styles.container}>
  
//   <Text style={{
// fontSize : 20,
// color:'black'
// }}>
// DETAILS ABOUT THE HOTEL

// obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam


// </Text>

 
//   <View  style={styles.ButtonContainer}>
//   <TouchableOpacity
//       style={styles.button}
//       onPress = {()=> {navigation.navigate('Login'),doAnimation(closeState,1,500)}}
//     >
//        {/* doAnimation(closeState,1,500) */}
//        {/* navigation.navigate('Login') */}
//       <Text style={styles.startTextStyle} >Customer</Text>

//     </TouchableOpacity>
//     <TouchableOpacity
//       style={styles.button}
//       onPress={() => doAnimation(closeState,8,500)
//         // if(!info)
//         // {
//         //   doAnimation(closState,8,500)
//         // }else
//         // {
//         //   doAnimation(openState,8,250)
//         // }
//         // setInfo(!info)
//         }
//     >
//       <Text style={styles.startTextStyle}>Worker</Text>
//     </TouchableOpacity>



//   </View>
//  </View>




//   )
  
  

//  }
// const WorkerLoginForm = ()=>{
//   return(
//     <View style={styles.loginContainer}>
    
//     <TextInput
//       label="ID"
//       left={<TextInput.Icon name="account" />}
//       mode="outlined"
//       style={{ margin: 10 , paddingLeft: 3 }}
//     />
    
//     <TextInput
//       label="Password"
//       left={<TextInput.Icon name="lock" />}
//       mode="outlined"
//       style={{ margin: 10 , paddingLeft: 3 }}
//     />
//   <TouchableOpacity>
//         <Text style={styles.underLineText} onPress={()=> setInfo(true)}>I'm not a worker</Text>
//       </TouchableOpacity>
//   </View>
//   )
// }



const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: "center",
    //   justifyContent: "center"
    //   backgroundColor: 'yellow'
    }, 
    AnimatedView: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
      },
    scrollContainer: {
      height: 300,
      alignItems: "center",
      justifyContent: "center"
    },
    card: {
      flex: 1,
      marginVertical: 4,
      marginHorizontal: 16,
      borderRadius: 5,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center"
    },
    textContainer: {
      backgroundColor: "rgba(0,0,0, 0.7)",
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 5
    },
    infoText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold"
    },
    normalDot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: "silver",
      marginHorizontal: 4
    },
    indicatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }, 
     ButtonContainer: {
    
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      
      justifyContent: 'space-between'
  },
    orangeButtonStyle: {
      backgroundColor: 'orange',
      height: 45,
      width: 50,
      
      borderRadius: 5,
      shadowColor: 'grey',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },button:
    {
        // backgroundColor: 'gray',
      
    
      marginHorizontal:22,
      
   
       shadowColor: 'grey',
       shadowOffset: {width: 0, height: 4},
       shadowOpacity: 0.3,
       shadowRadius: 5,
       elevation: 5,
        // backgroundColor: 'rgba(111, 202, 186, 1)',
         backgroundColor: 'orange',
        // borderColor: 'transparent',
        width : 150,
       padding:20,
        borderWidth: 0,
        borderRadius: 30,
    },
    startTextStyle: {
      color:'white',
      fontSize:17,
      textAlign:"center",
     fontWeight: '700' ,
     letterSpacing: 0.5,
    },
    loginContainer:{
     
      paddingHorizontal: 24,
      paddingVertical: 70,
  
      // alignItems: "center",
      justifyContent: "center"
    },
    underLineText: {
      marginVertical:25,
        fontSize: 25,
        textDecorationLine: 'underline',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      btn:{
        height: 45,
        width:318,
        borderRadius:10,
        backgroundColor : "rgba(0,0,0, 0.7)",
       alignItems:'center',
      marginHorizontal:10,
       justifyContent:'center',
        marginTop :20
      }
  });























// const FadeInView = (props) => {
//     const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
//     useEffect(() => {
//       Animated.timing(
//         fadeAnim,
//         {
//           toValue: 1,
//           duration: 10000,
//         }
//       ).start();
//     }, [fadeAnim])
  
//     return (
//       <Animated.View                 // Special animatable View
//         style={{
//           ...props.style,
//           opacity: fadeAnim,         // Bind opacity to animated value
//         }}
//       >
//         {props.children}
//       </Animated.View>
//     );
//   }
  
//   // You can then use your `FadeInView` in place of a `View` in your components:
//   export default () => {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
//           <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
//         </FadeInView>
//       </View>
//     )
//   }















// <View style={{marginVertical:15}}>
// <Text style={{fontSize : 20,color:'black'}}>
// DETAILS ABOUT THE HOTEL obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam</Text>
// </View>
// <View  style={styles.ButtonContainer}>
// <TouchableOpacity
//     style={styles.button}
//     onPress = {()=> {navigation.navigate('Login'),doAnimation(closeState,1,500)}}
//   >
//      {/* doAnimation(closeState,1,500) */}
//      {/* navigation.navigate('Login') */}
//     <Text style={styles.startTextStyle} >Customer</Text>

// </TouchableOpacity>
// <TouchableOpacity
//     style={styles.button}
//     onPress={() => {doAnimation(closeState,8,500),setInfo(true)}
//       // if(!info)
//       // {
//       //   doAnimation(closState,8,500)
//       // }else
//       // {
//       //   doAnimation(openState,8,250)
//       // }
//       // setInfo(!info)
//       }
//   >
//     <Text style={styles.startTextStyle}>Worker</Text>
// </TouchableOpacity>
// </View>

{/* <View style={styles.container}>
  
  <Text style={{
fontSize : 20,
color:'black'
}}>
DETAILS ABOUT THE HOTEL

obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam


</Text>

 
  <View  style={styles.ButtonContainer}>
  <TouchableOpacity
      style={styles.button}
      onPress = {()=> {navigation.navigate('Login'),doAnimation(closeState,1,500)}}
    >
       {/* doAnimation(closeState,1,500) */}
       {/* navigation.navigate('Login') */}
    //   <Text style={styles.startTextStyle} >Customer</Text>

    // </TouchableOpacity>
    // <TouchableOpacity
    //   style={styles.button}
    //   onPress={() => doAnimation(closeState,8,500)
        // if(!info)
        // {
        //   doAnimation(closState,8,500)
        // }else
        // {
        //   doAnimation(openState,8,250)
        // }
        // setInfo(!info)
        // }
    // >
    //   <Text style={styles.startTextStyle}>Worker</Text>
    // </TouchableOpacity>



//   </View>
//  </View> */}