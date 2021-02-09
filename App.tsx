import React from 'react'
import 'react-native-gesture-handler'

import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'

import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import Routes from './src/routes'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR } from './src/colors'

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

  // const fontConfig = {
  //   default: {
  //     regular: {
  //       fontFamily: 'Chai-SemiBold',
  //       fontWeight: 'normal' as 'normal',
  //     },
  //     medium: {
  //       fontFamily: 'Chai-Medium',
  //       fontWeight: 'normal' as 'normal',
  //     },
  //     light: {
  //       fontFamily: 'Chai-Regular',
  //       fontWeight: 'normal' as 'normal',
  //     },
  //     thin: {
  //       fontFamily: 'Chai-Light',
  //       fontWeight: 'normal' as 'normal',
  //     },
  //   }
  // };

  // const theme = {
  //   ...DefaultTheme,
  //   roundness: 24,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     primary: PRIMARY_COLOR,
  //     accent: SECONDARY_COLOR
  //   },
  //   fonts: configureFonts(fontConfig)
  // }

  return (
    <PaperProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor={ TERCIARY_COLOR }
          translucent
        />
        <SafeAreaView style={ styles.safeArea }>
          <Routes/>
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
