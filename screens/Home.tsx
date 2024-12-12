import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getStorageItem } from '../data/storageFunc'

export default function Home() {
  const navigation = useNavigation()

  useEffect(() => {
    getStorageItem('user').then(res => {
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