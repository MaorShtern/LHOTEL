import { View, ScrollView, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React,{ useState,useEffect } from 'react'
import Icon from 'react-native-vector-icons/Octicons';
import ReservationCard from './ReservationCard'

export default function ConfirmationPage( {route},props) {
   
   
    const [arrRooms, setarrRooms] = useState([])

     let { entryDate, exitDate, amount_of_people } = props
     useEffect(() => {func()}, []);
        
    
    // let { entryDate, exitDate, totalPrice, cardholder_Name, card_Number, amount_of_people } = props
    let numberOfNights = exitDate - entryDate
    let { total,Name,CardNum ,rooms} = route.params
    // const persons = [];
    const  func = ()=> {
        let arr = [];
        let  counter = 0;
        let room_type =['Single','Double','Suit'];
        let room_price =[70,110,150];
       rooms.map((item,index)=>{
            if (item > 0){
              for (let i = 0; i<item; i++){
            
                arr.push (<ReservationCard key={counter} roomType ={room_type[index]}  pricePerNight= {room_price[index]} entryDate={entryDate} exitDate={exitDate} breakfast={false} amountOfRooms = {2}/>)
                counter++;
            }
            }
            // for (let i = 0; i<item; i++){
                // console.log(item);
                // console.log(index);
            //   }
            //   console.log(arrRooms.length);
            //   //setarrRooms(arrRooms)
            //   return arrRooms;

 })


 setarrRooms(arr)


}

    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Order Confirmation <Icon name='check' size={40}  color='green' /></Text>
            <Text style={styles.SubHeadLine}>Your order has been successfully saved! looking forward to see you!!!</Text>
            {arrRooms}
            {/* {rooms.map((item)=>{
                
                if (item >0)
                { 
                 for (let i = 0; i<item; i++){
                    arrRooms.push(<ReservationCard key={counter} roomType ={counter}  pricePerNight= {70} entryDate={entryDate} exitDate={exitDate} breakfast={false} amountOfRooms = {2}/>) 
                    counter++;
                 }
                 return arrRooms
                }
            // for (let i = 0; i<item; i++){
             
                // console.log(item);
                // console.log(index);
            //   }
            //   console.log(arrRooms.length);
            //   //setarrRooms(arrRooms)
            //   return arrRooms;

  })} */}
            {/* <ReservationCard />
            <ReservationCard /> */}
            <View>
                <View style={styles.OrderDetails}>
                    <Text style={styles.pay}>Payment details</Text>
                    <Text>totalPrice: {total}$</Text>
                    <Text>Cardholder's Name: {Name}</Text>
                    <Text>Card Number: {CardNum}</Text>
                    <Text>Amount Of People : {amount_of_people}</Text>
                    <Text>Number Of Nights : {numberOfNights}</Text>
                </View>
            </View>
           

            <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text>Delete order</Text>
                </TouchableOpacity>
                {/* <Button title="Delete order" ></Button> */}
            </View>

            {/* <TouchableOpacity title='kfnknvks' style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>vdvdvxv c</Text>
            </TouchableOpacity> */}

            <View style={{ height: 30 }}></View>

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
    SubHeadLine: {
        fontSize: 21,
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
    },
    ButtonContainer: {
        paddingTop: 15,
        width: 200,
        alignSelf: 'center'
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    pay: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        fontSize: 15
    },
    OrderDetails: {
        width: 300,
        backgroundColor: 'gray',
        alignSelf: 'center',
        alignItems: 'flex-end',
        padding: 20,
        margin: 5
    },
    button:
    {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'

    },

})