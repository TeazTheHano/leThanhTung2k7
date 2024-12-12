import { View, Text, Image, ImageStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles, { vw } from '../assets/stylesheet'
import { useNavigation } from '@react-navigation/native'
import { Body1, Title1, Title3 } from '../assets/CustomText'
import { RoundBtn, ViewCol, ViewColBetweenCenter } from '../assets/Class'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Onboarding() {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<number>(0)

  const data = [
    [require('../assets/photos/Onboarding/Onb1.png'), ``, ``],
    [require('../assets/photos/Onboarding/Onb2.png'), `Effortless expense management`, `Track all your spending with just one app - MONA`],
    [require('../assets/photos/Onboarding/Onb3.png'), `Automatically categorize all expenses`, `Easily track your transactions with categories and financial reports over time`],
    [require('../assets/photos/Onboarding/Onb4.png'), `Create a budget`, `Decide on smart spending limits`],
  ]

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStep((prevStep) => ((prevStep + 1) % data.length) || 1)
    }, 4000)
    return () => clearInterval(intervalId)
  }, [data.length])

  return (
    <View style={[styles.flex1]}>
      <Image source={data[step][0]} resizeMethod='resize' resizeMode='cover' style={[styles.w100vw, styles.h100vh] as ImageStyle} />
      {
        step > 0 ?
          <ViewColBetweenCenter style={[styles.h50vh, styles.w90vw, styles.alignSelfCenter, styles.positionAbsolute, styles.bottom0, { paddingBottom: vw(4) + (insets.bottom || vw(2)) }]}>
            <ViewCol style={[styles.gap2vw]}>
              <Title1 style={[styles.textCenter]}>{data[step][1]}</Title1>
              <Body1 style={[styles.textCenter, styles.paddingH6vw]}>{data[step][2]}</Body1>
            </ViewCol>
            <ViewCol style={[styles.gap4vw]}>
              <RoundBtn title='Sign Up'
                customStyle={[
                  styles.bgcolorBlack,
                  styles.w90vw,
                  styles.borderRadius4vw,
                  styles.justifyContentCenter
                ]}
                textClass={Title3}
                textColor='white'
                onPress={() => navigation.navigate('Login', { kind: 'register' })} />
              <RoundBtn
                title='Log In'
                customStyle={[
                  styles.bgcolorWhite,
                  styles.w90vw,
                  styles.borderRadius4vw,
                  styles.justifyContentCenter
                ]}
                textClass={Title3}
                onPress={() => navigation.navigate('Login', { kind: 'login' })}
              />
            </ViewCol>
          </ViewColBetweenCenter>
          : null
      }
    </View>
  )
} 