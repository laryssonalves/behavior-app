import { StyleSheet } from 'react-native'
import { SECONDARY_COLOR } from '../../colors'
import GlobalStyle from '../../global-style'

const styles = StyleSheet.create({
  appBarHeader: {
    height: 60,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },

  appBarContentTitle: {
    ...GlobalStyle.textMedium,
    color: 'white'
  },

  searchBarInput: {
    ...GlobalStyle.textMedium,
    color: 'white'
  }
})

export default styles