import React from 'react'
import 'react-native-gesture-handler'

import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

import MainApp from './src/MainApp'

import { Provider as PaperProvider } from 'react-native-paper'

import { TERCIARY_COLOR } from './src/colors'

const App = () => {
  const [ fontsLoaded ] = useFonts({
    'Chai-Bold': require('./assets/fonts/Chai-Bold.ttf'),
    'Chai-SemiBold': require('./assets/fonts/Chai-SemiBold.ttf'),
    'Chai-Medium': require('./assets/fonts/Chai-Medium.ttf'),
    'Chai-Regular': require('./assets/fonts/Chai-Regular.ttf'),
    'Chai-Light': require('./assets/fonts/Chai-Light.ttf')
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  return (
      <PaperProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor={ TERCIARY_COLOR }
          translucent
        />
        <SafeAreaView style={ styles.safeArea }>
          <MainApp/>
        </SafeAreaView>
      </PaperProvider>
  )
}

export default App

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
  }
})
