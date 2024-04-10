import React, { useCallback } from 'react'
import 'react-native-gesture-handler'

import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'

import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import MainApp from './src/MainApp'

import { Provider as PaperProvider } from 'react-native-paper'

import { TERCIARY_COLOR } from './src/colors'

SplashScreen.preventAutoHideAsync()

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Chai-Bold': require('./assets/fonts/Chai-Bold.ttf'),
    'Chai-SemiBold': require('./assets/fonts/Chai-SemiBold.ttf'),
    'Chai-Medium': require('./assets/fonts/Chai-Medium.ttf'),
    'Chai-Regular': require('./assets/fonts/Chai-Regular.ttf'),
    'Chai-Light': require('./assets/fonts/Chai-Light.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <PaperProvider>
      <StatusBar barStyle="light-content" backgroundColor={TERCIARY_COLOR} translucent />
      <SafeAreaView style={styles.safeArea}>
        <MainApp onReady={onLayoutRootView}/>
      </SafeAreaView>
    </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
})
