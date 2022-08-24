import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert ,Dimensions  } from 'react-native'
import React from 'react'




const numColumns =2
const WIDTH =Dimensions.get('window').width



export default function WorkerMenu({workerCardsArr, navigation }) {
   
   
   
   
   
   
    const GetItem =({item,index})=>{





        return (
    
          
                
    <TouchableOpacity style={styles.item} key ={index}  onPress={()=>  navigation.navigate('CustomerHome')}>
    <Image style={{width:60,height:60}} source={item.pic} />
             <Text style={styles.itemText} >{item.title}</Text>
    </TouchableOpacity>
         
             
    
          
          
        )
    }
        
  return (
    <View style={styles.container}> 
    <FlatList   
       data={workerCardsArr} 
       renderItem = {GetItem}
       keyExtarctor = {(item,index)=> index.toString()}
       numColumns = {numColumns}
       />
      </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:20
       },
   
       item: {
  
       backgroundColor: 'rgba(35,100,168, 0.2)',
       alignItems: "center",
       justifyContent: "center",
       
        height:WIDTH/numColumns,
        flex: 1,
        margin:10
       },
       itemText: {
  
       color:'black',
          fontSize:20,
      
        },
    Image: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        padding: 5
    },
    Text: {
        backgroundColor: 'black',
        color: 'white',
        fontWeight: "bold",
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
    },
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        justifyContent: 'space-between'
    },
    button:
    {
      
        padding:10, 
       
    
    },
    buttonText:{
        fontSize:20,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10

    },
    buttonRooms: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 10,
    },
    user_Name:
    {
        backgroundColor: 'black',
        alignItems: 'center',
        textAlign: 'center',
    },
    innerText: {
        color: 'white',
        padding: 5
    }
});  