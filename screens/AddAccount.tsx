import { View, Text, TextInput, Animated, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { DatalistInput, RoundBtn, SSBarWithSaveArea, TopNav, ViewCol, ViewColCenter, ViewRowStartCenter } from '../assets/Class'
import * as CTEXT from '../assets/CustomText'
import styles, { vh, vw } from '../assets/stylesheet'
import clrStyle from '../assets/componentStyleSheet'
import { useNavigation } from '@react-navigation/native'
import { sharpDownArrow, sharpUpArrow } from '../assets/svgXml'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CurrencyFormat, WalletFormat } from '../data/interfaceFormat'
import { DATAcurrency } from '../data/factoryData'
import { storageSaveAndOverwrite } from '../data/storageFunc'
import { SvgXml } from 'react-native-svg'

export default function AddAccount() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [step, setStep] = React.useState(0)
  const [walletsName, setWalletsName] = React.useState('')
  const [walletsBalance, setWalletsBalance] = React.useState<string | number>(0)
  const [walletsSrc, setWalletsSrc] = React.useState('')
  const [mainCurency, setMainCurrency] = React.useState<CurrencyFormat['name']>(DATAcurrency[0].name)
  const [currentSymbol, setCurrentSymbol] = React.useState(DATAcurrency[0].symbol)

  useEffect(() => {
    if (mainCurency && DATAcurrency.filter((item) => item.name === mainCurency)[0]) {
      setCurrentSymbol(DATAcurrency.filter((item) => item.name === mainCurency)[0].symbol)
    }
  }, [mainCurency])

  function saveWallet() {
    if (walletsName && walletsBalance) {
      let wallet: WalletFormat = {
        name: walletsName,
        amount: parseInt(walletsBalance as string),
        sourceOfMoney: walletsSrc,
        currency: mainCurency,
        currencySymbol: currentSymbol
      }
      storageSaveAndOverwrite('walletsL', wallet, walletsName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')).then((res) => {
        if (res) {
          setStep(2)
          setTimeout(() => {
            navigation.navigate('BottomTab' as never)
          }, 1000);
        } else {
          Alert.alert('Failed to save wallet', 'Please try again')
        }
      })
    }
  }

  const introSrc = () => {
    return (
      <ViewCol style={[styles.padding8vw, styles.flex1, styles.justifyContentSpaceBetween]}>
        <ViewCol style={[styles.gap6vw]}>
          <CTEXT.Body2 color={clrStyle.grey80}>This account can be used to manage your finances.</CTEXT.Body2>
          <CTEXT.TitleX style={{ fontSize: vw(10), lineHeight: vw(11) }}>Set up your account</CTEXT.TitleX>
        </ViewCol>
        <RoundBtn title='Get started' onPress={() => { setStep(1) }} bgColor={clrStyle.black} textColor={clrStyle.white} textClass={CTEXT.Title3} customStyle={[styles.justifyContentCenter, styles.w100, styles.borderRadius4vw]} />
      </ViewCol>
    )
  }

  const addWallets = () => {
    return (
      <ViewCol style={[styles.flex1, styles.justifyContentEnd]}>
        <View style={[styles.paddingH6vw]}>
          <CTEXT.Body2 color={clrStyle.grey80}>Enter the initial balance</CTEXT.Body2>
          <ViewRowStartCenter>
            <CTEXT.TitleX style={{ fontSize: vw(10), lineHeight: vw(14) }}>{currentSymbol} </CTEXT.TitleX>
            <TextInput
              value={walletsBalance.toString()}
              onChangeText={(text) => {
                const newText = text.replace(/[^0-9.]/g, '');
                setWalletsBalance(newText);
              }}
              keyboardType='numeric'
              placeholder='0.00'
              placeholderTextColor={clrStyle.grey80}
              style={[styles.flex1, { fontFamily: 'Kanit-Bold', fontSize: vw(10), lineHeight: vw(14) }]}
            />
          </ViewRowStartCenter>
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
            options={[`Cash`, `Wallet`, `Bank`, `Card`, `Other`]}
            onSelect={setWalletsSrc}
            placeholder='Wallet source. Fill your custom'
            extendIcon={sharpDownArrow(vw(4), vw(4))}
            extendAnimationSrc={rotateAnimation}
            CustomStyle={{
              classStyle: [styles.padding4vw, styles.border1, styles.borderRadius4vw, { borderColor: clrStyle.white }],
              textStyle: [styles.flex1, { color: 'white' }],
              inputStyle: [styles.flex1, { color: 'white' }],
              dropdownStyle: [styles.marginTop2vw, { maxHeight: vh(40) },],
              dropdownItemStyle: [styles.padding4vw, styles.marginVertical1vw, styles.borderRadius4vw, { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }],
            }}
          />
          <DatalistInput
            options={DATAcurrency.map((item) => item.name)}
            onSelect={setMainCurrency}
            placeholder='Currency'
            extendIcon={sharpDownArrow(vw(4), vw(4))}
            extendAnimationSrc={rotateAnimation}
            CustomStyle={{
              classStyle: [styles.padding4vw, styles.border1, styles.borderRadius4vw, { borderColor: clrStyle.white }],
              textStyle: [styles.flex1, { color: 'white' }],
              inputStyle: [styles.flex1, { color: 'white' }],
              dropdownStyle: [styles.marginTop2vw, { maxHeight: vh(40) },],
              dropdownItemStyle: [styles.padding4vw, styles.marginVertical1vw, styles.borderRadius4vw, { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }],
            }}
          />
          <RoundBtn title='Continue' onPress={() => { saveWallet() }} bgColor={clrStyle.white} textColor={clrStyle.black} textClass={CTEXT.Title3} customStyle={[styles.justifyContentCenter, styles.marginTop6vw, styles.w100, styles.borderRadius4vw]} />
          <View style={[styles.bgcolorBlack, styles.positionAbsolute, styles.w100vw, { height: inset.bottom, bottom: -inset.bottom }]} />
        </ViewCol>
      </ViewCol>
    )
  }

  const activateWallet = () => {
    return (
      <ViewColCenter style={[styles.w100vw, styles.h100vh, styles.bgcolorBlack, styles.positionAbsolute, styles.top0]}>
        <SvgXml xml={`<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M64 16C54.5065 16 45.2262 18.8152 37.3327 24.0895C29.4391 29.3638 23.2868 36.8603 19.6538 45.6312C16.0208 54.402 15.0702 64.0532 16.9223 73.3643C18.7744 82.6754 23.346 91.2282 30.0589 97.9411C36.7718 104.654 45.3246 109.226 54.6357 111.078C63.9468 112.93 73.598 111.979 82.3688 108.346C91.1397 104.713 98.6363 98.5609 103.911 90.6674C109.185 82.7738 112 73.4935 112 64C112 51.2696 106.943 39.0606 97.9411 30.0589C88.9394 21.0571 76.7304 16 64 16ZM86.64 54.36L64 76.96C61.75 79.2072 58.7 80.4694 55.52 80.4694C52.34 80.4694 49.29 79.2072 47.04 76.96L41.36 71.32C40.9871 70.947 40.6912 70.5043 40.4894 70.017C40.2875 69.5297 40.1837 69.0074 40.1837 68.48C40.1837 67.9526 40.2875 67.4303 40.4894 66.943C40.6912 66.4557 40.9871 66.013 41.36 65.64C41.733 65.267 42.1757 64.9712 42.663 64.7694C43.1503 64.5675 43.6726 64.4636 44.2 64.4636C44.7275 64.4636 45.2497 64.5675 45.737 64.7694C46.2243 64.9712 46.6671 65.267 47.04 65.64L52.68 71.32C53.0519 71.6949 53.4943 71.9925 53.9817 72.1956C54.4692 72.3986 54.992 72.5032 55.52 72.5032C56.0481 72.5032 56.5709 72.3986 57.0583 72.1956C57.5458 71.9925 57.9882 71.6949 58.36 71.32L80.96 48.68C81.333 48.307 81.7757 48.0112 82.263 47.8094C82.7503 47.6075 83.2726 47.5036 83.8 47.5036C84.3275 47.5036 84.8497 47.6075 85.337 47.8094C85.8243 48.0112 86.2671 48.307 86.64 48.68C87.013 49.053 87.3088 49.4957 87.5107 49.983C87.7125 50.4703 87.8164 50.9926 87.8164 51.52C87.8164 52.0474 87.7125 52.5697 87.5107 53.057C87.3088 53.5443 87.013 53.987 86.64 54.36Z" fill="#324EE8"/></svg>`} />
        <CTEXT.Title2 color='white'>Account activated</CTEXT.Title2>
      </ViewColCenter>
    )
  }

  const rotateAnimation = useRef(new Animated.Value(0)).current;

  return (
    <SSBarWithSaveArea barColor={step == 1 ? clrStyle.yellow : clrStyle.white} barContentStyle='dark-content' bgColor={step == 1 ? clrStyle.yellow : clrStyle.white}>
      <TopNav title='Add new account' />
      {step == 1 ? addWallets() : step == 2 ? activateWallet() : introSrc()}
    </SSBarWithSaveArea>
  )
}


