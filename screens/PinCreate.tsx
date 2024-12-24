import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SSBarWithSaveArea, ViewColBetweenCenter, ViewRow, ViewRowCenter } from '../assets/Class';
import clrStyle from '../assets/componentStyleSheet';
import { Small, Title3 } from '../assets/CustomText';
import styles, { vw } from '../assets/stylesheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { storageGetAllIDfromKey, storageGetItem, storageGetUser, storageSaveUser } from '../data/storageFunc';
import { UserFormat } from '../data/interfaceFormat';

export default function PinCreate({ route }: any) {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [type, setType] = React.useState<'login' | 'register'>(route.params?.type || 'register');
  const [FncType, setFncType] = React.useState<'new' | 'confirm'>('new');

  const [pinCode, setPinCode] = React.useState<number[]>([]);
  const [pinCodeConfirm, setPinCodeConfirm] = React.useState<number[]>([]);
  const [title, setTitle] = React.useState<string>('Enter your PIN');
  const [user, setUser] = React.useState<UserFormat | false>(false);

  const [isNeededToCreateWallet, setIsNeededToCreateWallet] = React.useState(true);

  // 
  const INDEV = true

  useEffect(() => {
    storageGetUser().then((retrievedUser) => {
      if (retrievedUser) {
        setUser(retrievedUser);
        setType(retrievedUser.pinCode ? 'login' : 'register');
      } else {
        navigation.navigate('Onboarding' as never);
      }
    });
    storageGetAllIDfromKey('walletsL').then(res => {
      console.log(res);

      res && res.length ? setIsNeededToCreateWallet(false) : setIsNeededToCreateWallet(true);
    })
    if (INDEV) {
      navigation.navigate((isNeededToCreateWallet ? 'AddAccount' : 'BottomTab') as never);
    }
  }, []);

  const ownNumpad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 0, 12];

  const handlePinSubmit = async (pinCode: number[], fncType: 'new' | 'confirm') => {
    if (pinCode.length !== 4) return;

    if (fncType === 'new') {
      if (type === 'register') {
        setPinCodeConfirm(pinCode);
        setPinCode([]);
        setTitle('Confirm your PIN');
        setFncType('confirm');
      } else {
        if (user && user.pinCode?.every((num, i) => num === pinCode[i])) {
          navigation.navigate((isNeededToCreateWallet ? 'AddAccount' : 'BottomTab') as never);
        } else {
          Alert.alert('PIN code does not match. Please try again.');
        }
      }
    } else if (fncType === 'confirm') {
      if (pinCode.every((num, i) => num === pinCodeConfirm[i])) {
        const retrievedUser = await storageGetUser();
        if (retrievedUser) {
          const saveResult = await storageSaveUser({ ...retrievedUser, pinCode });
          if (saveResult) navigation.navigate((isNeededToCreateWallet ? 'AddAccount' : 'BottomTab') as never);
        }
      } else {
        resetPin();
        Alert.alert('PIN code does not match. Please try again.');
      }
    }
  };

  const resetPin = () => {
    setPinCode([]);
    setPinCodeConfirm([]);
    setTitle('Enter your PIN');
    setFncType('new');
  };

  return (
    <SSBarWithSaveArea bgColor={clrStyle.yellow} barColor={clrStyle.yellow} barContentStyle={'dark-content'}>
      <ViewColBetweenCenter style={[styles.flex1]}>
        <View style={[styles.flex1]}>
          <Title3 style={[styles.textCenter, styles.paddingV10vw]}>{title}</Title3>
          <ViewRowCenter style={[styles.gap3vw]}>
            <View style={[styles.borderRadius100, { borderWidth: vw(1), width: vw(8), height: vw(8) }, pinCode[0] === undefined ? { borderColor: clrStyle.grey80 } : styles.bgcolorBlack]} />
            <View style={[styles.borderRadius100, { borderWidth: vw(1), width: vw(8), height: vw(8) }, pinCode[1] === undefined ? { borderColor: clrStyle.grey80 } : styles.bgcolorBlack]} />
            <View style={[styles.borderRadius100, { borderWidth: vw(1), width: vw(8), height: vw(8) }, pinCode[2] === undefined ? { borderColor: clrStyle.grey80 } : styles.bgcolorBlack]} />
            <View style={[styles.borderRadius100, { borderWidth: vw(1), width: vw(8), height: vw(8) }, pinCode[3] === undefined ? { borderColor: clrStyle.grey80 } : styles.bgcolorBlack]} />
          </ViewRowCenter>
        </View>
        <ViewRow style={[styles.flexWrap, styles.rowGap2vw, styles.justifyContentSpaceEvenly, { paddingBottom: inset.bottom ? inset.bottom + vw(6) : vw(16) }]}>
          {
            ownNumpad.map((item, index) => {
              return (
                <TouchableOpacity style={[styles.w30vw]} key={index}
                  onPress={() => {
                    if (item == 11) {
                      setPinCode(prevPinCode => prevPinCode.slice(0, -1));
                    } else if (item == 12) {
                      handlePinSubmit(pinCode, FncType);
                    } else {
                      setPinCode(prevPinCode => prevPinCode.length < 4 ? [...prevPinCode, item] : prevPinCode);
                    }
                  }}>
                  <Small style={[styles.textCenter, { fontSize: item == 11 || item == 12 ? vw(6) : vw(12), lineHeight: vw(16) }]}>{item == 11 ? 'Del' : item == 12 ? 'OK' : item}</Small>
                </TouchableOpacity>
              )
            })
          }
        </ViewRow>
      </ViewColBetweenCenter>
    </SSBarWithSaveArea >
  )
}