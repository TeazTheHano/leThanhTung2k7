import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import styles, { vw } from '../assets/stylesheet'
import { useNavigation } from '@react-navigation/native'
import { BoardingInput, BoardingInputWithInlineIcon, RoundBtn, TopNav, ViewColCenter, ViewColStartCenter, ViewRowBetweenCenter } from '../assets/Class'
import { Body1, Body3, Title3 } from '../assets/CustomText'
import clrStyle from '../assets/componentStyleSheet'
import { checkedBoxRound, googleLogo, unCheckBoxRound } from '../assets/svgXml'
import { LoginWithFirebaseHandle, RegisterWithFirebaseHandle } from '../assets/component'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { currentSetUser, RootContext } from '../data/store'
import { storageSaveUser } from '../data/storageFunc'

export default function Login({ route }: any) {
  const navigation = useNavigation()
  const [CurrentCache, dispatch] = React.useContext(RootContext)
  const { kind } = route.params
  let auth = getAuth()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [hidePass, setHidePass] = useState(true)
  const [isAccept, setIsAccept] = useState(false)

  return (
    <ImageBackground
      source={require('../assets/photos/Onboarding/Login.png')}
      resizeMethod='resize'
      resizeMode='cover'
      style={[
        styles.flex1,
        styles.gap4vw
      ]}>
      <SafeAreaView>
        <TopNav
          title={kind && kind === 'login' ? 'Log In' : 'Sign Up'}
          returnPreScreen
          returnPreScreenFnc={() => navigation.goBack()}
        />
        <ViewColStartCenter style={[styles.padding6vw, styles.gap4vw, styles.marginTop6vw]}>
          {kind != 'login' ? < BoardingInputWithInlineIcon
            placeholder='Name'
            value={userName}
            onChgText={(val) => setUserName(val.toString())}
            textClass={Body1}
            activeColor={clrStyle.grey80}
            // passiveColor='#E1E1E1'
            passiveColor={clrStyle.grey80}
            CustomStyleClass={[styles.w100, styles.bgcolorWhite, styles.border1, styles.paddingH4vw, styles.paddingV3vw, styles.borderRadius4vw, { borderColor: '#E1E1E1' }]}
          /> : null}
          <BoardingInputWithInlineIcon
            placeholder='Email'
            value={email}
            onChgText={(val) => setEmail(val.toString())}
            autoCap='none'
            textClass={Body1}
            activeColor={clrStyle.grey80}
            // passiveColor='#E1E1E1'
            passiveColor={clrStyle.grey80}
            CustomStyleClass={[styles.w100, styles.bgcolorWhite, styles.border1, styles.paddingH4vw, styles.paddingV3vw, styles.borderRadius4vw, { borderColor: '#E1E1E1' }]}
          />
          <BoardingInputWithInlineIcon
            placeholder='Password'
            value={password}
            onChgText={(val) => setPassword(val.toString())}
            textClass={Body1}
            activeColor={clrStyle.grey80}
            autoCap='none'
            // passiveColor='#E1E1E1'
            passiveColor={clrStyle.grey80}
            CustomStyleClass={[styles.w100, styles.bgcolorWhite, styles.border1, styles.paddingH4vw, styles.paddingV3vw, styles.borderRadius4vw, { borderColor: '#E1E1E1' }]}
            hideContent={hidePass}
            hideContentFnc={setHidePass}
          />
          <TouchableOpacity onPress={() => setIsAccept(!isAccept)}>
            <ViewRowBetweenCenter style={[styles.w100, styles.gap2vw]}>
              {!isAccept ? unCheckBoxRound(vw(8), vw(8), clrStyle.blue) : checkedBoxRound(vw(8), vw(8), clrStyle.blue)}
              <Body3 style={[styles.flex1]}>By signing up, you agree with the <Body3 color={clrStyle.blue}>Terms of Service and Privacy Policy</Body3></Body3>
            </ViewRowBetweenCenter>
          </TouchableOpacity>

          <ViewColCenter style={[styles.gap4vw, styles.marginTop8vw]}>
            <RoundBtn
              title={kind && kind === 'login' ? 'Log In' : 'Sign Up'}
              customStyle={[
                styles.bgcolorBlack,
                styles.w90vw,
                styles.borderRadius4vw,
                styles.justifyContentCenter
              ]}
              textClass={Title3}
              textColor='white'
              onPress={() => {
                if (isAccept) {
                  if (kind && kind === 'login') {
                    LoginWithFirebaseHandle(
                      email,
                      password,
                      () => navigation.navigate('PinCreate', { type: 'register' }),
                      signInWithEmailAndPassword,
                      auth,
                      dispatch,
                      currentSetUser,
                      storageSaveUser
                    )
                  } else {
                    RegisterWithFirebaseHandle(
                      () => navigation.navigate('PinCreate', { type: 'register' }),
                      createUserWithEmailAndPassword,
                      updateProfile,
                      auth,
                      dispatch,
                      currentSetUser,
                      storageSaveUser,
                      email,
                      userName,
                      password
                    )
                  }
                } else {
                  Alert.alert('Please accept Terms of Service and Privacy Policy')
                }
              }}
            />
            <Text style={[{ fontFamily: 'Inter-Bold', fontWeight: 'bold', fontSize: vw(3.5) }]}>or</Text>
            <RoundBtn
              title='Continue with Google'
              customStyle={[
                styles.border2,
                styles.w90vw,
                styles.borderRadius4vw,
                styles.justifyContentCenter
              ]}
              textClass={Title3}
              icon={googleLogo(vw(6), vw(6))}
              onPress={() => { Alert.alert('Feature is in development') }}
            />
          </ViewColCenter>
          <TouchableOpacity onPress={() => navigation.navigate('Login', { kind: kind == 'login' ? 'signup' : 'login' })}>
            <Text style={[{ fontFamily: 'Inter-Medium', fontWeight: Platform.OS == 'ios' ? 500 : undefined, fontSize: vw(3.5) }]}>{kind && kind === 'login' ? 'Don’t have an account? ' : 'Already have an account? '} <Text style={[{ color: clrStyle.blue }]}>{kind && kind === 'login' ? 'Sign Up' : 'Log In'}</Text></Text>
          </TouchableOpacity>
        </ViewColStartCenter>
      </SafeAreaView>
    </ImageBackground>
  )
}