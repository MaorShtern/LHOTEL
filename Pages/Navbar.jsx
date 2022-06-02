import { View, Text, Button } from 'react-native'
import React from 'react'


export default function Navbar({navigation}) {
    return (
        <View>
            <Button title='Homepage' onPress={()=> navigation.navigate('Homepage')}></Button>
          
            <Button title='Login' onPress={()=> navigation.navigate('Login')}></Button>
            {/* <Button title='Payment' onPress={()=> navigation.navigate('Payment')}></Button> */}
            <Button title='Registration' onPress={()=> navigation.navigate('Registration')}></Button>
            {/* <Button title='SaveRoom' onPress={()=> navigation.navigate('SaveRoom')}></Button> */}
            <Button title='Booking' onPress={()=> navigation.navigate('Booking')}></Button>
        </View>
    )
}