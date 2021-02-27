import { StyleSheet } from 'react-native'

import { SECONDARY_COLOR } from '../../../colors'
import GlobalStyle from '../../../styles/global-style'

const styles = StyleSheet.create({
  inputView: {
    ...GlobalStyle.inputView,
    marginBottom: 8
  },

  inputViewError: {
    ...GlobalStyle.inputView,
    marginBottom: 8,
    borderColor: 'red',
  },

  btnDefault: {
    ...GlobalStyle.btnDefault,
    width: '48%'
  },

  btnPrimary: {
    ...GlobalStyle.btnPrimary,
    width: '48%'
  },
  
  textDropdown: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    fontFamily: 'Chai-Regular'
  },

  datePickerText: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    fontFamily: 'Chai-Regular'
  }
})

export default styles