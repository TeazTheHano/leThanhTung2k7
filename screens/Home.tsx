import { View, Text, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { storageGetItem } from '../data/storageFunc'
import { SelectorInput, SSBarWithSaveArea, TopBarWithThingInMiddleAllCustomable } from '../assets/Class'
import * as SVG from '../assets/svgXml'
import styles, { vh, vw } from '../assets/stylesheet'
import { Body3 } from '../assets/CustomText'
import { DATAmonthList } from '../data/factoryData'
import clrStyle from '../assets/componentStyleSheet'

export default function Home() {
  const navigation = useNavigation()

  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date()),
  );
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    storageGetItem('user').then(res => {
      if (!res) {
        navigation.navigate('Onboarding' as never)
      }
    })
  }, [])

  return (
    <SSBarWithSaveArea>
      <TopBarWithThingInMiddleAllCustomable
        leftItem={<View style={[styles.border1, styles.borderRadius100, styles.marginTop1vw, { width: vw(6), height: vw(6), }]} />}
        rightItemFnc={() => { }}
        rightItemIcon={SVG.bellIcon(vw(6), vw(6), 'black')}
        style={{
          // container: [styles.border1],
          iconLeftStyle: [styles.paddingTop1vw]
        }}
        centerChildren={
          <SelectorInput
            onSelect={(option: string) => setSelectedMonth(option)}
            options={DATAmonthList}
            defaultValue={selectedMonth}
            extendIcon={SVG.sharpDownArrow(vw(3), vw(3), 'black')}
            extendAnimationSrc={rotateAnimation}
            TextClass={Body3}
            CustomStyle={{
              classStyle: [styles.border1, styles.padding2vw, styles.gap2vw, styles.borderRadius20, { borderColor: clrStyle.grey60 }],
              dropdownStyle: [{ maxHeight: vh(30) }, styles.gap2vw],
              dropdownItemStyle: [styles.padding2vw,],
            }}
          />
        }
      />
    </SSBarWithSaveArea>
  )
}