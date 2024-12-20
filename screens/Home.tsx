import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { storageGetItem } from '../data/storageFunc'

export default function Home() {
  const navigation = useNavigation()

  useEffect(() => {
    storageGetItem('user').then(res => {
      if (!res) {
        navigation.navigate('Onboarding' as never)
      }
    })
  }, [])

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}