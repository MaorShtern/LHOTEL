import { View, Text } from 'react-native'
import React from 'react'
import single_room from '../pic/single-room.jpg'
import double_room from '../pic/double-room.jpg'
import suites_room from '../pic/suites-room.jpg'
import { SliderBox } from "react-native-image-slider-box";


const images =[
  single_room , double_room , suites_room
]

export default function CarouselImages() {
  return (
    <View>
      <SliderBox images={images} />
    </View>
  )
}