import { StyleSheet } from 'react-native'

import GlobalStyle from '../../../styles/global-style'
import { PRIMARY_COLOR, TERCIARY_COLOR } from '../../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: TERCIARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 300,
    height: 169,
  },

  inputView: {
    ...GlobalStyle.inputView,
    width: '80%',
    height: 60,
    borderColor: PRIMARY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputViewError: {
    ...GlobalStyle.inputViewError,
    width: '80%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputText: {
    ...GlobalStyle.inputText,
    flex: 1,
  },

  btnLogin: {
    ...GlobalStyle.btnPrimary,
    marginTop: 20,
    marginBottom: 10,
  },

  btnLoginText: {
    ...GlobalStyle.btnPrimaryText,
  },
})

export default styles
