import { StyleSheet } from 'react-native'
import GlobalStyle from '../../global-style'
import { PRIMARY_COLOR, SECONDARY_COLOR, TERCIARY_COLOR } from '../../colors'

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
    width: '80%',
    backgroundColor: 'white',
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },

  inputText: {
    height: 50,
    fontSize: 16,
    color: SECONDARY_COLOR,
    ...GlobalStyle.textRegular
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