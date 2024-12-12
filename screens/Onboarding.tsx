import { View, Text, Image, ImageStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../assets/stylesheet'
import { useNavigation } from '@react-navigation/native'
import { Title1 } from '../assets/CustomText'

export default function Onboarding() {
  const navigation = useNavigation()

  const [step, setStep] = useState<number>(0)

  const data = [
    [require('../assets/photos/Onboarding/Onb1.png'), ``, ``],
    [require('../assets/photos/Onboarding/Onb2.png'), `Effortless expense management`, `Track all your spending with just one app - MONA`],
    [require('../assets/photos/Onboarding/Onb3.png'), `Automatically categorize all expenses`, `Easily track your transactions with categories and financial reports over time`],
    [require('../assets/photos/Onboarding/Onb4.png'), `Create a budget`, `Decide on smart spending limits`],
  ]

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      setStep(0)
      const intervalId = setInterval(() => {
        setStep(prevStep => (prevStep + 1) % data.length)
      }, 4000)
      return () => clearInterval(intervalId)
    })
    return unsub
  }, [navigation, step, data.length])

  return (
    <View style={[styles.flex1]}>
      <Image source={data[step][0]} resizeMethod='resize' resizeMode='cover' style={[styles.w100vw, styles.h100vh] as ImageStyle} />
      <View style={[styles.h50vh, styles.w90vw, styles.alignSelfCenter, styles.positionAbsolute, styles.bottom0]}>

        <Title1 style={[styles.textCenter]}>{data[step][1]}</Title1>

      </View>
    </View>
  )
} 