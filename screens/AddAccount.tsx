import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { DatalistInput, RoundBtn, SSBarWithSaveArea, TopNav, ViewCol } from '../assets/Class'
import * as CTEXT from '../assets/CustomText'
import styles, { vw } from '../assets/stylesheet'
import clrStyle from '../assets/componentStyleSheet'
import { useNavigation } from '@react-navigation/native'
import { sharpDownArrow, sharpUpArrow } from '../assets/svgXml'

export default function AddAccount() {
  const navigation = useNavigation();

  const [isPressed, setIsPressed] = React.useState(false)
  const [walletsName, setWalletsName] = React.useState('')
  const [walletsBalance, setWalletsBalance] = React.useState<number>(0)
  const [walletsSrc, setWalletsSrc] = React.useState('')
  const [mainCurency, setMainCurrency] = React.useState('$')

  const introSrc = () => {
    return (
      <ViewCol style={[styles.padding8vw, styles.flex1, styles.justifyContentSpaceBetween]}>
        <ViewCol style={[styles.gap6vw]}>
          <CTEXT.Body2 color={clrStyle.grey80}>This account can be used to manage your finances.</CTEXT.Body2>
          <CTEXT.TitleX style={{ fontSize: vw(10), lineHeight: vw(11) }}>Set up your account</CTEXT.TitleX>
        </ViewCol>
        <RoundBtn title='Get started' onPress={() => { setIsPressed(true) }} bgColor={clrStyle.black} textColor={clrStyle.white} textClass={CTEXT.Title3} customStyle={[styles.justifyContentCenter, styles.w100, styles.borderRadius4vw]} />
      </ViewCol>
    )
  }

  return (
    <SSBarWithSaveArea barColor={isPressed ? clrStyle.yellow : clrStyle.white} barContentStyle='dark-content' bgColor={isPressed ? clrStyle.yellow : clrStyle.white}>
      <TopNav title='Add new account' />
      <ViewCol style={[styles.flex1, styles.justifyContentEnd]}>
        <View style={[styles.paddingH6vw]}>
          <CTEXT.Body2 color={clrStyle.grey80}>Enter the initial balance</CTEXT.Body2>
          <CTEXT.TitleX style={{ fontSize: vw(10), lineHeight: vw(14) }}>{mainCurency} {walletsBalance}</CTEXT.TitleX>
        </View>
        <ViewCol style={[styles.bgcolorBlack, styles.positionRelative, styles.padding6vw, styles.gap4vw, { borderTopRightRadius: vw(8), borderTopLeftRadius: vw(8) }]}>
          <TextInput
            value={walletsName}
            onChangeText={setWalletsName}
            placeholder='Wallet name'
            placeholderTextColor={clrStyle.grey80}
            style={[styles.padding4vw, styles.border1, styles.borderRadius4vw, { borderColor: clrStyle.white, color: clrStyle.white }]}
          />
          <DatalistInput
            options={[`d.`, `dafs`]}
            onSelect={setWalletsSrc}
            placeholder='Currency'
            extendIcon={sharpDownArrow(vw(4), vw(4))}
            CustomStyle={{
              classStyle: [styles.padding4vw, styles.border1, styles.borderRadius4vw, { borderColor: clrStyle.white }],
              textStyle: [styles.flex1, { color: 'white' }],
              inputStyle: [styles.flex1, { color: 'white' }],
              dropdownStyle: [styles.marginTop2vw],
              dropdownItemStyle: [styles.padding4vw, styles.marginVertical1vw, styles.borderRadius4vw, { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }],
            }}
          />
        </ViewCol>
      </ViewCol>
    </SSBarWithSaveArea>
  )
}


