import { StyleSheet } from 'react-native'
import GlobalStyle from '../../../global-style'
import { PRIMARY_COLOR, PRIMARY_TEXT_COLOR, SECONDARY_COLOR, SECONDARY_TEXT_COLOR } from '../../../colors'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  progressBar: {
    height: 8
  },

  flatList: {
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },

  textItemName: {
    ...GlobalStyle.textSemiBold,
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16
  },

  textItemAge: {
    ...GlobalStyle.textMedium,
    color: SECONDARY_TEXT_COLOR,
    fontSize: 14
  },

  dividerItem: {
    margin: 8,
    height: 2,
  },
})

export default styles