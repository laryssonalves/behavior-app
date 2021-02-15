import { StyleSheet } from 'react-native'
import GlobalStyle from '../../../global-style'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR } from '../../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: TERCIARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    width: 300,
    height: 169
  },

  inputView: {
    ...GlobalStyle.inputView,
    width: '80%',
    borderColor: PRIMARY_COLOR,
  },

  inputText: {
    ...GlobalStyle.inputText
  },

  btnLogin: {
    ...GlobalStyle.btnPrimary,
    marginTop: 20,
    marginBottom: 10
  },

  btnLoginText: {
    ...GlobalStyle.btnPrimaryText,
  }
})

export default styles