import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { LoadingModal } from './src/modal';
import AppRouters from './src/navigators/AppRouters';
import store from './src/redux/store';


const loadFonts = async () => {
  await Font.loadAsync({
    ...Ionicons.font,
    "regular": require('./assets/fonts/AirbnbCereal_W_Lt.otf'),
    "medium": require('./assets/fonts/AirbnbCereal_W_Md.otf'),
    "semiBold": require('./assets/fonts/AirbnbCereal_W_Bd.otf'),
    "bold": require('./assets/fonts/AirbnbCereal_W_XBd.otf'),
  });
};


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <LoadingModal visible />;
  }

  return (

    <Provider store={store}>

      <NavigationContainer>
        <AppRouters />
      </NavigationContainer>

    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
