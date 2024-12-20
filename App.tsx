import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProviderTotal } from './data/store';
import clrStyle from './assets/componentStyleSheet';
import { ColorValue } from 'react-native';

// screen import
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import PinCreate from './screens/PinCreate';
import AddAccount from './screens/AddAccount';
import BottomTab from './assets/BottomTab';
import Home from './screens/Home';


// ____________________END OF IMPORT_______________________

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <ProviderTotal>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: clrStyle.white as ColorValue } }}>
          <Stack.Screen name="PinCreate" component={PinCreate} />
          <Stack.Screen name="BottomTab" component={BottomTab} />

          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AddAccount" component={AddAccount} />

          <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator>
      </NavigationContainer>
    </ProviderTotal>
  )
}

export default App;