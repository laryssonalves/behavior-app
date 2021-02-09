import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR, TERCIARY_COLOR } from './colors'

const GlobalStyle = StyleSheet.create({
  textBold: {
    fontFamily: 'Chai-Bold'
  },

  textLight: {
    fontFamily: 'Chai-Light'
  },

  textMedium: {
    fontFamily: 'Chai-Medium'
  },

  textRegular: {
    fontFamily: 'Chai-Regular'
  },

  textSemiBold: {
    fontFamily: 'Chai-SemiBold'
  },

  btnPrimary: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    height: 50,
  },

  btnPrimaryText: {
    fontFamily: 'Chai-SemiBold',
    color: TERCIARY_COLOR
  }
})

export default GlobalStyle