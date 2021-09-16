import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR } from '../colors'

const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  textBold: {
    fontFamily: 'Chai-Bold',
  },

  textLight: {
    fontFamily: 'Chai-Light',
  },

  textMedium: {
    fontFamily: 'Chai-Medium',
  },

  textRegular: {
    fontFamily: 'Chai-Regular',
  },

  textSemiBold: {
    fontFamily: 'Chai-SemiBold',
  },

  btnPrimary: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 24,
    height: 48,
  },

  btnPrimaryText: {
    fontFamily: 'Chai-SemiBold',
    color: TERCIARY_COLOR,
  },

  btnDefault: {
    borderRadius: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    width: '100%',
  },

  inputView: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: SECONDARY_COLOR,
    borderWidth: 2,
    borderRadius: 24,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },

  inputViewError: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 24,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    borderColor: 'red',
  },

  inputText: {
    height: 50,
    fontSize: 16,
    color: SECONDARY_COLOR,
    fontFamily: 'Chai-Regular',
  },

  modalContainer: {
    backgroundColor: 'white',
    margin: 32,
    padding: 16,
    borderRadius: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontFamily: 'Chai-Medium',
  },

  modalBody: {
    padding: 8,
    marginVertical: 16,
  },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressBar: {
    height: 8,
  },
})

export default GlobalStyle
